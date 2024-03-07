import React from 'react'
import usePagination from "../../hooks/usePagination";
import PaginationItem from './PaginationItem';

const Pagination = ({
    total,
    limit,
    page, 
    sibling
}) => {
    const pagination = usePagination({total: total, limit: limit, currentPage: page, sibling: 1})
    console.log(pagination);
    return (
        <div className='flex items-center justify-center gap-2'>
            {pagination?.map((el, idx) => <PaginationItem content={el} key={idx} />)}
        </div>
    )
}

export default Pagination