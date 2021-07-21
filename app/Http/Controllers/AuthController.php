<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:8|confirmed',
        ]);

        User::create($attributes);

        return back()->with('success', 'המשתמש נוצר בהצלחה');
    }

    public function logout ()
    {
        Auth::logout();

        return redirect('/login');
    }

    public function login (Request $request)
    {
        $attributes = $request->validate([
            'email'     => 'required|email',
            'password'  => 'required',
        ]);

        if( Auth::attempt($attributes) ){

            session()->regenerate();

            return redirect('/');
        }

        throw ValidationException::withMessages([
            'email' => 'לא מצאנו משתמש קיים'
        ]);
    }
}
