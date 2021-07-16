<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use DB;
use Illuminate\Http\Request;

class OrdersController extends Controller
{

    public function index()
    {
        return Order::all();
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

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id'    => 'required|exists:products,id',
            'customer.id'   => 'required|exists:profiles,id',
            'status'        => 'required|array',
            'price'         => 'required',
            'currency'      => 'required',
            'note'          => ''
        ]);

        $product = Product::find($data['product_id']);

        $insert = DB::transaction( function () use ($data, $product){
                return tap(
                    Order::create([
                        'customer' => $data['customer']['id'],
                        'status'    => $data['status']['value'],
                    ]),
                    function (Order $order) use($data, $product){

                        $product->orders()->attach($order, [
                            'price'     => $data['price'],
                            'currency'  => $data['currency']['value'],
                            'status'    => $data['status']['value'],
                            'note'      => $data['note'] ?? null,
                        ]);

                        if(in_array($data['status']['value'], [2,3])){
                            (new ProductsController())->lockOrder($product, $order);
                        }
                    }
                );
            });

        if($insert){
            return (new ProductsController)->show($product->id);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Order $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Order $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Order $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    public function destroy(Order $order)
    {

    }
}
