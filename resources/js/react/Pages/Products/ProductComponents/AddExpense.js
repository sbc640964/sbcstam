import useModal from "../../../Uses/useModal";
import {FiPlusCircle} from "react-icons/fi";
import AddExpenseForm from "./AddExpenseForm";

function AddExpense(props)
{
    const {product, setProduct, parent} = props;

    const { openModal, closeModal, isOpen, Modal } = useModal({
        background: "rgba(0, 0, 0, 0.5)"
    });

    return(
        <>
            <span
                className="text-2xl text-error-700 hover:text-error-400 cursor-pointer"
                onClick={openModal}
            >
                <FiPlusCircle/>
            </span>
            {isOpen &&
                <Modal>
                    <AddExpenseForm
                        product={product}
                        closeModal={closeModal}
                        setProduct={setProduct}
                        parent={parent}
                    />
                </Modal>
            }
        </>
    )
}

export default AddExpense;