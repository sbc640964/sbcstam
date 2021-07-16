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
import TypeWriting from '../../ObjectsData/TypeWriting'

function NewProduct(props)
{

    const [newProduct, setNewProduct] = useState({
        scribe_seller: true,
        currency: {value: 'ILS', label: 'ש"ח'},
    });

    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState(false);

    const {addToast} = useToasts();

    const handleSubmit = (e) => {

        axios.post(window.baseApiPath+'/products', newProduct)
        .then(function (response) {
            addToast(`מוצר ${response.data.name} נוסף!`, {
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

    const handleChange = (e, type = null, name = null) => {
        name = name ?? (e.target ? e.target.name : e.name);

        let value;

        if(type && type === 'select'){
            value = e;
        }else{
            value = (e.value ?? e.checked) ?? e.target.value;
        }
        newProduct[name] = value;
        setNewProduct({...newProduct});

        const errorsKeys = [name];

        if(name === 'scribe_seller' && e.checked === false){
            errorsKeys.push('scribe')
        }

        setErrors(_.pickBy(errors, (v, k) => {
            return !_.includes(errorsKeys, k)
        }));
    }

    return(
        <div>
            {redirect &&
                <Redirect to="/products"/>
            }
            <div>
                <Heading1>מוצר חדש</Heading1>
            </div>
            <form onSubmit={handleSubmit}>
                <Card>
                    <div className="grid grid-cols-3 gap-6 py-4 px-5">
                        <div className="col-span-1">
                            <Heading3>פרטי מוצר</Heading3>
                            <Description>פרטים אודות המוצר</Description>
                        </div>
                        <div className="col-span-2 grid grid-cols-4 gap-4">
                            <div className="col-span-4">
                                <FormElements.Select2
                                    label="שם המוצר"
                                    placeholder="שם המוצר"
                                    value={newProduct.name ?? ''}
                                    onChange={handleChange}
                                    name="name"
                                    errors={errors.name}
                                    search={false}
                                    urlOptions={`${window.baseApiPath}/lists-data/productDataObject`}
                                    selectorView={i => i?.label ?? ''}
                                />
                            </div>
                            <div className="col-span-4">
                                <FormElements.Switcher
                                    label="המוכר הוא הסופר?"
                                    checked={newProduct.scribe_seller ?? false}
                                    onChange={handleChange}
                                    name="scribe_seller"
                                    disabledLabel="לא"
                                    enabledLabel="כן"
                                    errors={errors.scribe_seller}
                                />
                            </div>
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Select2
                                    label="מוכר"
                                    placeholder="הקלד כדי לחפש את המוכר"
                                    onChange={handleChange}
                                    name="seller"
                                    search={true}
                                    errors={errors.seller}
                                    urlOptions={`${window.baseApiPath}/profiles?roles[]=merchant${newProduct.scribe_seller ? '&roles[]=scribe': ''}`}
                                    value={newProduct.seller ?? ''}
                                    selectorView={i => i.full_name}
                                />
                            </div>
                            {!newProduct.scribe_seller &&
                                <div className="col-span-4 lg:col-span-2">
                                    <FormElements.Select2
                                        label="סופר"
                                        placeholder="הקלד כדי לחפש את הסופר"
                                        onChange={handleChange}
                                        name="scribe"
                                        search={true}
                                        errors={errors.scribe}
                                        urlOptions={`${window.baseApiPath}/profiles?roles[]=scribe`}
                                        value={newProduct.scribe ?? ''}
                                        selectorView={i => i.full_name}
                                    />
                                </div>
                            }
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Select2
                                    label="סטטוס מוצר"
                                    placeholder="בחר סטטוס"
                                    selectorView={i => i?.label ?? ''}
                                    onChange={handleChange}
                                    name="status"
                                    search={false}
                                    errors={errors.status}
                                    value={newProduct.status ?? ''}
                                    urlOptions={`${window.baseApiPath}/lists-data/statuses?key=view_frontend.new&s=true`}
                                />
                            </div>
                            <div className="col-span-4">
                                <FormElements.Textarea
                                    label="תיאור מוצר"
                                    placeholder="מוצר הכי יפה בעולם!!! :)"
                                    value={newProduct.description ?? ''}
                                    onChange={handleChange}
                                    name="description"
                                    rows={4}
                                    errors={errors.description}
                                />
                            </div>
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Number
                                    label="גודל"
                                    placeholder="גודל שורה"
                                    value={newProduct.size ?? ''}
                                    onChange={handleChange}
                                    name="size"
                                    rows={4}
                                    errors={errors.size}
                                />
                            </div>
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Number
                                    label="רמה"
                                    placeholder="רמת כתב"
                                    value={newProduct.level ?? ''}
                                    onChange={handleChange}
                                    name="level"
                                    rows={4}
                                    errors={errors.level}
                                />
                            </div>
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Select
                                    label="כתב"
                                    placeholder="בחר כתב"
                                    value={newProduct.type_writing?.label ?? ''}
                                    onChange={handleChange}
                                    name="type_writing"
                                    errors={errors.type_writing}
                                    options={TypeWriting}
                                />
                            </div>
                            <div className="col-span-4 lg:col-span-2">
                                <FormElements.Number
                                    label={`מחיר עלות ${newProduct.name?.type === 'package' ? 'יחידה/עמוד' : ''}`}
                                    placeholder="מחיר"
                                    value={newProduct.cost_unit}
                                    onChange={handleChange}
                                    name="cost_unit"
                                    errors={errors.cost_unit}
                                />
                            </div>
                            <div className="col-span-4">
                                <FormElements.Select
                                    label="מטבע"
                                    placeholder="בחר מטבע"
                                    value={newProduct.currency?.label ?? ''}
                                    onChange={handleChange}
                                    name="currency"
                                    errors={errors.currency}
                                    options={[
                                        {value: 'USD', label: 'דולר'},
                                        {value: 'ILS', label: 'ש"ח'},
                                    ]}
                                />
                            </div>
                            {!_.includes([1, 2], newProduct.status?.value) &&
                                <div className="col-span-4">
                                    <FormElements.Switcher
                                        label="לעדכן חוב?"
                                        checked={newProduct.initial_expenditure_auto ?? false}
                                        onChange={handleChange}
                                        name="initial_expenditure_auto"
                                        disabledLabel="לא"
                                        enabledLabel="כן"
                                        errors={errors.initial_expenditure_auto}
                                        description="סמן רק עם הסכום מוכן במלואו"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4">
                        <SecondaryButton tag="a" to="/products">
                            ביטול
                        </SecondaryButton>
                        <PrimaryButton disabled={!_.isEmpty(errors)}>
                            צור מוצר
                        </PrimaryButton>
                    </div>
                </Card>
            </form>
        </div>
    )
}

export default NewProduct;