import { FiXCircle, FiX } from "react-icons/fi";

function Notifications (props)
{
    return(
        <div className="p-4 shadow-md bg-white border border-gray-200 overflow-hidden rounded-lg w-96">
            <div className="flex space-s-4 items-start w-full">
                <div className="flex-shrink-0">
                    <FiXCircle className="h-6 w-6 text-error-400"/>
                </div>
                <div className="w-0 flex-1 mt-0.5">
                    <p className="text-gray-600 text-sm font-medium leading-5">Error!</p>
                    <p className="text-gray-400">{props.children ?? 'For some reason there was some error'}</p>
                </div>
                <div className="flex-shrink-0 text-gray-300 hover:text-gray-400 cursor-pointer">
                    <FiX onClick={props.onDismiss}/>
                </div>
            </div>
        </div>
    )
}


export default Notifications;