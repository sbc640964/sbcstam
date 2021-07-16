<?php

namespace App\Models;

use App\ObjectsData;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $guarded = [];

    protected $appends = [
        'amount'
    ];

    public function to ()
    {
        return $this->belongsTo(Profile::class, 'to', 'id');
    }

    public function of ()
    {
        return $this->belongsTo(Profile::class, 'of', 'id');
    }

    public function product ()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function payment ()
    {
        return $this->hasOne(Payment::class, 'expense_id', 'id');
    }

    public function getAmountAttribute()
    {
        $currency = $this->attributes['currency'];
        $amount = $this->attributes['amount'];
        $exchange_rates = $this->attributes['exchange_rates'];

        return [
            'USD' => $currency === 'USD' ? $amount : $amount / $exchange_rates,
            'ILS' => $currency === 'ILS' ? $amount : $amount * $exchange_rates,
            'original' => $amount
        ];
    }

    public function getTypeAttribute()
    {
        return ObjectsData::expensesTypes()->firstWhere('value', '=', $this->attributes['type']);
    }
}
