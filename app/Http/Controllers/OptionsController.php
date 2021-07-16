<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Illuminate\Http\Request;

class OptionsController extends Controller
{
    public function get (Request $request)
    {
        $optionKey = $request->get('optionKey');
        Option::where('key', $optionKey);
    }

    public function store (Request $request)
    {
        $optionKey = 'store' . $request->get('optionKey');
        if(!method_exists($this, $optionKey)){
            abort(404);
        }

        $this->$optionKey($request);
    }

    public function storeTemplateProduct (Request $request)
    {
        $request->validate([
            'name',
            'display_name',
            'package',
            'payment_units',
            'units_labels.singular',
            'units_labels.plural',
            'children.labels.singular',
            'children.labels.plural',
            'children.units.*.qty',
            'children.units.*.payment_units',
            'different_precess',
            'children.process',
        ]);
    }
}
