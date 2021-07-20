import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import useBaseModal from "../../Uses/useBaseModal";
import AddExpenseForm from "./AddExpenseForm";
import {FiPlus} from 'react-icons/fi'

function Overview (props)
{
    return(
        <div>
            <AddExpense/>
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
