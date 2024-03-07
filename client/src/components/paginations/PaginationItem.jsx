import React from 'react'
// import usePagination from '../../hooks/usePagination'
import clsx from 'clsx'
import { twMerge } from "tailwind-merge";


const PaginationItem = ({ content }) => {
    
    if(!Number(content))
        return (
            <div className='w-10 h-10 rounded-sm bg-main-50 text-main-500 flex items-center justify-center'>
                {content}
            </div>
            )

    return (
        <div
            className={twMerge(
                clsx("w-10 h-10 rounded-sm bg-main-50 text-main-500 flex items-center justify-center")
            )}>
            {content}
        </div>
    )
}

export default PaginationItem