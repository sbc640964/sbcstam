<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'email'     => 'required|email',
            'password'  => 'required',
            'confirm_password' => 'confirmed'
        ]);
    }
}
