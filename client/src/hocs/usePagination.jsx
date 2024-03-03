import React, { useMemo } from 'react'
import { renderRangerNumber } from '../utils/fn';

const usePagination = ({
    total = 0,  
    currentPage = 1, 
    limit = 1, 
    sibling = 0,
}) => {
    
    const paginationArray = useMemo(() => {
        const pageSize = +limit;
        const pageNumber = Math.ceil(total / pageSize);
        const totalPaginationItem = 5 + sibling;
        
        if(pageNumber <= totalPaginationItem) {
            return renderRangerNumber(1, pageNumber);
        }

    }, [total, limit, currentPage, sibling]);

    

    return paginationArray;

}

export default usePagination