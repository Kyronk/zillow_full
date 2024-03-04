import React from 'react'
import usePagination from "../../hooks/usePagination";

const Pagination = () => {
    const pagination = usePagination({total: 23, limit: 2, currentPage: 5, sibling: 1})
    console.log(pagination);
    return (
        <div>Pagination</div>
    )
}

export default Pagination