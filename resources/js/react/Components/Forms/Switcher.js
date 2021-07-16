import Description from "../typography/Description";
import Error from "./Error";

function Switcher(props)
{
    const {
        checked,
        enabledLabel,
        disabledLabel,
        label,
        onChange,
        errors,
        name,
        description
    } = props;
    
    const handleClick = () => {
        if(typeof onChange == "function") onChange({type: 'checkbox', name: name, checked: !checked});
    }

    return(
        <>
            {label &&
                <div className="font-medium text-gray-700 text-sm">
                    {label}
                </div>
            }
            <div className="mt-1 flex rounded-md">

                <div
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline ${checked ? 'bg-primary-600' : 'bg-gray-200'}`}
                    aria-checked="false"
                    role="checkbox"
                    tabIndex={0}
                    onClick={handleClick}
                >
                    <div
                        className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${checked ? '-translate-x-5' : '-translate-x-0'}`}
                        aria-hidden="true"
                    >
                    </div>
                </div>
                <div className="ms-3 text-sm text-gray-600">
                    {checked
                        ? <small>{enabledLabel}</small>
                        : <small>{disabledLabel}</small>
                    }
                </div>
            </div>
            {errors &&
                <Error errors={errors}/>
            }
            {description &&
                <Description>{description}</Description>
            }
        </>
    )
}

export default Switcher;