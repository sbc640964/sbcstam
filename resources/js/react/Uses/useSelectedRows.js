import _ from "lodash";
import {useState} from "react";

function useSelectedRows (rows)
{
    const [selectedRows, setSelectedRows] = useState([]);

    const addSelectedRows = (row) =>
    {
        selectedRows.push(row);
        setSelectedRows([...selectedRows]);
    }

    const removeSelectedRows = (row) =>
    {
        setSelectedRows(_.filter(selectedRows, v => v.id !== row.id));
    }

    const isSelected = (row) =>
    {
        return _.find(selectedRows, {id: row.id}) !== undefined;
    }

    const selectAll = () =>
    {
        selectedRows.push(...rows)
        setSelectedRows([...selectedRows])
    }

    const removeAll = () => {
        //setSelectedRows(_.filter(selectedRows, v => todo:......... ));
    }

    return {
        selectedRows: selectedRows,
        funcs : {
            addSelectedRows: addSelectedRows,
            removeSelectedRows: removeSelectedRows,
            isSelected: isSelected,
            selectAll: selectAll,
            removeAll: removeAll,
        }
    }
}

export default useSelectedRows;