<?php

namespace App\Models;

use App\ObjectsData;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];

    public function product ()
    {
        return $this->belongsToMany(Product::class);
    }

    public function customer ()
    {
        return $this->belongsTo(Profile::class, 'customer', 'id');
    }

    public function getStatusAttribute()
    {
        return ObjectsData::statusSale()->firstWhere('value', '=', $this->attributes['status']);
    }
}
