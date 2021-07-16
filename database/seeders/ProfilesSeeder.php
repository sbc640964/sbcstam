<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\Role;
use Arr;
use Illuminate\Database\Seeder;

class ProfilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $profiles  = collect([
            [
                'first_name' => 'חיים',
                'last_name' => 'ישראל',
                'email' => 'gtgtg123@gmail.com',
                'tel' => '088004055',
                'phone' => '05484545454',
                'active' => true,
            ],
            [
                'first_name' => 'יונה',
                'last_name' => 'גובנר',
                'phone' => '0527444111',
                'active' => true,
            ],
            [
                'first_name' => 'משה',
                'last_name' => 'מנטיפיורי',
                'tel' => '088001127',
                'phone' => '0527612454',
                'active' => true,
            ],
            [
                'first_name' => 'יוחנן',
                'last_name' => 'מוסבכר',
                'tel' => '0874444112',
                'phone' => '024541421',
                'active' => true,
            ],
            [
                'first_name' => 'יחיאל',
                'last_name' => 'רוזנברג',
                'email' => '1212121@gmail.com',
                'tel' => '054848454',
                'phone' => '0527121964',
                'active' => true,
            ],
            [
                'first_name' => 'שמחה בונם',
                'last_name' => 'צ\'רנסקי',
                'email' => 'sbc870964@gmail.com',
                'tel' => '0821101077',
                'phone' => '0524640964',
                'active' => true,
            ],
            [
                'first_name' => 'ראובן',
                'last_name' => 'דנציגר',
                'phone' => '0529874214',
                'active' => true,
            ],
            [
                'first_name' => 'טרפון',
                'last_name' => 'סלומיאנסקי',
                'phone' => '0527648964',
                'active' => true,
            ],
            [
                'first_name' => 'זאנוויל',
                'last_name' => 'צוקרמן',
                'phone' => '0511870964',
                'active' => true,
            ],
        ])->map([$this, 'create']);
    }

    public function create ($profile)
    {
        \DB::transaction(function () use($profile) {
            return tap(

                Profile::create($profile),

                function(Profile $profile){


                    $profile->roles()->attach(
                        Role::inRandomOrder()
                            ->limit(Arr::random([1,2,3,4,5,6]))->get()
                    );
                }
            );
        });
    }
}
