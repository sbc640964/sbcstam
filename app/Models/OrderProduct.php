<?php

namespace App\Models;

use App\ObjectsData;
use Illuminate\Database\Eloquent\Relations\Pivot;

class OrderProduct extends Pivot
{
    public function getStatusAttribute()
    {
        return ObjectsData::statusSale()->firstWhere('value', '=', $this->attributes['status']);
    }
}
