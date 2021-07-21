<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Product;
use App\Utils;
use Arr;
use DB;
use Illuminate\Http\Request;

class ExpensesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

    public function validateData($request, $product){
        $data = $request->validate([
            'type'              => 'required',
            'note'              => 'nullable',
            'to'                => 'nullable',
            'forSeller'          => 'boolean',
            'amount'            => 'required|numeric',
            'currency'          => 'required',
            'immediatePayment'  => 'boolean',
            'method'            => 'nullable',
        ]);

        $data['exchange_rates'] = Utils::getExchangeRates('USD');

        if($data['type'] == 1 || $data['type']['value'] == 1){
            $data['to'] = $product->seller;
        }elseif($data['to']){
            $data['to'] = $data['to']['id'];
        }

        $data['of'] = $data['forSeller'] ?? null;
        if($data['forSeller'] ?? false){
            $data['of'] = $product->seller;
        }

        if(is_array($data['type'])){
            $data['type'] = $data['type']['value'];
        }
        $data['currency'] = $data['currency']['value'];

        if(isset($data['method']) && $data['method']){
            $data['method'] = $data['method']['value'] ?: null;
        }

        return $data;
    }

    public function storeGeneral(Request $request)
    {
        $data = $request->validate([
            'type'              => 'required',
            'note'              => 'nullable',
            'to'                => 'nullable',
            'amount'            => 'required|numeric',
            'currency'          => 'required',
            'immediatePayment'  => 'boolean',
            'method'            => 'nullable',
        ]);

        $data['type'] = $data['type']['value'];
        $data['to'] = isset($data['to']) ? $data['to']['id'] : null;
        $data['currency'] = $data['currency']['value'];
        $data['method'] = isset($data['method']) ? $data['method']['value'] : null;
        $data['exchange_rates'] = Utils::getExchangeRates('USD');

        DB::transaction(function () use($data) {
                return tap(
                    Expense::create(Arr::only($data, [
                        'type',
                        'note',
                        'to',
                        'amount',
                        'currency',
                        'exchange_rates'
                    ])),

                    function (Expense $expense) use($data) {

                        if($data['immediatePayment'] ?? false){
                            clock($expense->to);
                            $expense->payment()->create([
                                'method'        => $data['method'] ?? null,
                                'amount'        => $expense->amount['original'],
                                'to'            => $expense->to,
                                'exchange_rates'=> $expense->exchange_rates,
                                'currency'      => $expense->currency
                            ]);
                        }
                    }
                );
            });
    }


    public function store(Product $product, Request $request)
    {
        $data = $this->validateData($request, $product);

        return $this->insertToDb($data, $product);

    }

    public function insertToDb($data, $product)
    {
        DB::transaction(function () use($product, $data){
            return tap(
                $product->expense()->create(Arr::only($data, [
                    'exchange_rates',
                    'currency',
                    'amount',
                    'to',
                    'note',
                    'type',
                    'of'
                ])),
                function (Expense $expense) use($data, $product){

                    if($data['immediatePayment'] ?? false){

                        $expense->payment()->create([
                            'method' => $data['method'] ?? null,
                            'amount' => $expense->amount['original'],
                            'to' => $expense->to,
                            'exchange_rates' => $expense->exchange_rates,
                            'currency' => $expense->currency
                        ]);
                    }

                    //TODO: לטפל בעדכון סטטוס רק אם המשתמש ביקש
//                    if(in_array($product->status->value, [1,2])){
//                        $product->update([
//                            'status' => 3,
//                        ]);
//                    }
                }
            );
        });

        return (new ProductsController)->show($product->parent ?? $product->id);
    }

    /**
     * Display the specified resource.
     *
     * @param expense $expense
     * @return \Illuminate\Http\Response
     */
    public function show(expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param expense $expense
     * @return \Illuminate\Http\Response
     */
    public function edit(expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param expense $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, expense $expense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param expense $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(expense $expense)
    {
        //
    }
}
