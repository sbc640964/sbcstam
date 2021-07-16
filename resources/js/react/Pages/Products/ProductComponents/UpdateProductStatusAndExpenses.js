import Heading3 from "../../../Components/typography/Heading3";
import Description from "../../../Components/typography/Description";
import FormElements from "../../../Components/Forms";
import {useEffect, useState} from "react";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import _ from "lodash";
import {useToasts} from "react-toast-notifications";
import axios from "axios";

function UpdateProductStatusAndExpenses (props)
{

    const {
        product,
        closeModal,
        setProduct,
        parent = null,
    } = props;

    const [productData, setProductData] = useState({...product, newExpense:{}});
    const [shadows, setshadows] = useState({top: false, bottom:false})

    useEffect(() => {
        setProductData({...product, newExpense:{}})
    },[product])

    const {addToast} = useToasts();

    const [errors, setErrors] = useState({});

    const currenciesOptions = [
        {value: 'USD', label: 'דולר'},
        {value: 'ILS', label: 'ש"ח'},
    ];

    const handleChange = (e, type = null, name = null) => {
        name = name ?? (e.target ? e.target.name : e.name);

        let value;

        if(type && type === 'select'){
            value = e;
        }else{
            value = (e.value ?? e.checked) ?? e.target.value;
        }
        _.set(productData, name, value);

        if(name === 'received' || name === 'scoreCost'){
            if(value){
                _.set(productData, 'newExpense.currency', _.find(currenciesOptions, v => v.value === product.currency))
                _.set(productData, 'newExpense.amount', product.cost[product.currency])
                productData.scoreCost = true;
                productData.addExpense = false;
            }else{
                _.set(productData, 'newExpense.currency', '')
                _.set(productData, 'newExpense.amount', '')
            }

            if(name === 'received' && !value){
                productData.scoreCost = false;
            }
        }

        if(name === 'newExpense.currency' && productData.received){
            _.set(productData, 'newExpense.amount', product.cost[value.value])
        }

        if(name === 'newExpense.type'){
            productData.newExpense.forSeller = value.toSeller;
        }

        setProductData(_.cloneDeep(productData));

        const errorsKeys = [name];

        setErrors(_.pickBy(errors, (v, k) => {
            return !_.includes(errorsKeys, k)
        }));
    }

    const handleSubmit = e =>
    {
        const send = axios.post(window.baseApiPath+`/products/${product.id}`, {
            status: productData.received ? product.status.value : productData.status.value,
            ...productData.newExpense,
            addExpense: productData.addExpense,
            received: productData.received,
            immediatePayment: productData.immediatePayment,
            size: productData.size,
            level: productData.level,
        });

        send.then(function (res) {
            setProduct(res.data);
            closeModal();
        })
            .catch(function (err) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                    addToast(err.response.data.message, {
                        type: 'error',
                        autoDismiss: true,
                    });
                } else {
                    addToast(err.message, {
                        type: 'error',
                        autoDismiss: true,
                    });
                }
            })

        e.preventDefault();
    }

        /*
    TODO: וודא ששם המופיע כבר הוא עם התפקיד המתאים
     */

    const renderQueryRolesUrl = () =>
    {
        if(productData.newExpense.type) {
            return productData.newExpense.type.roles.map(v => `roles[]=${v}&`);
        }
        return ''
    }

    const showProvider = () => (productData.addExpense
        && (productData.newExpense.type && productData.newExpense.type.value !== 1)
        && !productData.received);

    const checkScroll = e => {

        console.log(e);
        const {scrollTop, clientHeight, scrollHeight} = e.target;

        if(clientHeight >= scrollTop){
            setshadows({top: false, bottom: false});
        }

        if(e.target.scrollTop === 0){
            shadows.top = false;
            return setshadows({...shadows});
        }else if (scrollTop === clientHeight - scrollTop){
            shadows.bottom = false;
            return setshadows({...shadows});
        }

        setshadows({top: true, bottom: true});
    }

    return (
        <div
            className="bg-white rounded-lg w-96 shadow-2xl max-h-full transform absolute left-1/2 top-0 -translate-x-1/2"
        >
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
                <div className="p-6 pb-4">
                    <Heading3>עדכון {parent ? parent.name.children.labels[1] : 'מוצר'}</Heading3>
                    <Description>מזהה: {product.id}, {product.name.label ? product.name.label : product.description}</Description>
                </div>
                <div className="p-6 pt-0 relative scrollbar-thumb-gray-500 scrollbar-thin overflow-auto scrollbar-track-gray-200"
                     style={{maxHeight: '75vh'}}
                     onScroll={checkScroll}
                >
                    {shadows.top &&
                        <div
                            className="absolute top-0 left-0 bottom-0 right-0 shadow-2xl"
                            style={{boxShadow: '0 1em 1em -1em black inset'}}
                        >

                        </div>
                    }
                    <div className="grid grid-cols-4 gap-4">
                        {productData.type === 'package' &&
                            <>
                                <div className="col-span-4">
                                    <FormElements.Number
                                        label="גודל"
                                        placeholder="גודל"
                                        value={productData.size ?? ''}
                                        onChange={handleChange}
                                        name="size"
                                        errors={errors.size}
                                    />
                                </div>
                                <div className="col-span-4">
                                    <FormElements.Number
                                        label="רמה"
                                        placeholder="רמה"
                                        value={productData.level ?? ''}
                                        onChange={handleChange}
                                        name="level"
                                        errors={errors.level}
                                    />
                                </div>
                            </>
                        }
                        {!productData.received &&
                        <>
                            <div className="col-span-4">
                                <FormElements.Select2
                                    label="סטטוס מוצר"
                                    placeholder="בחר סטטוס"
                                    selectorView={i => i?.label ?? ''}
                                    onChange={handleChange}
                                    name="status"
                                    search={false}
                                    errors={errors.status}
                                    value={productData.status ?? ''}
                                    urlOptions={`${window.baseApiPath}/lists-data/statuses?key=view_frontend.edit&`}
                                />
                            </div>

                            <div className="col-span-2">
                                <FormElements.Switcher
                                    label="הוסף הוצאה"
                                    checked={productData.addExpense ?? false}
                                    onChange={handleChange}
                                    name="addExpense"
                                    disabledLabel="לא"
                                    enabledLabel="כן"
                                    errors={errors.addExpense}
                                />
                            </div>
                        </>
                        }

                        {product.name.type !== 'package' && (!product.children || !product.children.length) && product.status.value < 2 &&
                        <div className="col-span-2">
                            <FormElements.Switcher
                                label="עדכן קבלת מוצר"
                                checked={productData.received ?? false}
                                onChange={handleChange}
                                name="received"
                                disabledLabel="לא"
                                enabledLabel="כן"
                                errors={errors.received}
                            />
                        </div>
                        }

                        {(productData.received || productData.addExpense) &&
                        <>
                            {!productData.received &&
                            <div className="col-span-4">
                                <FormElements.Select2
                                    label="סוג הוצאה"
                                    placeholder="בחר סוג הוצאה"
                                    selectorView={i => i?.label ?? ''}
                                    onChange={handleChange}
                                    name="newExpense.type"
                                    search={false}
                                    errors={errors.type}
                                    value={productData.newExpense.type ?? ''}
                                    urlOptions={`${window.baseApiPath}/lists-data/expensesTypes`}
                                />
                            </div>
                            }
                            {productData.newExpense.type?.toSeller &&
                            <div className="col-span-4">
                                <FormElements.Switcher
                                    label="לחייב את כרטיס המוכר?"
                                    checked={productData.newExpense.forSeller ?? false}
                                    onChange={handleChange}
                                    name="newExpense.forSeller"
                                    disabledLabel="לא"
                                    enabledLabel="כן"
                                    errors={errors.forSeller}
                                />
                            </div>
                            }
                            {productData.received &&
                            <div className="col-span-4">
                                <FormElements.Switcher
                                    label="עלות מקורית"
                                    checked={productData.scoreCost ?? false}
                                    onChange={handleChange}
                                    name="scoreCost"
                                    disabledLabel="לא"
                                    enabledLabel="כן"
                                    errors={errors.scoreCost}
                                />
                            </div>
                            }
                            {showProvider() &&
                            <div className="col-span-4">
                                <FormElements.Select2
                                    label="ספק"
                                    placeholder="הקלד לפחות 3 תוים לחיפוש ספק"
                                    onChange={handleChange}
                                    name="newExpense.to"
                                    search={true}
                                    errors={errors.to}
                                    urlOptions={`${window.baseApiPath}/profiles?${renderQueryRolesUrl()}`}
                                    value={productData.newExpense.to ?? ''}
                                    selectorView={i => i.full_name}
                                />
                            </div>
                            }
                            <div className="col-span-4">
                                <FormElements.Number
                                    label="סכום"
                                    placeholder="סכום"
                                    disabled={productData.scoreCost}
                                    value={productData.newExpense.amount ?? ''}
                                    onChange={handleChange}
                                    name="newExpense.amount"
                                    errors={errors.amount}
                                />
                            </div>
                            <div className="col-span-4">
                                <FormElements.Select
                                    label="מטבע"
                                    placeholder="בחר מטבע"
                                    value={productData.newExpense.currency?.label ?? ''}
                                    onChange={handleChange}
                                    name="newExpense.currency"
                                    errors={errors.currency}
                                    options={currenciesOptions}
                                />
                            </div>
                            <div className="col-span-4 pt-2">
                                <FormElements.Switcher
                                    label="התשלום מיידי?"
                                    checked={productData.immediatePayment ?? false}
                                    onChange={handleChange}
                                    name="immediatePayment"
                                    disabledLabel="לא"
                                    enabledLabel="כן"
                                    errors={errors.immediatePayment}
                                />
                            </div>
                            {productData.immediatePayment &&
                            <div className="col-span-4">
                                <FormElements.Select
                                    label="אמצעי תשלום"
                                    placeholder="בחר אמצעי תשלום (אופצינלי)"
                                    value={productData.newExpense.method?.label ?? ''}
                                    onChange={handleChange}
                                    name="newExpense.method"
                                    errors={errors.method}
                                    options={[
                                        {value: 'אשראי', label: 'אשראי'},
                                        {value: 'מזומן', label: 'מזומן'},
                                        {value: 'צי\'ק', label: 'צי\'ק'},
                                        {value: 'העברה בנקאית', label: 'העברה בנקאית'},
                                        {value: 'אחר', label: 'אחר'},
                                    ]}
                                />
                            </div>
                            }
                            <div className="col-span-4">
                                <FormElements.Textarea
                                    label="הערה"
                                    placeholder="זמן הוא כסף..."
                                    value={productData.newExpense.note ?? ''}
                                    onChange={handleChange}
                                    name="newExpense.note"
                                    rows={4}
                                    errors={errors.note}
                                />
                            </div>
                        </>
                        }

                    </div>

                </div>
                <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4 rounded-b-lg">
                    <SecondaryButton tag="a" onClick={closeModal}>
                        ביטול
                    </SecondaryButton>
                    <PrimaryButton>
                        שנה סטטוס
                    </PrimaryButton>
                </div>
            </form>

        </div>
    )
}
export default UpdateProductStatusAndExpenses;
