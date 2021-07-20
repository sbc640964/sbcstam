import Heading3 from "../../Components/typography/Heading3";
import FormElements from "../../Components/Forms";
import SecondaryButton from "../../Components/Buttons/SecondaryButton";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import _ from "lodash";
import {useState} from "react";
import {useToasts} from "react-toast-notifications";
import axios from "axios";
import Description from "../../Components/typography/Description";

function AddPaymentForm(props)
{
    const {
        closeModal,
    } = props;

    const [newPayment, setNewPayment] = useState({
        immediatePayment: false,
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

        if(name === 'type'){
            newPayment.forSeller = value.toSeller;
        }

        newPayment[name] = value;
        setNewPayment({...newPayment});

        const errorsKeys = [name];

        setErrors(_.pickBy(errors, (v, k) => {
            return !_.includes(errorsKeys, k)
        }));
    }

    const handleSubmit = e =>
    {
        const data = {
            to: newPayment.to ? newPayment.to.id : null,
            currency: newPayment.currency ? newPayment.currency.value : null,
            amount: newPayment.amount ?? null,
            method: newPayment.method ? newPayment.method.value : null,
        };

        const send = axios.post(window.baseApiPath+`/payments`, data);

        send.then(function (res) {
            closeModal();
            addToast('התשלום נוסף!', {
                type: 'success',
                autoDismiss: true,
            });
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
                <Heading3>עדכון תשלום</Heading3>
                <br/>
                <div className="col-span-4">
                    <FormElements.Select
                        label="אמצעי תשלום"
                        placeholder="בחר אמצעי תשלום (אופצינלי)"
                        value={newPayment.method?.label ?? ''}
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
                <div>
                    <FormElements.Select2
                        label="ספק"
                        placeholder="הקלד לפחות 3 תוים לחיפוש ספק"
                        onChange={handleChange}
                        name="to"
                        search={true}
                        errors={errors.to}
                        urlOptions={`${window.baseApiPath}/profiles`}
                        value={newPayment.to ?? ''}
                        selectorView={i => i.full_name}
                    />
                </div>
                <div>
                    <FormElements.Number
                        label="סכום"
                        placeholder="סכום"
                        value={newPayment.amount ?? ''}
                        onChange={handleChange}
                        name="amount"
                        errors={errors.amount}
                    />
                </div>
                <div className="col-span-4">
                    <FormElements.Select
                        label="מטבע"
                        placeholder="בחר מטבע"
                        value={newPayment.currency?.label ?? ''}
                        onChange={handleChange}
                        name="currency"
                        errors={errors.currency}
                        options={[
                            {value: 'USD', label: 'דולר'},
                            {value: 'ILS', label: 'ש"ח'},
                        ]}
                    />
                </div>
            </div>
            <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4 rounded-b-lg">
                <SecondaryButton tag="a" onClick={closeModal}>
                    ביטול
                </SecondaryButton>
                <PrimaryButton>
                    הוסף תשלום
                </PrimaryButton>
            </div>
        </form>
    )
}

export default AddPaymentForm;
