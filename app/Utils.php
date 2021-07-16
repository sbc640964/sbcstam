<?php


namespace App;


use App\Models\Option;
use Arr;
use Cache;
use Carbon\Carbon;
use Http;
use Illuminate\Database\Eloquent\Model;

class Utils
{
    static public function getExchangeRates(string $currency, $force = false)
    {

        if(!Cache::has("exchange_rates_$currency")){
            $seconds = Carbon::now()->diffInSeconds(Carbon::now()->endOfDay()->addSecond());
        }

        return Cache::remember("exchange_rates_$currency", $seconds ?? null, function() use ($currency) {

            $rates = Option::where('key', 'exchange_rates')->first();

            if(!$rates
                || !static::dateIsToday($rates->updated_at)
            ){
                $res = Http::get('https://www.boi.org.il/currency.xml');

                $res = simplexml_load_string ($res->body());

                $res = json_decode(json_encode($res), true);

                if(!$rates){

                    $rates = new Option();

                    $rates->mergeCasts([
                        'value' => 'array'
                    ]);

                    Option::create([
                        'key' => 'exchange_rates',
                        'value' => $res,
                    ]);

                }else{

                    $rates->mergeCasts([
                        'value' => 'array'
                    ]);

                    $rates->update([
                        'value'  => $res,
                    ]);

                    if(!$rates->wasChanged('value')){
                        $rates->touch();
                    }

                }

            }

            $rates = Arr::first($rates->value['CURRENCY'], function ($value, $key) use ($currency) {
                return $value['CURRENCYCODE'] === $currency;
            });

            return $rates['RATE'];
        });

    }

    static function dateIsToday ($date, $path = null)
    {
        return $date === Carbon::today()->toDateString();
    }
}
