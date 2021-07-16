<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rows = collect([
            [
                'name'    => 'סופר',
                'slug'    => 'scribe'
            ],
            [
                'name'    => 'סוחר',
                'slug'    => 'merchant'
            ],
            [
                'name'    => 'מגיה',
                'slug'    => 'proofreader'
            ],
            [
                'name'    => 'רב',
                'slug'    => 'rabbi'
            ],
            [
                'name'    => 'מתקן',
                'slug'    => 'repairer'
            ],
            [
                'name'    => 'לקוח מזדמן',
                'slug'    => 'client'
            ],
            [
                'name'    => 'שליחויות',
                'slug'    => 'shipping'
            ],
            [
                'name' => 'חנות סופרים',
                'slug'  => 'scribe_shop'
            ],
            [
                'name' => 'תופר',
                'slug'  => 'tailor'
            ],
            [
                'name' => 'מתייג',
                'slug'  => 'labeling'
            ],
            //labeling
        ])->map([Role::class, 'create']);
    }
}
