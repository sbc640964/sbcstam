function PaginateItem(props)
{
    const {
        cal,
        disabled,
        children,
        current,
    } = props;

    const defaultClass = "h-8 w-8 rounded border flex items-center justify-center font-semibold";

    const specificClasses = disabled ? 'opacity-60 text-gray-600' :
        ( current ? 'bg-blue-500 text-white' :'cursor-pointer hover:border-blue-500 hover:text-blue-400 text-gray-600');

    const handleClick = () => {
        if(!disabled && !current){
            cal();
        }
    }
    return(
        <a href className={defaultClass + ' ' + specificClasses} onClick={handleClick} >
            {children}
        </a>
    )
}

export default PaginateItem;