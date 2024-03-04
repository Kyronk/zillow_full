import React, { useMemo } from 'react'
import { renderRangerNumber } from '../utils/fn';
import { BiDotsHorizontalRounded } from "react-icons/bi";


const usePagination = ({
    total = 0,  
    currentPage = 1, 
    limit = 1, 
    sibling = 0,
}) => {
    
    const paginationArray = useMemo(() => {
        const pageSize = +limit;
        const pageNumber = Math.ceil(total / pageSize);
        const totalPaginationItem = 5 + sibling * 2;
        
        if(pageNumber <= totalPaginationItem) {
            return renderRangerNumber(1, pageNumber);
        }

        const isShowDotsInLeft = currentPage - sibling > 3;
        const isShowDotsInRight = currentPage - sibling - pageNumber - 2;

        if (isShowDotsInLeft && !isShowDotsInRight) {
            const rightStart = pageNumber - 2 - sibling * 2;
            const rightArray = renderRangerNumber(rightStart, pageNumber);
            return [1, <BiDotsHorizontalRounded />, ...rightArray]
        } 

        if (!isShowDotsInLeft && isShowDotsInRight) {
            const leftArray = renderRangerNumber(1, 3 + sibling * 2);
            return [...leftArray, <BiDotsHorizontalRounded />, pageNumber]
        }

        const siblingLeft = Math.max(1, currentPage - sibling);
        const siblingRight = Math.min(pageNumber, currentPage + sibling);

        if (isShowDotsInLeft && isShowDotsInRight) {
            const middleArray = renderRangerNumber(siblingLeft, siblingRight);
            return [1, <BiDotsHorizontalRounded />, ...middleArray, <BiDotsHorizontalRounded />, pageNumber]
        }

    }, [total, limit, currentPage, sibling]);

    

    return paginationArray;

}

export default usePagination