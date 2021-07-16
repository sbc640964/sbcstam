<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScribesTable extends Migration
{
    public function up()
    {
        Schema::create('scribes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->boolean('is_voting');
            $table->timestamp('certificate_exp')->nullable();
            $table->foreignId('rabbi')->nullable()->constrained('profiles')->nullOnDelete();
            $table->string('community')->nullable();
            $table->text('type_writing');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('scribes');
    }
}
