import React from "react";
import useModal from "../../../Uses/useModal";
import ChangeStatus from "./ChangeStatus";
import {FiEdit3} from 'react-icons/fi'
import UpdateProductStatusAndExpenses from "./UpdateProductStatusAndExpenses";

function EditIconModal(props)
{
    const { openModal, closeModal, isOpen, Modal } = useModal({
        background: "rgba(0, 0, 0, 0.5)"
    });

    return(
        <>
            <FiEdit3
                onClick={openModal}
                className="hover:opacity-100 opacity-50 cursor-pointer"
            />
            {isOpen &&
            <Modal>
                {React.cloneElement(props.children, {closeModal: closeModal})}
            </Modal>
            }
        </>
    )
}

export default EditIconModal;