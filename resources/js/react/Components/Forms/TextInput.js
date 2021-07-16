import Description from "../typography/Description";
import Error from "./Error";

function TextInput(props)
{
    const {
        label,
        description,
        placeholder,
        errors,
        className,
    } = props;

    const classes = `${className ?? ''} mt-1 relative rounded-lg shadow-sm border-gray-300 block w-full placeholder-gray-400 transition duration-150 ease-in-out text-sm focus:ring-primary-200 focus:ring-2 focus:border-0 focus:border-primary-300`

    return(
        <>
            <label className="font-medium text-gray-700 text-sm">
                {label}
                <input
                    {...props}
                    type="text"
                    placeholder={placeholder}
                    className={classes}/>
            </label>
            {errors &&
                <Error errors={errors}/>
            }
            {description &&
                <Description>{description}</Description>
            }
        </>
    )
}

export default TextInput;