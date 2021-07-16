import {useToasts} from "react-toast-notifications";
import _ from "lodash";
import {useState} from "react";
import axios from "axios";
import Heading3 from "../../../Components/typography/Heading3";
import Description from "../../../Components/typography/Description";
import FormElements from "../../../Components/Forms";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";

function ChangeStatus (props)
{
    const {
        product,
        closeModal,
        setProduct,
        parent = null,
    } = props;

    const [status, setStatus] = useState(product.status);

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
        setStatus(value);

        const errorsKeys = [name];

        setErrors(_.pickBy(errors, (v, k) => {
            return !_.includes(errorsKeys, k)
        }));
    }

    const handleSubmit = e =>
    {
        const send = axios.post(window.baseApiPath+`/products/${product.id}/status`, {status: status, parent: parent});

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

    return (
        <form
            className="bg-white rounded-lg w-96 shadow-2xl"
            onSubmit={handleSubmit}
        >
            <div className="p-6">
                <Heading3>עדכון סטטוס</Heading3>
                <Description>מזהה: {product.id}, {product.name.label ? product.name.label : product.description}</Description>
                <br/>
                <div className="col-span-4 lg:col-span-2">
                    <FormElements.Select2
                        label="סטטוס מוצר"
                        placeholder="בחר סטטוס"
                        selectorView={i => i?.label ?? ''}
                        onChange={handleChange}
                        name="status"
                        search={false}
                        errors={errors.status}
                        value={status ?? ''}
                        urlOptions={`${window.baseApiPath}/lists-data/statuses?key=view_frontend.new&`}
                    />
                </div>
            </div>
            <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4 rounded-b-lg">
                <SecondaryButton tag="a" onClick={closeModal}>
                    ביטול
                </SecondaryButton>
                <PrimaryButton disabled={!_.isEmpty(errors)}>
                    שנה סטטוס
                </PrimaryButton>
            </div>
        </form>
    )
}

export default ChangeStatus;