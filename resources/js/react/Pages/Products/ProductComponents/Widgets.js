import _ from "lodash";
import {AiOutlineFontSize, FiMapPin, FiPackage, WiStars} from "react-icons/all";
import {FiChevronLeft, FiEdit3, FiShoppingCart} from "react-icons/fi";
import SaleProduct from "./SaleProduct";
import useModal from "../../../Uses/useModal";
import ChangeStatus from "./ChangeStatus";

function Widgets (props)
{
    const {
        product,
        setProduct
    } = props;

    const orderStatus = () =>
    {
        if(!product.orders.length){
            return('מחפש קונה');
        }

        const orderClose = _.filter(product.orders, v => _.includes([2,3], v.pivot.status.value));

        const priceOffers = _.filter(product.orders, v => v.pivot.status.value === 1);

        if(!orderClose.length && priceOffers.length){
            return 'בהצעות מחיר';
        }else if(!orderClose.length){
            return('מחפש קונה');
        }

        return orderClose[0].pivot.status.label;

    }

    const goTo = to =>
    {
        document.querySelector(to).scrollIntoView();
    }

    return(
        <div className="col-span-12">
            <div className="flex space-s-4 justify-between">
                <div className="bg-gray-50 h-14 rounded-lg flex text-center items-center w-full shadow overflow-hidden">
                    <div className="flex h-14 text-2xl w-14 bg-blue-100 text-blue-600 justify-center items-center">
                        <AiOutlineFontSize/>
                    </div>
                    <div className="p-1 flex items-center space-s-3 px-3">
                        <div className="text-3xl font-bold">{product.size}</div>
                        <div className="text-lg">גודל</div>
                    </div>
                </div>
                <div className="bg-gray-50 h-14 rounded-lg flex text-center items-center w-full shadow overflow-hidden">
                    <div className="flex h-14 text-3xl w-14 bg-purple-100 text-purple-600 justify-center items-center">
                        <WiStars/>
                    </div>
                    <div className="p-1 flex items-center space-s-3 px-3">
                        <div className="text-3xl font-bold">{product.level}</div>
                        <div className="text-lg">רמה</div>
                    </div>
                </div>
                <div className="bg-gray-50 h-14 rounded-lg flex text-center items-center w-full shadow overflow-hidden group">
                    <div className="flex h-14 text-2xl w-14 bg-pink-100 text-pink-600 justify-center items-center">
                        <FiMapPin stroke-width="1.5"/>
                    </div>
                    <div className="p-1 flex items-center space-s-3 flex-grow px-3">
                        <div className="text-lg">{product.status.label}</div>
                        <div className="text-lg flex-grow flex items-center justify-end pe-2  opacity-0 transition group-hover:opacity-100">
                            <EditStatus product={product} setProduct={setProduct}/>
                        </div>
                    </div>
                </div>
                {product.type === 'package' &&
                <div className="bg-gray-50 h-14 rounded-lg flex text-center items-center w-full shadow overflow-hidden">
                    <div className="flex h-14 text-2xl w-14 bg-yellow-100 text-yellow-600 justify-center items-center">
                        <FiPackage stroke-width="1.5"/>
                    </div>
                    <div className="p-1 flex items-center space-s-3 flex-grow px-3">
                        <div className="text-3xl font-bold">{product.children.length}</div>
                        <div className="text-lg">{product.name.children?.labels[0] ?? 'מוצרים' }</div>
                        <div className="text-lg flex-grow flex items-center justify-end pe-2">
                            <FiChevronLeft className="hover:opacity-80 cursor-pointer" onClick={() => goTo('#children')}/>
                        </div>
                    </div>
                </div>
                }
                <div className="bg-gray-50 h-14 rounded-lg flex text-center items-center w-full shadow overflow-hidden">
                    <div className="flex h-14 text-2xl w-14 bg-green-100 text-green-600 justify-center items-center">
                        <FiShoppingCart stroke-width="1.5"/>
                    </div>
                    <div className="p-1 flex items-center space-s-3 flex-grow px-3">
                        <div className="text-lg">{orderStatus()}</div>
                        <div className="text-lg flex-grow flex items-center justify-end pe-2">
                            {product.orders.length
                                ? <FiChevronLeft className="hover:opacity-80 cursor-pointer" onClick={() => goTo('#sales')}/>
                                : <SaleProduct product={product} setProduct={setProduct}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Widgets;

function EditStatus (props)
{
    const {product, setProduct} = props;

    const { openModal, closeModal, isOpen, Modal } = useModal({
        background: "rgba(0, 0, 0, 0.5)"
    });


    return(
        <>
            <FiEdit3 className="cursor-pointer hover:opacity-80 " onClick={openModal}/>
            {isOpen &&
            <Modal>
                <ChangeStatus product={product} setProduct={setProduct} closeModal={closeModal}/>
            </Modal>
            }
        </>
    )
}