import useBaseModal from "../../Uses/useBaseModal";
import AddExpenseForm from "./AddExpenseForm";
import AddPaymentForm from "./AddPaymentForm";

function Overview (props)
{
    return(
        <div className="flex space-s-2">
            <AddExpense/>
            <AddPayment/>
        </div>
    )
}
export default Overview;


function AddExpense (props)
{

    const {closeModal, isOpen, Modal, openModal} = useBaseModal();

    return(
        <>
            <a onClick={openModal}
               className="bg-primary-600 text-white hover:bg-primary-500 rounded-lg font-semibold cursor-pointer p-2 px-4 text-sm"
            >
                הוסף הוצאה כללית
            </a>
            {isOpen &&
                <Modal>
                    <AddExpenseForm
                        closeModal={closeModal}
                    />
                </Modal>
            }
        </>

    )
}

function AddPayment (props)
{

    const {closeModal, isOpen, Modal, openModal} = useBaseModal();

    return(
        <>
            <a onClick={openModal}
               className="bg-primary-600 text-white hover:bg-primary-500 rounded-lg font-semibold cursor-pointer p-2 px-4 text-sm"
            >
                הוסף תשלום
            </a>
            {isOpen &&
            <Modal>
                <AddPaymentForm
                    closeModal={closeModal}
                />
            </Modal>
            }
        </>

    )
}
