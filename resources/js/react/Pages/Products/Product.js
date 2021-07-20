import {Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Heading1 from "../../Components/typography/Heading1";
import Card from "../../Components/Cards/Card";
import {FiPhone, FiSmartphone, FiTrash2} from "react-icons/fi";
import Description from "../../Components/typography/Description";
import Heading3 from "../../Components/typography/Heading3";
import {FaRegEnvelope} from "react-icons/fa";
import Loading from "../../Components/Loadings";
import Expenses from "./ProductComponents/Expenses";
import ChildrenProduct from "./ProductComponents/Children";
import Widgets from "./ProductComponents/Widgets";
import Orders from "./ProductComponents/Orders";
import WidgetsFlow from "./ProductComponents/WidgetsFlow";
import UpdateProductStatusAndExpenses from "./ProductComponents/UpdateProductStatusAndExpenses";
import EditIconModal from "./ProductComponents/EditIconModal";
import useBaseModal from "../../Uses/useBaseModal";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import SecondaryButton from "../../Components/Buttons/SecondaryButton";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import FormElements from "../../Components/Forms";

function Product (props)
{
    let { productId } = useParams();

    const [productData, setProductData] = useState(null)

    useEffect(() => {
        axios.get(`${window.baseApiPath}/products/${productId}`)
            .then(function (res){
                setProductData(res.data);
            });
        //todo: make catch()
    },[productId])

    if(!productData){
        return <Loading.Cards/>
    }

    return(
        <div className="text-gray-800">
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <Heading1>
                            {productData.name.label}
                            <p className="font-semibold text-gray-500 text-sm">מזהה: {productData.id}</p>
                        </Heading1>

                    </div>
                    <div className="flex space-s-4">
                        <EditIconModal>
                            <UpdateProductStatusAndExpenses
                                product={productData}
                                setProduct={setProductData}
                            />
                        </EditIconModal>
                        <DeleteProduct
                            product={productData.id}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <WidgetsFlow product={productData}/>
                    <Widgets product={productData} setProduct={setProductData}/>
                    <Card className="col-span-12 lg:col-span-6">
                        <div className="grid grid-cols-3 gap-6 py-4 px-5">
                            <div className="col-span-1">
                                <Heading3>פרטי הסופר</Heading3>
                                <Description>פרטים אודות הסופר</Description>
                            </div>
                            <div className="col-span-2 grid grid-cols-4 gap-4">
                                <div className="col-span-4">
                                    <div className="font-bold text-lg text-gray-800">{productData.scribe.full_name}</div>
                                    <div className="mt-1 block text-sm text-gray-400 flex flex-col space-y-1">
                                        <div className="flex space-s-3">
                                            {productData.scribe.phone &&
                                            <span className="flex space-s-1.5 items-center">
                                        <span><FiSmartphone/></span>
                                        <span>{productData.scribe.phone}</span>
                                    </span>
                                            }
                                            {productData.scribe.tel &&
                                            <span className="flex space-s-1.5 items-center">
                                        <span><FiPhone/></span>
                                        <span>{productData.scribe.tel}</span>
                                    </span>
                                            }
                                        </div>
                                        {productData.scribe.email &&
                                        <span className="flex space-s-1.5 items-center">
                                        <span><FaRegEnvelope/></span>
                                        <span>{productData.scribe.email}</span>
                                    </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="col-span-12 lg:col-span-6">
                        <div className="grid grid-cols-3 gap-6 py-4 px-5">
                            <div className="col-span-1">
                                <Heading3>פרטי המוכר</Heading3>
                                <Description>פרטים אודות המוכר</Description>
                            </div>
                            <div className="col-span-2 grid grid-cols-4 gap-4">
                                <div className="col-span-4">
                                    <div className="font-bold text-lg text-gray-800">{productData.seller.full_name}</div>
                                    <div className="mt-1 block text-sm text-gray-400 flex flex-col space-y-1">
                                        <div className="flex space-s-3">
                                            {productData.seller.phone &&
                                            <span className="flex space-s-1.5 items-center">
                                        <span><FiSmartphone/></span>
                                        <span>{productData.seller.phone}</span>
                                    </span>
                                            }
                                            {productData.seller.tel &&
                                            <span className="flex space-s-1.5 items-center">
                                        <span><FiPhone/></span>
                                        <span>{productData.seller.tel}</span>
                                    </span>
                                            }
                                        </div>
                                        {productData.seller.email &&
                                        <span className="flex space-s-1.5 items-center">
                                        <span><FaRegEnvelope/></span>
                                        <span>{productData.seller.email}</span>
                                    </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    {productData.children.length > 0 &&
                        <ChildrenProduct product={productData} setProduct={setProductData}/>
                    }
                    <Expenses product={productData} setProduct={setProductData}/>
                    <Orders product={productData} setProduct={setProductData}/>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Product;


function DeleteProduct ({product})
{
    const { openModal, closeModal, isOpen, Modal } = useBaseModal({});

    const [deleteExpenses, setDeleteExpenses] = useState(true);

    const [redirect, setRedirect] = useState(false);

    const deleteProduct = () => {
        axios.delete(`${window.baseApiPath}/products/${product}?expensesDel=${deleteExpenses}`)
            .then(res =>{
                setRedirect(true)
                closeModal()
            })
            .catch()
    }

    const message = 'אתה בטוח שברצונך למחוק המוצר?';

    return(
        <>
            {redirect &&
                <Redirect to="/products"/>
            }
            <FiTrash2 class="hover:opacity-100 opacity-50 cursor-pointer" onClick={openModal}/>
            {isOpen &&
            <Modal>
                <div className="bg-white shadow-lg rounded-lg" style={{width: '500px'}}>
                    <div className="font-semibold text-lg p-4 mb-6">
                        <div>
                            {message}
                        </div>
                        <FormElements.Switcher
                            label="למחוק הוצאות של המוצר"
                            checked={deleteExpenses ?? false}
                            onChange={() => setDeleteExpenses(v => !v)}
                            name="deleteExpenses"
                            disabledLabel="לא, ההוצאות יהפכו להוצאות גלובליות"
                            enabledLabel="כן"
                            //errors={errors.initial_expenditure_auto}
                        />
                    </div>
                    <div>
                        <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4 rounded-b-lg">
                            <SecondaryButton tag="a" onClick={closeModal}>
                                ביטול
                            </SecondaryButton>
                            <PrimaryButton onClick={deleteProduct}>
                                אישור
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>
            }
        </>
    )
}
