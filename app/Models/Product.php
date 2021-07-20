<?php

namespace App\Models;

use App\ObjectsData;
use App\Utils;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'seller', 'scribe', 'name',
        'description', 'size', 'level',
        'status', 'type_writing', 'type',
        'payment_units', 'currency', 'cost_unit'
    ];

    protected $appends = [
        'children_count'
    ];

    public function expense()
    {
        return $this->hasMany(Expense::class);
    }

    public function category()
    {
        return $this->belongsToMany(Category::class);
    }

    public function seller()
    {
        return $this->hasOne(Profile::class, 'id', 'seller');
    }

    public function scribe ()
    {
        return $this->hasOne(Profile::class, 'id', 'scribe');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class)
            ->using(OrderProduct::class)
            ->withPivot('price', 'currency', 'exchange_rates', 'status', 'note')
            ->withTimestamps();
    }

    public function children()
    {
        return $this->hasMany(Product::class, 'parent', 'id');
    }

    public function getStatusAttribute()
    {
        return ObjectsData::statuses()->firstWhere('value', '=', $this->attributes['status']);
    }

    public function getNameAttribute()
    {
        if($this->attributes['type'] === 'child') {
            return $this->attributes['name'];
        }

        return ObjectsData::productDataObject()->firstWhere('value', '=', $this->attributes['name']);
    }

    public function getTypeWritingAttribute ()
    {
        return ObjectsData::typeWriting()->firstWhere('value', '=', $this->attributes['type_writing']);
    }

    public function getExpensesDataAttribute ()
    {
        //if ($this->type !== 'package') return null;

        $expenses = collect($this->children->count() ? data_get($this->children, '*.expense.*') : [])
            ->concat($this->expense)
            ->where('of', '=', null)
            ->groupBy('type.value');

        $expenses = $expenses->map(
            fn ($v) => ['USD' => $v->sum('amount.USD'), 'ILS' => $v->sum('amount.ILS'), 'type' => $v->first()->type]
        );

        $return = [
            'expenses' => $expenses,
        ];

        $return['total_expenses'] = [
            'USD' => $expenses->sum('USD'),
            'ILS' => $expenses->sum('ILS'),
        ];

        $exchange_rate_usd = Utils::getExchangeRates('USD');

        $productCalc = $this->children->count() ? $this->children : [$this];

        $productCalc = collect($productCalc)->map(function ($v) use ($exchange_rate_usd) {

            $upPaid = $v->expense->where('type.value', '=', 1);

            $expect = $v->cost_unit * $v->payment_units;

            $finalSum = [
                'USD' => 0,
                'ILS' => 0,
            ];

            if($upPaid->count()){

                $finalSum['USD'] = $upPaid->sum('amount.USD');
                $finalSum['ILS'] = $upPaid->sum('amount.ILS');

                if ($expect > $finalSum[$v->currency])
                {
                    $balance = $expect - $finalSum[$v->currency];
                    $finalSum['USD'] += $v->currency === 'USD' ? $balance : $balance / $exchange_rate_usd;
                    $finalSum['ILS'] += $v->currency === 'ILS' ? $balance : $balance * $exchange_rate_usd;
                }
            }else{
                $finalSum['USD'] = $v->currency === 'USD' ? $expect : $expect / $exchange_rate_usd;
                $finalSum['ILS'] = $v->currency === 'ILS' ? $expect : $expect * $exchange_rate_usd;
            }
            return [
                'amount' => $finalSum,
                'id'     => $v->id,
                'description'   => $v->description
            ];
        });

        $return['expect_expenses'] = collect($this->name['expect_expenses'] ?? [])->map(
            fn ($v) => [
                'USD' => $v['currency'] === 'USD' ? $v['cost'] : $v['cost'] / $exchange_rate_usd,
                'ILS' => $v['currency'] === 'ILS' ? $v['cost'] : $v['cost'] * $exchange_rate_usd,
            ]
        );

        $return['expect_expenses'][1] = [
            'USD' => $productCalc->sum('amount.USD'),
            'ILS' => $productCalc->sum('amount.ILS'),
        ];


        $return['total_expect_expenses'] = [
            'USD' => $return['expect_expenses']->sum('USD'),
            'ILS' => $return['expect_expenses']->sum('ILS'),
        ];

        return $return;

    }

    public function getCostAttribute()
    {
        $currency = $this->attributes['currency'];
        $amount = $this->attributes['cost_unit'] * $this->attributes['payment_units'];
        $exchange_rates = Utils::getExchangeRates('USD');

        return [
            'USD' => $currency === 'USD' ? $amount : $amount / $exchange_rates,
            'ILS' => $currency === 'ILS' ? $amount : $amount * $exchange_rates,
            'original' => $amount
        ];
    }

    public function getChildrenCountAttribute()
    {
        if($this->attributes['type'] !== 'package') return null;

        return $this->children()->count();
    }

//    לא טוב, צריך להשיג כל יום את השער
//    public function getTotalCostAttribute ()
//    {
//        $currency = $this->attributes['currency'];
//        $amount = $this->attributes['cost_unit'];
//        $exchange_rates = $this->attributes['exchange_rates'];
//
//        return [
//            'USD' => ($currency === 'USD' ? $amount : $amount / $exchange_rates) * $this->attributes['payment_units'],
//            'ILS' => $currency === 'ILS' ? $amount : $amount * $exchange_rates,
//            'original' => $amount
//        ];
//    }
}
