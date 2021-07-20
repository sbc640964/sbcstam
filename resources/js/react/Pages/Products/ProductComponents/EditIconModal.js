import React from "react";
import {FiEdit3} from 'react-icons/fi'
import useBaseModal from "../../../Uses/useBaseModal";

function EditIconModal(props)
{
    const { openModal, closeModal, isOpen, Modal } = useBaseModal({});

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
