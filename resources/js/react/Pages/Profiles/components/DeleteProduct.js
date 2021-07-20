import {useState} from 'react';
import useBaseModal from "../../../Uses/useBaseModal";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {FiTrash2} from "react-icons/fi";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";

function DeleteProfile ({profileId})
{
    const { openModal, closeModal, isOpen, Modal } = useBaseModal({});

    const [redirect, setRedirect] = useState(false);

    const deleteProduct = () => {
        axios.delete(`${window.baseApiPath}/profiles/${profileId}`)
            .then(res =>{
                setRedirect(true)
                closeModal()
            })
            .catch()
    }

    const message = 'אתה בטוח שברצונך למחוק הפרופיל?';

    return(
        <>
            {redirect &&
            <Redirect to="/profiles"/>
            }
            <FiTrash2 class="hover:opacity-100 opacity-50 cursor-pointer" onClick={openModal}/>
            {isOpen &&
            <Modal>
                <div className="bg-white shadow-lg rounded-lg" style={{width: '500px'}}>
                    <div className="font-semibold text-lg p-4 mb-6">
                        <div>
                            {message}
                        </div>
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

export default DeleteProfile;
