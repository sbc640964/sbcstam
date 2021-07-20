<?php

use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\ListsDataController;
use App\Http\Controllers\OptionsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfilesController;
use App\Http\Controllers\RolesController;
use App\Utils;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', function () {
    return view('auth.login');
})->name('login')->middleware('guest');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');//->middleware('auth');

Route::post('/register', [\App\Http\Controllers\RegisterController::class, 'register'])->name('createUser');//->middleware('auth');


Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');//->middleware(['auth']);
