
function Heading1(props)
{
    return(
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            {props.children}
        </h1>
    )
}

export default Heading1;