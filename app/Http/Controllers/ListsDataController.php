<?php

namespace App\Http\Controllers;

use App\ObjectsData;
use Illuminate\Http\Request;

class ListsDataController extends Controller
{
    public $dataNames = [
        'productDataObject',
        'statuses',
        'typeWriting',
        'expensesTypes',
        'statusSale'
    ];

    public function index($listName, Request $request)
    {
        if(!in_array($listName, $this->dataNames)){
            abort(404, 'list name not found');
        }

        $data = ObjectsData::{$listName}();

        $params = $request->all();

        if(isset($params['key']) && $params['key'] && isset($params['s']) && $params['s']){
            $data = $data->filter( function ($item, $key) use($params) {
                $value = data_get($item, $params['key']);
                if(is_bool($value)){
                    $value = var_export($value, true);
                }
                return false !== stripos($value,$params['s'] ?? '');
            });
        }

        return $data;
    }
}
