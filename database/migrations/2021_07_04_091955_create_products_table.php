<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('status');
            $table->string('name');
            $table->string('type');
            $table->text('description')->nullable();
            $table->foreignId('seller')->constrained('profiles');
            $table->foreignId('scribe')->nullable()->constrained('profiles');
            $table->string('type_writing');
            $table->float('size');
            $table->integer('level');
            $table->integer('payment_units')->nullable();
            $table->float('cost_unit')->nullable();
            $table->string('currency')->nullable();
            $table->foreignId('parent')->nullable()->constrained('products')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
