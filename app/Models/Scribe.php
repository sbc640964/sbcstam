<?php

namespace App\Models;

use App\ObjectsData;
use Illuminate\Database\Eloquent\Model;

class Scribe extends Model
{
    protected $fillable = [
        'rabbi',
        'is_voting',
        'certificate_exp',
        'community',
        'type_writing'
    ];

    protected $casts = [
        'type_writing' => 'array'
    ];

    public function rabbi ()
    {
        return $this->belongsTo(Profile::class, 'rabbi');
    }

    public function getCommunityAttribute()
    {
        return ObjectsData::community()->firstWhere('value', '=', $this->attributes['community']);
    }
}
