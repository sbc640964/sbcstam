import Card from "../../Components/Cards/Card";
import Heading1 from "../../Components/typography/Heading1";
import Heading3 from "../../Components/typography/Heading3";
import Description from "../../Components/typography/Description";
import FormElements from "../../Components/Forms";
import {useState} from "react";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import SecondaryButton from "../../Components/Buttons/SecondaryButton";
import {useToasts} from "react-toast-notifications";
import axios from "axios";
import _ from 'lodash';
import {Redirect} from "react-router-dom";

import Products from '../../ObjectsData/Products'
import ProductStatuses from '../../ObjectsData/ProductStatuses'
import TypeWriting from '../../ObjectsData/TypeWriting'
import Switcher from "../../Components/Forms/Switcher";
import Community from "../../ObjectsData/Community";

function NewProfile (props)
{

    const [newProfile, setNewProfile] = useState({
        active: true,
        roles: [],
        type_writing: [],
        is_voting: true,
    });

    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState(false);

    const {addToast} = useToasts();

    const handleSubmit = (e) => {

        const _data = _.pickBy(_.cloneDeep(newProfile), v => v);

        axios.post(window.baseApiPath+'/profiles', _data)
        .then(function (response) {
            addToast(`פרופיל נוסף!`, {
                type: 'success',
                autoDismiss: true,
            });
            setRedirect(true);
        })
        .catch(function (err) {
            if(err.response.status === 422){
                setErrors(err.response.data.errors);
                addToast(err.response.data.message, {
                    type: 'error',
                    autoDismiss: true,
                });
            }else{
                addToast(err.message, {
                    type: 'error',
                    autoDismiss: true,
                });
            }
        });

        e.preventDefault();
    }

    const handleChange = (e, type = null, name = null) =>
    {
        name = name ?? (e.target ? e.target.name : e.name);

        let value;

        if(type && type === 'select'){
            value = e;
        }else{
            value = (e.value ?? e.checked) ?? e.target.value;
        }
        newProfile[name] = value;
        setNewProfile({...newProfile});
        if(errors[name]){
            setErrors(_.pickBy(errors, (v, k) => {
                return k !== name
            }));
        }
    }

    return(
        <div>
            {redirect &&
                <Redirect to="/profiles"/>
            }
            <div>
                <Heading1>פרופיל חדש</Heading1>
            </div>
            <form onSubmit={handleSubmit}>
                <Card>
                    <div className="grid grid-cols-3 gap-6 py-4 px-5">
                        <div className="col-span-3 lg:col-span-1">
                            <Heading3>פרטי פרופיל</Heading3>
                            <Description>פרטי בעל הפרופיל</Description>
                        </div>
                        <div className="col-span-3 lg:col-span-2 grid grid-cols-4 gap-4">
                            <div className="col-span-4">
                                <FormElements.Switcher
                                    label="פעיל"
                                    checked={newProfile.active ?? false}
                                    onChange={handleChange}
                                    name="active"
                                    disabledLabel="משתמש לא פעיל"
                                    enabledLabel="משתמש פעיל"
                                    errors={errors.active}
                                />
                            </div>
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Text
                                    label="שם פרטי"
                                    placeholder="שם פרטי"
                                    value={newProfile.first_name ?? ''}
                                    onChange={handleChange}
                                    name="first_name"
                                    errors={errors.first_name}
                                />
                            </div>
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Text
                                    label="שם משפחה"
                                    placeholder="שם משפחה"
                                    value={newProfile.last_name ?? ''}
                                    onChange={handleChange}
                                    name="last_name"
                                    errors={errors.last_name}
                                />
                            </div>
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Text
                                    label="נייד"
                                    placeholder="נייד"
                                    value={newProfile.phone ?? ''}
                                    onChange={handleChange}
                                    name="phone"
                                    errors={errors.phone}
                                />
                            </div>
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Text
                                    label="טלפון"
                                     placeholder="טלפון"
                                    value={newProfile.tel ?? ''}
                                    onChange={handleChange}
                                    name="tel"
                                    errors={errors.tel}
                                />
                            </div>
                            <div className="col-span-4">
                                <FormElements.Text
                                    label="אימייל"
                                    placeholder="אימייל"
                                    value={newProfile.email ?? ''}
                                    onChange={handleChange}
                                    name="email"
                                    errors={errors.email}
                                />
                            </div>
                            <div>
                                <FormElements.SwitcherGroup
                                    label="תפקידים"
                                    onChange={handleChange}
                                    name="roles"
                                    errors={errors.roles}
                                    urlOptions={`${window.baseApiPath}/roles`}
                                    selectorView="name"
                                    values={newProfile.roles ?? ''}
                                />
                            </div>
                        </div>
                    </div>
                    {_.find(newProfile.roles, v => v.slug === 'scribe') &&
                        <>
                            <div className="h-0.5 bg-gray-100 m-auto">
                            </div>

                            <div className="grid grid-cols-3 gap-6 py-4 px-5">
                                <div className="col-span-1">
                                    <Heading3>פרטי סופר</Heading3>
                                    <Description>...</Description>
                                </div>
                                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-4 gap-6">
                                    <div className="col-span-4">
                                        <FormElements.Select
                                            label="קהילה/חסידות"
                                            placeholder="חסיד בלב"
                                            value={newProfile.community?.label ?? ''}
                                            onChange={handleChange}
                                            name="community"
                                            errors={errors.community}
                                            options={Community}
                                        />
                                    </div>
                                    <div className="col-span-4">
                                        <FormElements.Switcher
                                            label="מצביע בבחירות"
                                            checked={newProfile.is_voting ?? false}
                                            onChange={handleChange}
                                            name="is_voting"
                                            disabledLabel="לא מצביע"
                                            enabledLabel="מצביע"
                                            errors={errors.is_voting}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <FormElements.Data
                                            label="תאריך תוקף תעודה"
                                            placeholder="בחר"
                                            description='השאר ריק ל"אין תעודה בתוקף"'
                                            value={newProfile.certificate_exp ?? ''}
                                            onChange={handleChange}
                                            name="certificate_exp"
                                            errors={errors.certificate_exp}
                                        />
                                    </div>
                                        <div className="col-span-2">
                                            {newProfile.certificate_exp &&
                                            <FormElements.Select2
                                                label="רב מפיק התעודה"
                                                placeholder="הרב בריח"
                                                value={newProfile.rabbi ?? false}
                                                onChange={handleChange}
                                                name="rabbi"
                                                selectorView={i => [i.first_name, i.last_name].join(' ')}
                                                urlOptions={`${window.baseApiPath}/profiles?roles[]=rabbi`}
                                                errors={errors.community}
                                                search={true}
                                            />
                                            }
                                        </div>
                                    <div>
                                        <FormElements.SwitcherGroup
                                            label="סוג כתיבה"
                                            onChange={handleChange}
                                            name="type_writing"
                                            errors={errors.type_writing}
                                            options={TypeWriting}
                                            selectorView="label"
                                            values={newProfile.type_writing ?? ''}
                                        />
                                    </div>

                                </div>
                            </div>
                        </>
                    }
                    <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4">
                        <SecondaryButton tag="a" to="/profiles">
                            ביטול
                        </SecondaryButton>
                        <PrimaryButton>
                            צור פרופיל חדש
                        </PrimaryButton>
                    </div>
                </Card>
            </form>
        </div>
    )
}

export default NewProfile;