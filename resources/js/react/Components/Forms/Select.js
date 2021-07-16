import Description from "../typography/Description";
import Error from "./Error";
import _ from 'lodash';
import {useRef, useState} from "react";

function Select(props)
{
    const {
        label,
        description,
        errors,
        className,
        options
    } = props;

    const [showOptions, setShowOptions] = useState(false);

    const newProps = _.pickBy(props, (v, k) => !_.startsWith(k, "on"));

    const optionsElement = useRef(null);

    const handleClick = (item) =>
    {
        setShowOptions(false);
        props.onChange(item, 'select', props.name);
    }

    const hideOptions = (e) =>
    {

    }

    const classes = `${className ?? ''} mt-1 relative rounded-lg shadow-sm border-gray-300 block w-full placeholder-gray-400 transition duration-150 ease-in-out text-sm focus:ring-primary-200 focus:ring-2 focus:border-0 focus:border-primary-300`

    return(
        <>
            <div className="relative">
                <label className="font-medium text-gray-700 text-sm ">
                    {label}
                    <input
                        {...newProps}
                        type="text"
                        autoComplete="off"
                        className={classes}
                        onFocus={() => setShowOptions(true)}
                        onBlur={() => setTimeout(() => setShowOptions(false), 200)}
                    />
                </label>
                {showOptions &&
                <div tabIndex={1} ref={optionsElement} className="max-h-60 absolute bg-white rounded-lg mt-1 shadow-lg block w-full top-full left-0 z-50 overflow-auto scrollbar-thin scrollbar-thumb-gray-100">
                    {options && options.map((item, index) => (
                        <div tabIndex={index + 1} key={index} className="p-2 hover:bg-primary-50 cursor-pointer" onClick={() => handleClick(item)}>{item.label}</div>
                    ))}
                </div>
                }
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

export default Select;