import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";

function useConfirmModal (props)
{
    const {
        message,
        closeModal,
        callback
    } = props;

    return(
        <div className="bg-white shadow-lg rounded-lg" style={{width: '500px'}}>
            <div className="font-semibold text-lg p-4 mb-6">
                {message}
            </div>
            <div>
                <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4 rounded-b-lg">
                    <SecondaryButton tag="a" onClick={closeModal}>
                        ביטול
                    </SecondaryButton>
                    <PrimaryButton onClick={callback}>
                        אישור
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default useConfirmModal;