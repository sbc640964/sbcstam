import {useEffect, useState} from "react";

function usePaginate(props)
{
    const {
        data,
        perPage:pp = 25,
    } = props;

    const [currentData, setCurrentData] = useState(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [perPage, setPerPage] = useState(pp);

    useEffect(() => {
        if(data && data.length){
            setCurrentData(
                data.slice((currentPageNumber - 1) * perPage, currentPageNumber * perPage)
            );
        }
    },[currentPageNumber, data, perPage]);

    useEffect(() => {
        if(currentPageNumber > Math.ceil(data.length / perPage)){
            goStart();
        }
    },[currentPageNumber, perPage, data]);

    const totalRows = data.length;

    const totalPages = Math.ceil(totalRows / perPage);

    const nextPage = () => {
        if(currentPageNumber < totalPages){
            setCurrentPageNumber(currentPageNumber + 1);
        }
    }

    const prevPage = () => {
        if(currentPageNumber > 0){
            setCurrentPageNumber(currentPageNumber - 1);
        }
    }

    const goToPage = (item) => {
        let page = item.label;
        if(page > totalPages) page = totalPages;
        if(page < 1) page = 1;
        setCurrentPageNumber(page);
    }

    const goEnd = () => {
        setCurrentPageNumber(totalPages);
    }

    const goStart = () => {
        setCurrentPageNumber(1);
    }

    const actions = {
        nextPage: nextPage,
        prevPage: prevPage,
        reset: goStart,
        goToPage: goToPage,
        goEnd: goEnd,
        setPerPage: setPerPage,
    }

    return {
        rows: currentData,
        currentPage: currentPageNumber,
        totalPages: totalPages,
        last: currentPageNumber === totalPages,
        first: currentPageNumber === 1,
        perPage: perPage,
        total: totalRows,
        ...actions
    };
}

export default usePaginate;