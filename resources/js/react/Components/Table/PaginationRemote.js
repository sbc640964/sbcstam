import BasePagination from "./BasePagination";

function PaginationRemote (props)
{
    const {
        data,
        setUrl,
        url,
    } = props;

    const r = url ? new URL(url) : null;
    console.log(r)
    const perPageUrl ='';

    const handlePaginate = (link) =>
    {
        if(!link.active || !link.url){

            setUrl(link.url)
        }
    }

    const changePerPage = (newPerPage) =>
    {
        setUrl(data.path + '?per_page=' + newPerPage ?? 20);
    }

    return(
        <BasePagination
            from={data.from}
            to={data.to}
            total={data.total}
            prevPage={() => handlePaginate(data.links[0])}
            prevPageDisabled={!data.links[0].url}
            nextPage={() => handlePaginate(data.links[data.links.length - 1])}
            nextPageDisabled={!data.links[data.links.length - 1].url}
            paginationItems={data.links.slice(1, -1)}
            goToPage={handlePaginate}
            perPage={data.per_page}
            changePerPage={changePerPage}
        />
    )
}

export default PaginationRemote;