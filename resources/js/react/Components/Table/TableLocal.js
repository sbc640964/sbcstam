import {useEffect, useState} from "react";
import usePaginate from "../../Uses/usePaginte";
import useSelectedRows from "../../Uses/useSelectedRows";
import _ from "lodash";
import HeadTable from "./headTable";
import Row from "./Row";
import Loafing from "../Loadings";
import Pagination from "./Pagination";

function TableLocal (props)
{
    const {
        columns,
        options,
        callback:Callback = null,
    } = props;

    const [rows, setRows] = useState(props.rows);

    const paginate = usePaginate({data: rows, perPage: options.perPage ?? 25});

    const { selectedRows, funcs:rowsSelected } = useSelectedRows(rows)

    useEffect(() => {
        setRows(props.rows)
    },[props.rows])

    if(!rows.length && Callback){
        return Callback;
    }

    const sortedRows = (selector, orderBy) =>
    {
        setRows(_.orderBy(rows, selector, orderBy));
    }

    return(
        <div>
            {!options.hiddenTableHead &&
            <HeadTable
                columns={columns}
                options={options}
                sortedRows={sortedRows}
                rowsSelected={rowsSelected}
            />
            }
            {paginate.rows ?
                paginate.rows.map((row, index) => (
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
            {paginate.totalPages > 1 &&
            <Pagination {...paginate}/>
            }
        </div>
    );
}

export default TableLocal;