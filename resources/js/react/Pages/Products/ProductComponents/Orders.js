import Heading3 from "../../../Components/typography/Heading3";
import Description from "../../../Components/typography/Description";
import Card from "../../../Components/Cards/Card";
import CurrencyFormatSwitcher from "../../../Components/currencyFormatSwitcher";
import _ from 'lodash';
import TableLocal from "../../../Components/Table/TableLocal";
import 'moment/locale/he';
import moment from "moment";
import {FiCheckCircle, FiEye, FiLock, FiRotateCcw, FiUnlock} from "react-icons/all";
import {FiEdit3, FiTrash2, FiXCircle} from "react-icons/fi";
import SaleProduct from "./SaleProduct";
import axios from "axios";
import ConfirmModal from "../../../Components/Modals/ConfirmModal";
import {useEffect, useState} from "react";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import useBaseModal from "../../../Uses/useBaseModal";
import ScrollBoxShadow from "../../../Components/ScrollBox/ScrollBoxShadow";
import FormElements from "../../../Components/Forms";
import {useToasts} from "react-toast-notifications";

function Orders (props)
{
    const {
        product,
    } = props;

    const {orders} = product;

    const finalOrder = _.find(orders, v => v.pivot.status.value === 2 ||  v.pivot.status.value === 3);

    return(
        <Card className="col-span-12">
            <div className="grid grid-cols-3 gap-6 py-4 px-5" id="sales">
                <div className="col-span-12 flex justify-between items-center">
                    <div>
                        <Heading3>מכירות/הצעות מחיר</Heading3>
                        <Description>מכירות והצעות מחיר</Description>
                    </div>
                    {!finalOrder &&
                        <div>
                            <SaleProduct product={props.product} setProduct={props.setProduct}/>
                        </div>
                    }
                </div>
                {finalOrder &&
                    <div className="col-span-12 flex flex-col divide-y text-gray-800">
                        <div className="border rounded-lg py-2 p-3 bg-green-50 text-green-900">
                            <div className="font-bold">
                                מכירה סופית #{finalOrder.id}
                                <div className="text-sm font-normal">{moment(finalOrder.created_at).locale('he').format('Do/MM/Y')}</div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">הקונה:</span>
                                    <span>{finalOrder.customer.full_name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">מחיר מכירה:</span>
                                    <span>{finalOrder.pivot.price}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">מטבע:</span>
                                    <span>{finalOrder.pivot.currency}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">סטטוס:</span>
                                    <span>{finalOrder.pivot.status.label}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">הערת מכירה:</span>
                                    <span>{finalOrder.pivot.note}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-span-12 flex flex-col divide-y text-gray-800">
                    <TableLocal
                        options={{
                            selectedRows: false,
                            perPage: 10,
                        }}
                        rows={orders}
                        columns={[
                            {label: 'תאריך רישום', type: 'cal', cal: row =>
                                    <span>
                                        <div className="font-bold leading-none">מכירה #{row.id}</div>
                                        <small className="font-semibold text-gray-500 leading-none">{moment(row.created_at).locale('he').format('Do/MM/Y')}</small>
                                    </span>
                            },
                            {label: 'קונה', type: 'cal', cal: row =>
                                    <div>
                                        <div className="font-semibold">{row.customer.full_name}</div>
                                    </div>
                            },
                            {label: 'מחיר מכירה',  type: 'cal', cal: (row, col, options) =>
                                    <div className="font-bold">
                                        <CurrencyFormatSwitcher>{row.pivot.price}</CurrencyFormatSwitcher>
                                    </div>
                            },
                            {label: 'מטבע', type: 'cal', cal: row =>
                                    <div>
                                        <div className="font-semibold">{row.pivot.currency}</div>
                                    </div>

                            },
                            {
                                label: 'סטטוס', type: 'cal', cal: row =>
                                    <div>
                                        <div className="font-semibold leading-none">{row.pivot.status.label}</div>
                                        <small className="text-xs text-gray-500 leading-none">סטטוס המכירה: {row.status.label}</small>
                                    </div>
                            },
                            {label: '', type: 'cal', cal: row => <Actions product={props.product} setProduct={props.setProduct} sale={row} finalOrder={finalOrder}/>
                            }
                        ]}
                    />
                </div>
            </div>
        </Card>
    )
}

export default Orders;


/*********************/

function Actions (props) {
    const {
        product,
        sale,
        setProduct,
        finalOrder
    } = props;

    const cancelSale = () => {
        axios.delete(`${window.baseApiPath}/products/${product.id}/orders/${sale.id}`)
            .then(res =>
                setProduct(res.data)
            )
            .catch()
    }

    const [isLock, setLock] = useState(false);

    useEffect(() => {
        setLock(_.includes([2, 3], sale.pivot.status.value));
    }, [sale]);

    const reSale = () => {
        axios.put(`${window.baseApiPath}/products/${product.id}/resale/${sale.id}`)
            .then(res =>
                setProduct(res.data)
            )
            .catch()
    }

    return (
        <div className="flex space-s-3 justify-end w-full text-lg items-center">
            {_.includes([4, 5], sale.pivot.status.value) && !finalOrder &&
            <FiRotateCcw class="hover:opacity-100 opacity-50 cursor-pointer" onClick={reSale}/>
            }

            {sale.pivot.status.value === 2 &&
            <CompleteSaleConfirm sale={sale} setProduct={setProduct}/>
            }

            {!_.includes([4, 5], sale.pivot.status.value) && (!finalOrder || (finalOrder.id === sale.id && finalOrder.pivot.status.value !== 3)) &&
            <LockCustomerConfirm sale={sale} setProduct={setProduct} isLock={isLock} setLock={setLock}/>
            }

            {(!finalOrder || finalOrder.pivot.status.value === 2) &&
            <EditSale sale={sale} setProduct={setProduct}/>
            }

            <FiEye class="hover:opacity-100 opacity-50 cursor-pointer"/>

            {!isLock && !(_.includes([4, 5], sale.pivot.status.value)) &&
            <FiXCircle class="hover:opacity-100 opacity-50 cursor-pointer" onClick={cancelSale}/>
            }
            {!isLock &&
                <DeleteForce sale={sale} setProduct={setProduct}/>
            }
        </div>
    )
}

function DeleteForce (props)
{
    const {sale, setProduct} = props;

    const { openModal, closeModal, isOpen, Modal } = useBaseModal({});

    const deleteOrder = () => {
        axios.delete(`${window.baseApiPath}/products/${sale.pivot.product_id}/orders/${sale.id}?force=true`)
            .then(res =>{
                setProduct(res.data)
                closeModal()
            })
            .catch()
    }

    const message = 'אתה בטוח שברצונך למחוק את הפריט מההזמנה?';

    return(
        <>
            <FiTrash2 class="hover:opacity-100 opacity-50 cursor-pointer" onClick={openModal}/>
            {isOpen &&
                <Modal>
                    <ConfirmModal closeModal={closeModal} message={message} callback={deleteOrder}/>
                </Modal>
            }
        </>
    )
}

function EditSale (props)
{
    const {sale, setProduct} = props;

    const { openModal, closeModal, isOpen, Modal } = useBaseModal({});

    return(
        <>
            <FiEdit3 class="hover:opacity-100 opacity-50 cursor-pointer" onClick={openModal}/>
            {isOpen &&
            <Modal>
                <EditSaleForm setProduct={setProduct} sale={sale} closeModal={closeModal}/>
            </Modal>
            }
        </>
    )
}

function CompleteSaleConfirm(props)
{
    const {sale, setProduct} = props;

    const { openModal, closeModal, isOpen, Modal } = useBaseModal({
        background: "rgba(0, 0, 0, 0.5)"
    });

    const handleConfirm = () =>
    {
        axios.put(`${window.baseApiPath}/products/${sale.pivot.product_id}/complete/${sale.id}`)
            .then(r => {
                setProduct(r.data)
                closeModal()
            })
    }

    const message = 'נא אשר שהמוכר קיבל את המגילה.'

    return(
        <>
            <FiCheckCircle class="hover:opacity-100 opacity-50 cursor-pointer" onClick={openModal}/>
            {isOpen &&
                <Modal>
                    <ConfirmModal closeModal={closeModal} message={message} callback={handleConfirm}/>
                </Modal>
            }
        </>
    )
}

function LockCustomerConfirm (props)
{
    const {sale, setProduct, isLock, setLock} = props;

    const { openModal, closeModal, isOpen, Modal } = useBaseModal({
        background: "rgba(0, 0, 0, 0.5)"
    });

    const handleConfirm = () =>
    {
        axios.put(`${window.baseApiPath}/products/${sale.pivot.product_id}/${isLock ? 'unlock-sale' : 'lock-sale'}/${sale.id}`)
            .then(r => {
                setProduct(r.data)
                //setLock(_.includes([2,3], _.find(r.data.orders, o => o.id = sale.id).pivot.status.value));
                closeModal()
            })
    }

    const message =
        <div>
            {isLock
                ? 'המוכר חזר בו?, אשר את פעולת העדכון'
                : 'הקונה מעוניין? ברוך ה\', אשר את סגירת העסקה'
            }
            <small className="font-normal text-gray-500 block">
                {isLock
                    ? 'שים לב! יש להעביר ידני מתעניינים אחרים למצב פעיל'
                    : 'שים לב! המתעניינים האחרים יעברו אוטומטית לסטטוס "בוטל אוטומטי"'
                }
            </small>
        </div>

    return(
        <>
            {!isLock
                ? <FiLock class="hover:opacity-100 opacity-50 cursor-pointer" onClick={openModal}/>
                : <FiUnlock class="hover:opacity-100 opacity-50 cursor-pointer" onClick={openModal}/>
            }
            {isOpen &&
                <Modal>
                    <ConfirmModal closeModal={closeModal} message={message} callback={handleConfirm}/>
                </Modal>
            }
        </>
    )
}

function EditSaleForm (props)
{
    const {
        sale:_sale,
        setProduct,
        closeModal,
    } = props;

    const [sale, setSale] = useState({
        currency: {USD: {value: 'USD', label: 'דולר'}, ILS:{value: 'ILS', label: 'ש"ח'}}[_sale.pivot.currency],
        price: _sale.pivot.price,
    });

    const [errors, setErrors] = useState({

    });

    const {addToast} = useToasts();

    const handleSubmit = e =>
    {
        axios.put(window.baseApiPath+`/products/${_sale.pivot.product_id}/orders/${_sale.pivot.order_id}`, sale)
            .then(function (res) {
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

    const handleChange = (e, type = null, name = null) =>
    {
        name = name ?? (e.target ? e.target.name : e.name);

        let value;

        if(type && type === 'select'){
            value = e;
        }else{
            value = (e.value ?? e.checked) ?? e.target.value;
        }

        _.set(sale, name, value);
        setSale(_.cloneDeep(sale));
        if(errors[name]){
            setErrors(_.pickBy(errors, (v, k) => {
                return k !== name
            }));
        }
    }

    return(
        <div className="bg-white shadow-lg rounded-lg w-96">
            <div className="font-semibold text-lg p-4 mb-6">
                הזמנה/הצעת מחיר
            </div>
            <div className="px-6 pb-2">
                קונה: {_sale.customer.full_name}
            </div>
            {/*<div className="flex flex-col space-y-2 px-6">*/}
            {/*    {Array(3).fill(null).map((v, k) => (*/}
            {/*        <div className="rounded-lg bg-gray-100 p-2">*/}
            {/*            מוצר מדהים!*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div>
                <ScrollBoxShadow maxHeight="75vh">
                    <div className="grid grid-cols-4 p-6">
                        <div className="col-span-4">
                            <FormElements.Number
                                label="מחיר מכירה"
                                placeholder="מחיר"
                                value={sale.price}
                                onChange={handleChange}
                                name="price"
                                errors={errors.price}
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
                </ScrollBoxShadow>
            </div>
            <div>
                <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4 rounded-b-lg">
                    <SecondaryButton tag="a" onClick={closeModal}>
                        ביטול
                    </SecondaryButton>
                    <PrimaryButton onClick={handleSubmit}>
                        אישור
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )

}
