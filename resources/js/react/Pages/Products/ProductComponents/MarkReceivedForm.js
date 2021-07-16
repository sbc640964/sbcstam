import {useState} from "react";
import {useToasts} from "react-toast-notifications";
import _ from "lodash";
import axios from "axios";
import Heading3 from "../../../Components/typography/Heading3";
import Description from "../../../Components/typography/Description";
import FormElements from "../../../Components/Forms";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";

function MarkReceivedForm (props)
{
    const {
        product,
        closeModal,
        setProduct,
        parent = null,
    } = props;

    const [newExpense, setNewExpense] = useState({
        amount: product.payment_units * product.cost_unit,
        currency: _.find([{value: 'USD', label: 'דולר'}, {value: 'ILS', label: 'ש"ח'}], v => v.value === product.currency),
        type: 1,
    });

    const {addToast} = useToasts();

    const [errors, setErrors] = useState({});

    const handleChange = (e, type = null, name = null) => {
        name = name ?? (e.target ? e.target.name : e.name);

        let value;

        if(type && type === 'select'){
            value = e;
        }else{
            value = (e.value ?? e.checked) ?? e.target.value;
        }
        newExpense[name] = value;
        setNewExpense({...newExpense});

        const errorsKeys = [name];

        if(name === 'scribe_seller' && e.checked === false){
            errorsKeys.push('scribe')
        }

        setErrors(_.pickBy(errors, (v, k) => {
            return !_.includes(errorsKeys, k)
        }));
    }

    const handleSubmit = e =>
    {
        const send = axios.post(window.baseApiPath+`/products/${product.id}/expense`, newExpense);

        send.then(function (res) {
            let p = parent ?? product;
            p.expense.push(res.data);
            setProduct(_.cloneDeep(p));
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

    return(
        <form
            className="bg-white rounded-lg w-96 shadow-2xl"
            onSubmit={handleSubmit}
        >
            <div className="p-6">
                <Heading3>עדכון קבלת מוצר ורישום הוצאה/חוב</Heading3>
                <Description>מזהה: {product.id}, {product.name.label ? product.name.label : product.description}</Description>
                <br/>
                <div>
                    <FormElements.Textarea
                        label="הערה"
                        placeholder="זמן הוא כסף..."
                        value={newExpense.note ?? ''}
                        onChange={handleChange}
                        name="note"
                        rows={4}
                        errors={errors.note}
                    />
                </div>
                <div>
                    <FormElements.Number
                        label="סכום"
                        placeholder="סכום"
                        value={newExpense.amount ?? ''}
                        onChange={handleChange}
                        name="amount"
                        errors={errors.amount}
                    />
                </div>
                <div className="col-span-4">
                    <FormElements.Select
                        label="מטבע"
                        placeholder="בחר מטבע"
                        value={newExpense.currency?.label ?? ''}
                        onChange={handleChange}
                        name="currency"
                        errors={errors.currency}
                        options={[
                            {value: 'USD', label: 'דולר'},
                            {value: 'ILS', label: 'ש"ח'},
                        ]}
                    />
                </div>
                <div className="col-span-4 pt-2">
                    <FormElements.Switcher
                        label="התשלום מיידי?"
                        checked={newExpense.immediatePayment ?? false}
                        onChange={handleChange}
                        name="immediatePayment"
                        disabledLabel="לא"
                        enabledLabel="כן"
                        errors={errors.immediatePayment}
                    />
                </div>
                {newExpense.immediatePayment &&
                <div className="col-span-4">
                    <FormElements.Select
                        label="אמצעי תשלום"
                        placeholder="בחר אמצעי תשלום (אופצינלי)"
                        value={newExpense.method?.label ?? ''}
                        onChange={handleChange}
                        name="method"
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
                <br/>
                <div className="border rounded-lg border-yellow-600 bg-yellow-100 p-2">
                    <p className="font-semibold text-center text-sm text-yellow-700">שים לב: המוצר יעבור לסטטוס "ממתין להגהה"</p>
                </div>
            </div>
            <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4 rounded-b-lg">
                <SecondaryButton tag="a" onClick={closeModal}>
                    ביטול
                </SecondaryButton>
                <PrimaryButton disabled={!_.isEmpty(errors)}>
                    עדכן מוצר
                </PrimaryButton>
            </div>
        </form>
    )
}

export default MarkReceivedForm;
