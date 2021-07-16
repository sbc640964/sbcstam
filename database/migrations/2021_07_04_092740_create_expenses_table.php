<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesTable extends Migration
{
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('type');
            $table->text('note')->nullable();
            $table->foreignId('to')->nullable()->constrained('profiles');
            $table->foreignId('of')->nullable()->constrained('profiles');
            $table->foreignId('product_id')->nullable()->constrained();
            $table->float('amount');
            $table->string('currency');
            $table->float('exchange_rates');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('expenses');
    }
}
