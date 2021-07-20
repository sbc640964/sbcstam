import {FiPlus} from "react-icons/fi";
// import {motion} from 'framer-motion';
import FormElements from "../../../Components/Forms";
import {useState} from "react";
import _ from "lodash";
import Heading3 from "../../../Components/typography/Heading3";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import axios from "axios";
import {useToasts} from "react-toast-notifications";
import useBaseModal from "../../../Uses/useBaseModal";

function SaleProduct ({product, setProduct})
{
    const {closeModal, isOpen, Modal, openModal} = useBaseModal({
    });

    return(
        <>
            <FiPlus className="hover:opacity-80 cursor-pointer" onClick={openModal}/>
            {isOpen &&
                <Modal>
                    <FormSaleProduct
                        close={closeModal}
                        product={product}
                        setProduct={setProduct}
                    />
                </Modal>
            }
        </>
    )
}

export default SaleProduct;


function FormSaleProduct (props)
{

    const {close, product, setProduct} = props;

    const [sale, setSale] = useState({
        product_id: product.id,
        price: product.expenses_data.total_expect_expenses.USD,
        currency: {value: 'USD', label: 'דולר'}
    });

    const [errors, setErrors] = useState({

    });

    const {addToast} = useToasts();

    const handleSubmit = e =>
    {
        axios.post(window.baseApiPath+`/orders`, sale)
            .then(function (res) {
                console.log(res)
                setProduct(res.data);
                close();
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

    const handleChange = (e, type = null, name = null) =>
    {
        name = name ?? (e.target ? e.target.name : e.name);

        let value;

        if(type && type === 'select'){
            value = e;
        }else{
            value = (e.value ?? e.checked) ?? e.target.value;
        }

        if(name === 'currency'){
            let price = sale.price;
            if(value.value === 'USD'){
                price = price / window.exchangeRatesUSD;
            }else{
                price = price * window.exchangeRatesUSD;
            }
            _.set(sale, 'price', price);
        }

        _.set(sale, name, value);
        setSale(_.cloneDeep(sale));
        if(errors[name]){
            setErrors(_.pickBy(errors, (v, k) => {
                return k !== name
            }));
        }
    }

    const onBlurPrice = (e) =>
    {
        const value = e.target.value;
        if(value < product.expenses_data.total_expect_expenses[sale.currency.value]){
            sale.price = product.expenses_data.total_expect_expenses[sale.currency.value];
            errors.price = ['אין אפשרות לציין מחיר נמוך מהעלות'];
            setErrors(_.cloneDeep(errors));
            setSale(_.cloneDeep(sale))
        }
    }


     return(
             <div className="bg-white shadow-2xl animate-fadeIn w-96 rounded-lg">
                 <form onSubmit={handleSubmit}>
                     <div className="p-4">
                         <div>
                             <Heading3>מכירת פריט</Heading3>
                         </div>
                         <div className="grid grid-cols-4">
                             <div className="col-span-4">
                                 <FormElements.Select2
                                     label="לקוח"
                                     placeholder="הקלד לפחות 3 תוים לחיפוש לקוח"
                                     onChange={handleChange}
                                     name="customer"
                                     search={true}
                                     errors={errors.customer}
                                     urlOptions={`${window.baseApiPath}/profiles?roles[]=merchant&roles[]=client`}
                                     value={sale.customer ?? ''}
                                     selectorView={i => i.full_name}
                                 />
                             </div>
                             <div className="col-span-4">
                                 <FormElements.Select2
                                     label="סטטוס"
                                     placeholder="בחר סטטוס מכירה"
                                     onChange={handleChange}
                                     name="status"
                                     search={false}
                                     errors={errors.status}
                                     urlOptions={`${window.baseApiPath}/lists-data/statusSale`}
                                     value={sale.status ?? ''}
                                     selectorView={i => i.label}
                                 />
                             </div>
                             <div className="col-span-4">
                                 <FormElements.Textarea
                                     label="הערת מכירה"
                                     placeholder="סיכמנו שהוא לוקח את זה בלי להתלונן..."
                                     value={sale.note ?? ''}
                                     onChange={handleChange}
                                     name="note"
                                     rows={4}
                                     errors={errors.note}
                                 />
                             </div>
                             <div className="col-span-4">
                                 <FormElements.Number
                                     label="מחיר מכירה"
                                     placeholder="מחיר"
                                     value={sale.price}
                                     onChange={handleChange}
                                     name="price"
                                     errors={errors.price}
                                     onBlur={onBlurPrice}
                                 />
                             </div>
                             <div className="col-span-4">
                                 <FormElements.Select
                                     label="מטבע"
                                     placeholder="בחר מטבע"
                                     value={sale.currency?.label ?? ''}
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
                     </div>
                     <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4 rounded-b-lg">
                         <SecondaryButton tag="a" onClick={close}>
                             ביטול
                         </SecondaryButton>
                         <PrimaryButton>
                             צור מכירה
                         </PrimaryButton>
                     </div>
                 </form>
             </div>
     )
}


/*
<motion.div
    initial={{translateX: '-100%'}}
    animate={{translateX: '0%'}}
>
    <div className="bg-white shadow-lg min-h-screen">

    </div>
</motion.div>
 */
