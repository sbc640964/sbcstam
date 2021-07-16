
function Table ({numRows = 10})
{
    return (
        <div className="flex flex-col space-y-2">
            {Array(numRows).fill(null).map((v, i) => (
                <div className="w-full h-10 animate-pulse bg-gray-50" key={i}>

                </div>
            ))}
        </div>

    )
}

export default Table;