import Description from "../typography/Description";
import Error from "./Error";

function Textarea(props)
{
    const {
        label,
        description,
        placeholder,
        errors,
    } = props;

    return(
        <>
            <label className="font-medium text-gray-700 text-sm">
                {label}
                <textarea
                    {...props}
                    placeholder={placeholder}
                    className="scrollbar-thumb-gray-200 scrollbar-thin  mt-1 relative rounded-md shadow-sm border-gray-300 block w-full placeholder-gray-400 transition duration-150 ease-in-out text-sm focus:ring-primary-200 focus:ring-2 focus:border-0 focus:border-primary-300"/>
            </label>
            {errors &&
                <Error errors={errors}/>
            }
            <Description>{description}</Description>
        </>
    )
}

export default Textarea;