import _ from 'lodash';
import {FiChevronLeft} from 'react-icons/fi';
import {FiChevronRight} from 'react-icons/fi';
import PaginateItem from "./PaginateItem";
import BasePagination from "./BasePagination";

function Pagination (props)
{
    const {
        currentPage,
        totalPages,
        last,
        first,
        nextPage,
        prevPage,
        reset,
        goToPage,
        goEnd,
        setPerPage,
        perPage,
        total,
        format = '4,2,2,4',
    } = props;


    const links = Array(totalPages).fill(null).map((value, index) => {
        return {
            label: index + 1,
            active: index + 1 === currentPage,
        }
    })


    return(
        <BasePagination
            from={perPage * (currentPage - 1) + 1}
            to={perPage * currentPage <= total ? perPage * currentPage : total}
            total={total}
            prevPage={prevPage}
            prevPageDisabled={first}
            nextPage={nextPage}
            nextPageDisabled={last}
            paginationItems={links}
            goToPage={goToPage}
            perPage={perPage}
            changePerPage={setPerPage}
        />
    )
}

export default Pagination;