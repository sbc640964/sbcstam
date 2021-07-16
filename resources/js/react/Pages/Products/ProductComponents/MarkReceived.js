import useModal from "../../../Uses/useModal";
import {FiCheckSquare} from "react-icons/fi";
import MarkReceivedForm from "./MarkReceivedForm";

function MarkReceived (props)
{
    const {product, setProduct, parent} = props;

    const { openModal, closeModal, isOpen, Modal } = useModal({
        background: "rgba(0, 0, 0, 0.5)"
    });

    return(
        <>
            <span
                className="text-2xl text-success-700 hover:text-success-500 cursor-pointer"
                onClick={openModal}
            >
                <FiCheckSquare/>
            </span>
            {isOpen &&
            <Modal>
                <MarkReceivedForm
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

export default MarkReceived;