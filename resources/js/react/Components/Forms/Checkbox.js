
function Checkbox(props)
{
    const {
        label,
        value,
        onChange,
    } = props;

    return (
        <label>
            {label}
            <input
                type="checkbox"
                className="text-blue-400 rounded border-gray-400 h-4 w-4 focus:ring-0"
                checked={value}
                onChange={onChange}
            />
        </label>
    );
}

export default Checkbox;