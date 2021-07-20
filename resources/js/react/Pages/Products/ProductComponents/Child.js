import CurrencyFormatSwitcher from "../../../Components/currencyFormatSwitcher";
import EditIconModal from "./EditIconModal";
import UpdateProductStatusAndExpenses from "./UpdateProductStatusAndExpenses";
import {FiMapPin} from "react-icons/all";

function Child (props)
{
    const {
        product,
        child,
        setProduct
    } = props;

    return(
        <div className="border rounded-lg p-4 col-span-4 text-center text-gray-800 flex justify-between items-center">
            {child.description}
            <div className="text-sm font-semibold text-gray-500">
                {child.payment_units} {product.name.units_labels ? product.name.units_labels[0] : product.name.label}
            </div>
            <div className="text-sm font-semibold text-gray-500">
                <span className="me-1 font-normal">
                  מחיר ל{product.name.children?.labels ? product.name.children?.labels[1] : product.name.label}:
                </span>
                <span>
                  <CurrencyFormatSwitcher>{child.cost}</CurrencyFormatSwitcher>
                </span>
            </div>
            <div className="w-40">
                <div className="flex items-center text-sm justify-start space-s-2">
                    <div className="flex text-xl text-pink-600">
                        <FiMapPin stroke-width="1.5"/>
                    </div>
                    <div>
                        {child.status.label}
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <EditIconModal>
                    <UpdateProductStatusAndExpenses
                        product={child}
                        parent={product}
                        setProduct={setProduct}
                    />
                </EditIconModal>
            </div>
        </div>
    )
}

export default Child;
