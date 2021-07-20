<?php


namespace App;


use phpDocumentor\Reflection\Types\False_;

class ObjectsData
{
    static public function typeWriting()
    {
        return collect([
            ["value" => 1, "label" => 'אשכנזי'],
            ["value" => 2, "label" => 'ספרדי'],
            ["value" => 3, "label" => 'אר"י'],
            ["value" => 4, "label" => 'וועליש'],
            ["value" => 5, "label" => 'סודי'],
        ]);
    }

    static public function productDataObject ()
    {
        return collect([
            [
                "value" => 1,
                "label" => 'ספר תורה',
                "type" => 'package',
                'children_auto' => true,
                'units_labels' => ['עמודים', 'עמוד'],
                'children' => [
                    'labels'    => ['יריעות', 'יריעה'],
                    'qty'       => 62,
                    'units_payments' => [
                        ['qty' => 1, 'units_payments' => 3],
                        ['qty' => 59, 'units_payments' => 4],
                        ['qty' => 2, 'units_payments' => 3],
                    ]
                ],
                'expect_expenses' => [
                    3 => ['cost' => 2000, 'currency' => 'ILS'],
                    4 => ['cost' => 1800, 'currency' => 'ILS'],
                    5 => ['cost' => 300, 'currency' => 'ILS'],
                    6 => ['cost' => 500, 'currency' => 'ILS'],
                    10 => ['cost' => 19220, 'currency' => 'ILS'],
                    11 => ['cost' => 1000, 'currency' => 'ILS'],
                ]
            ],
            ["value" => 2, "label" => 'תפילין רש"י', "type" => 'simple'],
            ["value" => 3, "label" => 'תפילין ר"ת', "type" => 'simple'],
            ["value" => 4, "label" => 'מזוזה', "type" => 'simple', 'children' => ['labels' => ['מזוזות', 'מזוזה'],]],
            ["value" => 5, "label" => 'פיטום הקטורת', "type" => 'simple'],
            ["value" => 6,
                "label" => 'מגילת אסתר',
                "type" => 'simple',
                'expect_expenses' => [
                    2 => ['cost' => 75, 'currency' => 'ILS'],
                    3 => ['cost' => 80, 'currency' => 'ILS'],
                    4 => ['cost' => 60, 'currency' => 'ILS'],
                    5 => ['cost' => 30, 'currency' => 'ILS'],
                    11 => ['cost' => 35, 'currency' => 'ILS'],
                ]

            ],
            ["value" => 7, "label" => 'מגילת איכה', "type" => 'simple'],
            ["value" => 8, "label" => 'שיר השירים', "type" => 'simple'],
            ["value" => 9, "label" => 'קוהלת', "type" => 'simple'],
            ["value" => 10, "label" => 'יהושע', "type" => 'simple'],
            ["value" => 11, "label" => 'שופטים', "type" => 'simple'],
            ["value" => 12, "label" => 'שמואל', "type" => 'simple'],
            ["value" => 13, "label" => 'מלכים', "type" => 'simple'],
            ["value" => 14, "label" => 'ישעיהו', "type" => 'simple'],
            ["value" => 15, "label" => 'ירמיהו', "type" => 'simple'],
            ["value" => 16, "label" => 'יחזקאל', "type" => 'simple'],
            ["value" => 17, "label" => 'תרי עשר', "type" => 'simple'],
            ["value" => 18, "label" => 'תהילים', "type" => 'simple'],
        ]);
    }

    static public function statuses ()
    {
        return collect([
            [
                'value' => 1, 'label' => 'בהזמנה',
                'view_frontend' => [
                    'new' => true,
                    'beforeReceived' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 2, 'label' => 'בכתיבה',
                'view_frontend' => [
                    'new' => true,
                    'beforeReceived' => true,
                    'received' => true,
                    'edit' => true,
                    'markReceived' => true,
                ],
            ],
            ['value' => 3, 'label' => 'ממתין להגהה',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 4, 'label' => 'בהגהת מחשב 1',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 5, 'label' => 'ממתין לתיקונים',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 6, 'label' => 'בתיקונים',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 7, 'label' => 'ממתין לסופר',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 8, 'label' => 'סופר ממלא',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 9, 'label' => 'ממתין להגהת מחשב נוספת',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 10, 'label' => 'הגהת מחשב 2',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 11, 'label' => 'ממתין לתיקונים',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 12, 'label' => 'תיקונים חוזרים',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 13, 'label' => 'ממתין לשאלת רב',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 14, 'label' => 'ממתין לתיקון מיוחד',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 15, 'label' => 'ממתין לקילוף שם',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 16, 'label' => 'בקילוף שם',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 17, 'label' => 'נשלח לדוגמא',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 18, 'label' => 'נשלח לחו"ל',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 19, 'label' => 'נמכר',
                'view_frontend' => [
                    'new' => false,
                    'received' => true,
                    'edit' => false
                ],
            ],
            [
                'value' => 20, 'label' => 'חזרות',
                'view_frontend' => [
                    'new' => false,
                    'received' => true,
                    'edit' => true
                ],
            ],
            [
                'value' => 18, 'label' => 'אחר',
                'view_frontend' => [
                    'new' => true,
                    'received' => true,
                    'edit' => true
                ],
            ],
        ]);
    }

    static public function expensesTypes ()
    {
        return collect([
            ['value' => 1, 'label' => 'סופר/סוחר', "roles" => ['scribe', 'merchant']],
            ['value' => 2, 'label' => 'תיקונים', "roles" => ['repairer'], 'toSeller' => true],
            ['value' => 3, 'label' => 'הגהת מחשב', "roles" => ['proofreader']],
            ['value' => 4, 'label' => 'הגהת גברא', "roles" => ['proofreader']],
            ['value' => 5, 'label' => 'משלוח עירוני', "roles" => ['shipping']],
            ['value' => 6, 'label' => 'משלוח בינעירוני', "roles" => ['shipping']],
            ['value' => 7, 'label' => 'משלוח חו"ל', "roles" => ['shipping']],
            ['value' => 8, 'label' => 'קילוף שם', "roles" => ['repairer'], 'toSeller' => true],
            ['value' => 9, 'label' => 'אחר'],
            ['value' => 10, 'label' => 'קלף', 'roles' => ['scribe_shop']],
            ['value' => 11, 'label' => 'תפירה', 'roles' => ['tailor']],
            ['value' => 11, 'label' => 'תיוג', 'roles' => ['labeling'], 'toSeller' => true],
        ]);
    }

    static public function community ()
    {
        return collect([
            ['value' => 1, 'label' => 'גור'],
            ['value' => 2, 'label' => 'בעלזא'],
            ['value' => 3, 'label' => 'ויזניץ'],
            ['value' => 4, 'label' => 'ויזניץ מרכז'],
            ['value' => 5, 'label' => 'ביאלה'],
            ['value' => 6, 'label' => 'רחמסטריוקא'],
            ['value' => 7, 'label' => 'באבוב'],
            ['value' => 8, 'label' => 'סאטמר'],
            ['value' => 9, 'label' => 'חב"ד'],
            ['value' => 11,'label' => 'טאלנא'],
            ['value' => 10,'label' => 'אחר'],
        ]);
    }

    static public function statusSale ()
    {
        return collect([
            ['value' => 1, 'label' => 'הצע"מ/בירור'],
            ['value' => 2, 'label' => 'סגור'],
            ['value' => 3, 'label' => 'הושלם'],
            ['value' => 4, 'label' => 'בוטל ידני'],
            ['value' => 5, 'label' => 'בוטל אוטומטי'],
        ]);
    }

}

