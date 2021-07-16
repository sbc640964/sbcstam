import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {useState} from "react";

function HeadColumn(props)
{
    const {
        col,
        sortedRows
    } = props;

    const [orderBy, setOrderBy] = useState(0);

    const orderOptions = ['asc', 'desc'];

    const sortRows = () => {
        if(col.sortable){
            sortedRows(col.selector, orderOptions[orderBy]);
            setOrderBy( v => Number(!v));
        }
    }

    const styles = {wordBreak: 'break-word'};

    if(col.width){
        styles.width = col.width
        styles.flex =  `0 0 ${col.width}`
    }else{
        styles.flex =  '1 0 0px'
    }

    //flex items-center break-words w-full" style={{flex: '1 0 0px', wordBreak: 'break-word'}}

    return(
        <div
            className={`group flex w-full text-sm items-center space-s-2 justify-${col.align ?? (col.type === 'active' ? 'center' : 'start')}`}
            onClick={sortRows}
            style={styles}
        >
            <span className={col.sortable ? 'cursor-pointer hover:text-gray-500' : ''}>{col.label}</span>
            {col.sortable &&
            <span className={col.sortable ? 'cursor-pointer hover:text-gray-500' : ''}>
                {orderOptions[orderBy] === 'asc'
                    ? <FiChevronDown/>
                    : <FiChevronUp/>
                }
            </span>
            }
        </div>
    )
}

export default HeadColumn;