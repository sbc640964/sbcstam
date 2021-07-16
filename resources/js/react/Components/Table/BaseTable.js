import HeadTable from "./headTable";
import Row from "./Row";
import Loafing from "../Loadings";
import PaginationRemote from "./PaginationRemote";
import useSelectedRows from "../../Uses/useSelectedRows";
import _ from "lodash";

function BaseTable (props)
{
    const {
        options,
        columns,
        rows,
        paginate,
        sortedRows
    } = props;

    const { selectedRows, funcs:rowsSelected } = useSelectedRows(rows)


    return(
        <div className="flex flex-col">
            {!options.hiddenTableHead &&
            <HeadTable
                columns={columns}
                options={options}
                sortedRows={sortedRows}
                rowsSelected={rowsSelected}
            />
            }
            {rows ?
                rows.map((row, index) => (
                    <Row
                        columns={columns}
                        row={row}
                        globalOptions={options}
                        key={index}
                        rowsSelected={rowsSelected}
                    />
                )) :
                <Loafing.Table/>
            }
            {paginate ?? ''}
        </div>
    )
}

export default BaseTable;