<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'tel',
        'phone',
        'email',
        'active',
    ];

    protected $appends = [
        'full_name'
    ];

    public function roles ()
    {
        return $this->belongsToMany(Role::class);
    }

    public function scribe ()
    {
        return $this->hasOne(Scribe::class);
    }

    public function products ()
    {
        return $this->hasMany(Product::class, 'seller_id');
    }

    public function incomes ()
    {
        return $this->hasMany(Income::class, 'from');
    }

    public function orders ()
    {
        return $this->hasMany(Order::class, 'costumer');
    }

    public function expenses ()
    {
        return $this->hasMany(Expense::class, 'to');
    }

    public function scopeFilter ( $query, array $filters)
    {
        $query->when($filters['s'] ?? false, function ($query, $search){
            $query->where( function ($query) use($search) {
                $query->where('first_name', 'LIKE', '%'.$search.'%')
                    ->orWhere('last_name', 'LIKE', '%'.$search.'%');
            });
        });

        $query->when($filters['roles'] ?? false, function ($query, $roles) {

            //clean nulls values
            $roles = array_filter((array)$roles);

            if(!empty($roles)){
                $query->whereHas('roles', function ($query) use ($roles) {
                    $query->whereIn('slug', $roles);
                });
            }

        });
    }

    public function getFullNameAttribute ()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function enable()
    {
        $this->update([
            'active' => false
        ]);
    }
}
