import Checkbox from "../Forms/Checkbox";
import Column from "./Column";

function Row(props)
{
    const {
        row,
        columns,
        globalOptions,
        rowsSelected,
    } = props;

    const handleChange = (e) =>
    {
        if(e.target.checked){
            return rowsSelected.addSelectedRows(row);
        }

        rowsSelected.removeSelectedRows(row);
    }

    return (
        <div className="flex space-s-4 py-2 text-sm font-light px-7 border-b hover:bg-gray-50 w-full">
            {globalOptions.selectedRows &&
            <div className="pe-3 w-12 flex justify-center items-center">
                <Checkbox
                    value={rowsSelected.isSelected(row)}
                    onChange={handleChange}
                />
            </div>
            }
            {columns.map( (col, index) => (
                <Column
                    col={col}
                    row={row}
                    globalOptions={globalOptions}
                    key={index}
                />
            ))}
        </div>
    )
}

export default Row;