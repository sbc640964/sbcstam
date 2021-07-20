<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('to')->nullable()->constrained('profiles')->nullOnDelete();
            $table->float('amount');
            $table->foreignId('expense_id')->nullable()->constrained('expenses')->cascadeOnDelete();
            $table->string('currency');
            $table->float('exchange_rates');
            $table->string('method')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
