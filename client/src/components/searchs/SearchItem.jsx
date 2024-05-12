import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const SearchItem = ({title, children, className}) => {
    return (
        <div 
            className={twMerge(
                clsx('flex relative flex-col gap-2 border-r justify-center items-center', className)
                )}>
            <h3 className="font-bold text-main-700">{title}</h3>
            {children}
        </div>
    )
}

export default SearchItem