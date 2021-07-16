<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Profile;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfilesController extends Controller
{
    public function index(Request $request)
    {
        if($perPage = $request->get('per_page')){
            return Profile::with('roles', 'scribe')->where('active', true)->filter($request->all())->paginate($perPage ?? 25);
        }
        return Profile::where('active', true)->filter($request->all())->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function validateNew ($request)
    {
        $validate  = [
            'active' => 'nullable|boolean',
            'email' => 'email|nullable|unique:profiles',
            'tel' => 'nullable|unique:profiles|regex:/^[+]?[0-9() -]*$/',
            'phone' => 'nullable|unique:profiles',
            'last_name' => 'required',
            'first_name' => 'required',
            'roles' => 'required',
        ];

        if(in_array('scribe', data_get($request->get('roles'), '*.slug'))){
            $validate = array_merge($validate, [
                'community' => 'required',
                'is_voting' => 'nullable|boolean',
                'type_writing' => 'required',
                'certificate_exp' => 'nullable|date',
            ]);

            if($request->get('certificate_exp')){
                $validate['rabbi'] = 'required';
            }
        }

        return $request->validate($validate);
    }

    public function validateUpdate($request)
    {
        $validate  = [
            'active' => 'nullable|boolean',
            'email' => 'email|nullable',
            'tel' => 'nullable|regex:/^[+]?[0-9() -]*$/',
            'phone' => 'nullable',
            'last_name' => 'required',
            'first_name' => 'required',
            'roles' => 'required',
        ];

        if(in_array('scribe', data_get($request->get('roles'), '*.slug'))){
            $validate = array_merge($validate, [
                'community' => 'required',
                'is_voting' => 'nullable|boolean',
                'type_writing' => 'required',
                'certificate_exp' => 'nullable|date',
            ]);

            if($request->get('certificate_exp')){
                $validate['rabbi'] = 'required';
            }
        }

        return $request->validate($validate);
    }


    public function store(Request $request, Profile $profile)
    {
        if($profile->id){
            $data = $this->validateUpdate($request);
        }else{
            $data = $this->validateNew($request);
        }

        $roles = collect($data['roles'])->pluck('id');
        $roles = Role::find($roles);

        DB::transaction(function () use($data, $roles, $profile) {
               return tap(
                   $profile->updateOrCreate([
                           'id' => $profile->id
                       ], [
                           'active' => $data['active'],
                           'email'  => $data['email'] ?? null,
                           'tel'    => $data['tel'] ?? null,
                           'phone'  => $data['phone'] ?? null,
                           'last_name'  => $data['last_name'],
                           'first_name'  => $data['first_name'],
                       ]),
                   function (Profile $profile) use ($roles, $data)
                   {
                       $profile->roles()->sync($roles);

                       if(in_array('scribe', data_get(request('roles'), '*.slug'))){
                           $profile->scribe()->create([
                               'community'          => $data['community']['value'],
                               'is_voting'          => $data['is_voting'] ?? false,
                               'type_writing'       => $data['type_writing'],
                               'certificate_exp'    => $data['certificate_exp'] ?? null,
                               'rabbi'              => isset($data['rabbi']) && $data['certificate_exp'] ? $data['rabbi']['id'] : null
                           ]);
                       }
                   }
               );
        });
    }

    public function show($profile)
    {
        return Profile::with('roles', 'scribe')->find($profile);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Profile $profile
     * @return \Illuminate\Http\Response
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Profile $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Profile $profile)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Profile $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        //
    }
}
