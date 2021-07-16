
function Card(props)
{
    return(
        <div className={`bg-gray-50 border shadow rounded-lg ${props.className ?? ''}`}>
            {props.children}
        </div>
    )
}

export default Card;