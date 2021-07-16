import {useEffect, useState} from "react";
import axios from "axios";
import PaginationRemote from "./PaginationRemote";
import BaseTable from "./BaseTable";

function TableRemote (props)
{
    const {
        options,
        columns,
        url:baseUrl
    } = props;

    const [url, setUrl] = useState(baseUrl);

    const [data, setData] = useState(null);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        axios.get(url, {
            cancelToken: source.token
        }).then( res => {
            setData(res.data);
        });

        return () => source.cancel();

    },[url]);

    const sortedRows = (selector, orderBy) => {

    }

    return(
        <BaseTable
            options={options}
            columns={columns}
            rows={data ? data.data : null}
            paginate={ data && data.last_page > 1 ? PaginationRemote({data:data, setUrl:setUrl, url:url}) : false}
            sortedRows={sortedRows}
        />
    )
}

export default TableRemote;