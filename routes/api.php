<?php

use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\ListsDataController;
use App\Http\Controllers\OptionsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfilesController;
use App\Http\Controllers\RolesController;
use App\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth.basic'])->group(function(){

    Route::prefix('products')->group(function () {
        Route::get('/', [ProductsController::class, 'index']);
        Route::get('/{product}', [ProductsController::class, 'show']);

        Route::post('/', [ProductsController::class, 'store']);
        Route::post('/{product}', [ProductsController::class, 'update']);
        Route::post('/{product}/expense', [ExpensesController::class, 'store']);
        Route::post('/{product}/status', [ProductsController::class, 'updateStatus']);

        Route::delete('/{product}/expenses/{expense}', [ProductsController::class, 'destroyExpense']);
        Route::delete('/{product}/orders/{order}', [ProductsController::class, 'detachOrder']);
        Route::delete('/{product}', [ProductsController::class, 'destroy']);

        Route::put('/{product}/orders/{order}', [ProductsController::class, 'updateOrder']);
        Route::put('/{product}/lock-sale/{order}', [ProductsController::class, 'lockOrder']);
        Route::put('/{product}/unlock-sale/{order}', [ProductsController::class, 'unlockOrder']);
        Route::put('/{product}/resale/{order}', [ProductsController::class, 'resaleOrder']);
        Route::put('/{product}/complete/{order}', [ProductsController::class, 'completeOrder']);
    });

    Route::prefix('profiles')->group(function () {
        Route::get('/', [ProfilesController::class, 'index']);
        Route::post('/', [ProfilesController::class, 'store']);
        Route::get('/{profile}', [ProfilesController::class, 'show']);
        Route::put('/{profile}', [ProfilesController::class, 'store']);
        Route::delete('/{profile}', [ProfilesController::class, 'destroy']);
    });

    Route::prefix('roles')->group(function () {
        Route::get('/', [RolesController::class, 'index']);
    });

    Route::prefix('orders')->group(function() {
        Route::get('/', [OrdersController::class, 'index']);
        Route::post('/', [OrdersController::class, 'store']);
        Route::delete('/{order}', [OrdersController::class, 'destroy']);
    });

    Route::prefix('options')->group(function() {
        Route::post('/', [OptionsController::class, 'store']);
    });

    Route::prefix('expenses')->group(function(){
        Route::post('/', [ExpensesController::class, 'storeGeneral']);
    });

    Route::prefix('payments')->group(function(){
        Route::post('/', [PaymentsController::class, 'store']);
    });


    Route::get('lists-data/{listName}', [ListsDataController::class, 'index']);

    Route::get('exchange-rates/{currency}', function ($currency){
        return Utils::getExchangeRates($currency);
    });
});
