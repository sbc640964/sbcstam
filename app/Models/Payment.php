<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $guarded = [];

    public function expenses ()
    {
        return $this->hasMany(Payment::class);
    }

    public function to ()
    {
        return $this->hasOne(Profile::class, 'to');
    }
}
