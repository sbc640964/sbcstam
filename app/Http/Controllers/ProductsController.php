<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Order;
use App\Models\Product;
use App\Utils;
use Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ProductsController extends Controller
{
    public function index()
    {
        $products = new Product();
        $products->setAppends(['children_count']);
        $products = $products->with('seller')->whereIn('type', ['package', 'simple'])->paginate(request('per_page' ?? 20));
        return $products;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function updateStatus(Product $product, Request $request)
    {
        $request->validate([
            'status' => 'required|array'
        ]);

        $product->update([
            'status' => $request->get('status')['value'],
        ]);

        $id = $request->get('parent') ? $request->get('parent')['id'] : $product->id;

        return $this->show($id);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'seller' => 'required',
            'name' => 'required',
            'status' => 'required',
            'description' => '',
            'size' => 'required|numeric|min:1',
            'level' => 'required|numeric|min:1',
            'type_writing' => 'required',
            'scribe_seller' => 'boolean|required',
            'scribe' => 'required_if:scribe_seller,false',
            'currency' => 'required',
            'cost_unit' => 'required|min:1',
            'payment_units' => 'nullable',
            'initial_expenditure_auto' => 'nullable',
            'package' => 'nullable|boolean',
            'qty' => 'numeric|required_if:package,true|min:2',
        ]);

        $data['type'] = $data['name']['type'] ?? 'simple';

        $productInsert = [
            'seller' => $data['seller']['id'],
            'scribe' => $data['scribe_seller']
                ? $data['seller']['id']
                : (isset($data['scribe']) ? $data['scribe']['id'] : false),
            'name' => $data['name']['value'],
            'status' => $data['status']['value'],
            'description' => $data['description'] ?? null,
            'size' => $data['size'],
            'level' => $data['level'],
            'currency' => $data['currency']['value'],
            'payment_units' => $data['payment_unit'] ?? 1,
            'cost_unit' => $data['cost_unit'],
            'type_writing' => $data['type_writing']['value'],
            'type' => (isset($data['package']) && $data['package']) ? 'package' : $data['type'],
        ];

        DB::transaction(function () use ($data, $productInsert) {
               tap(

                   Product::create($productInsert),

                   function (Product $product) use ($data, $productInsert) {

                       if($data['type'] === 'package'
                           && isset($data['name']['children_auto'])
                           && $data['name']['children_auto']
                           && isset($data['name']['children'])
                           && !empty($children = $this->prepareChildren($data, $product))
                       ) {
                           $product->children()->createMany($children);
                       }

                       if ($data['type'] !== 'package' && isset($data['package']) && $data['package']){
                           $children = [];

                           foreach (range(0, $data['qty'] -1) as $k => $c){
                               array_push($children, array_merge($productInsert, [
                                   'description' => data_get($product->name, 'children.labels.0', data_get($product->name, 'label', 'יחידה')) . ' ' . ($k + 1),
                                   'type' => 'child',
                               ]));
                           }

                           $product->children()->createMany($children);
                       }

                       if($product->cost_unit > 0
                           && (Arr::get($product->name, 'initial_expenditure_auto', false)
                               || Arr::get($data, 'initial_expenditure_auto', false)
                           )
                       ){
                           $product->expense()->create([
                               'type' => 1,
                               'note' => 'נרשם אוטומטי כשיצרת את המוצר',
                               'to'   => $product->seller,
                               'amount' => $this->getExpenseAmount($product),
                               'currency' => $product->currency,
                               'exchange_rates' => Utils::getExchangeRates('USD'),
                           ]);
                       }
                   }
               );
        });
    }

    public function show($product)
    {
        $product = Product::with('children.expense.to', 'children.expense.of','children.expense.product', 'seller', 'scribe', 'expense.to', 'orders.customer')->findOrFail($product);
        $product->append('expenses_data', 'cost');
        $product->children->append('cost');
        return $product;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Product $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    public function update(Request $request, Product $product)
    {
        $countChildren = $product->children()->count();

        $data = $request->validate([
            'status'    => 'required',
            'size'      => Rule::requiredIf( fn () => $product->type !== 'child'),
            'level'     => Rule::requiredIf( fn () => $product->type !== 'child'),
            'cost_unit' => Rule::requiredIf( fn () => $product->type !== 'child'),
            'amount'    => 'required_if:received,true|required_if:addExpense,true|numeric',
            'currency'  => 'required_if:received,true|required_if:addExpense,true',
            'note'      => '',
            'type'      => 'required_if:addExpense,true',
            'forSeller' => 'boolean',
            'to'        => Rule::requiredIf( fn () => $request->get('type') && $request->get('type')['value'] > 1),
            'method'    => '',
        ]);

        DB::transaction(function () use($product, $request, $data) {

            if(($received = $request->get('received')) || ($addExpense = $request->get('addExpense'))){
            clock($received);
                $newData = [
                    'to' => ($received || $data['type']['value'] === 1) ? $product->seller : $data['to']['id'],
                    'type' => $received ? 1 : $data['type']['value'],
                    'currency' => $data['currency']['value'],
                    'method' => $data['method'] ?? null ? $data['method']['value'] : null,
                    'of' => $data['forSeller'] ?? null ? $product->seller : null,
                    'exchange_rates' => Utils::getExchangeRates('USD'),
                    'note' =>  $data['note'] ?? null,
                    'amount' => $data['amount'],
                ];

                $expense = $product->expense()->create(
                    Arr::only($newData, [
                        'to',
                        'type',
                        'currency',
                        'of',
                        'exchange_rates',
                        'note',
                        'amount'
                    ])
                );

                clock($expense);
            }

            if($request->get('immediatePayment')){
                $expense->payment()->create(
                    Arr::only($newData, [
                        'to',
                        'currency',
                        'method',
                        'exchange_rates',
                        'amount'
                    ])
                );
            }

            if($product->status !== $data['status'] || $received){
                $product->status = $received ? 3 : $data['status'];
            }

            $product->cost_unit = $data['cost_unit'];

            if($product->type !== 'child'){
                $product->level = $data['level'];
                $product->size = $data['size'];

                $product->children()->update([
                    'cost_unit' => $data['cost_unit']
                ]);
            }

            $product->save();
        });


        $id = $product->parent ?? $product->id;

        return $this->show($id);
    }

    public function destroy(Product $product)
    {
        if(request('expensesDel')){
            $product->expense()->delete();
        }

        $product->delete();
    }

    public function prepareChildren($data, $product)
    {
        $children = [];
        $counter = 1;

        if(is_array($data['name']['children']['units_payments'])){

            foreach ($data['name']['children']['units_payments'] as $group){

                foreach (range(0, ($group['qty'] - 1)) as $p){
                    array_push($children, [
                        'seller' => $product->seller,
                        'scribe' => $product->scribe ?? null,
                        'name' => implode('-', ['child', $product->id, $counter]),
                        'status' => in_array($product->status['value'], [1,2]) ? 1 : $product->status['value'],
                        'description' => $product->name['children']['labels'][1] . " מס' " . $counter,
                        'size' => $product->size,
                        'level' => $product->level,
                        'currency' => $product->currency,
                        'payment_units' => $group['units_payments'] ?? 1,
                        'cost_unit' => $product->cost_unit,
                        'type_writing' => $product->type_writing['value'],
                        'type' => 'child',
                    ]);

                    $counter ++;
                }
            }
        }

        return $children;
    }

    private function getExpenseAmount(Product $product)
    {
        switch ($product->type){
            case 'simple' :
                return $product->cost_unit;
                break;
            case 'package' :
                if($product->name['type'] === 'package'){
                    $units_payments = $product->name['children']['units_payments'];
                }else{
                    $units_payments = $product->children()->count();
                }

                if(is_array($units_payments)){
                    $units_payments = array_sum(array_map(function ($value){
                        return $value['qty'] * $value['units_payments'];
                    },$units_payments));
                }

                return $units_payments * $product->cost_unit;
                break;
        }
    }

    public function detachOrder (Product $product, Order $order, Request $request)
    {
        clock($request->get('force'));
        if($request->get('force')){
            $product->orders()->detach($order->id);
        }
        else{
            $product->orders()->updateExistingPivot($order, [
                'active' => false,
                'status'    => 4,
            ]);
        }

        return $this->show($product->id);
    }

    public function lockOrder (Product $product, Order $order)
    {
        DB::transaction(function () use($product, $order){
            $product->orders()
                ->newPivotStatement()
                ->where('product_id', $product->id)
                ->where('active', true)
                ->update([
                    'status'    => 5,
                ]);

            $product->orders()->updateExistingPivot($order->id, ['status' => 2]);
        });

        return $this->show($product->id);
    }

    public function unlockOrder (Product $product, Order $order)
    {
        $product->orders()->updateExistingPivot($order->id, ['status' => 4, 'active' => false]);

        return $this->show($product->id);
    }

    public function resaleOrder (Product $product, Order $order)
    {
        $product->orders()->updateExistingPivot($order->id, ['status' => 1, 'active' => true]);

        return $this->show($product->id);
    }

    public function completeOrder (Product $product, Order $order)
    {
        $product->orders()->updateExistingPivot($order->id, ['status' => 3]);

        return $this->show($product->id);
    }

    public function updateOrder (Product $product, Order $order, Request $request)
    {
        $request->validate([
           'price' => 'required',
           'currency' => 'required',
        ]);

        $product->orders()->updateExistingPivot($order->id, [
            'price' => $request->get('price'),
            'currency' => $request->get('currency')['value'],
        ]);

        return $this->show($product->id);
    }

    public function destroyExpense (Product $product, Expense $expense)
    {
        $expense->delete();

        return $this->show($product->id);
    }
}
