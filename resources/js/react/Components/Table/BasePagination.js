import PaginateItem from "./PaginateItem";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

function BasePagination (props)
{
    const {
        from,
        to,
        total,
        prevPage,
        prevPageDisabled,
        nextPage,
        nextPageDisabled,
        paginationItems,
        goToPage,
        perPage,
        changePerPage,
    } = props;

    return(
        <div className="flex justify-between mt-8">
            <div className="flex space-s-1 p-3 items-center justify-center">
                <span>Showing {from} - {to} of {total}</span>
            </div>
            <div className="flex space-s-1 p-3">
                <div className="pe-4 flex space-s-2 justify-center items-center">
                    <span className="text-sm">View on page:</span>
                    <input type="number" className="rounded border-gray-300 p-1 py-0.75 text-sm text-center w-20 focus:border-blue-500" defaultValue={perPage} onBlur={ e => changePerPage(e.target.value)}/>
                </div>
                <PaginateItem cal={prevPage} disabled={prevPageDisabled}>
                    <FiChevronLeft/>
                </PaginateItem>
                {paginationItems.map((item, index) =>(
                    <PaginateItem cal={() => goToPage(item)} current={item.active} key={index}>
                        {item.label ?? index + 1}
                    </PaginateItem>
                ))}
                <PaginateItem cal={nextPage} disabled={nextPageDisabled}>
                    <FiChevronRight/>
                </PaginateItem>
            </div>
        </div>
    )
}

export default BasePagination;