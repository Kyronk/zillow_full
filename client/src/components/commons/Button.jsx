import React from 'react'

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { FaSpinner } from "react-icons/fa6";

const Button = ({ 
    children, 
    className, 
    // handleOnClick,
    onClick, 
    type = 'button', 
    disabled
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={twMerge(
                clsx(
                    "py-3 px-4 text-white bg-main-700 rounded-md flex justify-center items-center gap-3", 
                    className, 
                    disabled && 'opacity-50'
                    )
            )}
            disabled={disabled}
        >
            {disabled && (<span className='animate-spin'>
                <FaSpinner />
            </span>)}
            {children}
        </button>
    )
}

export default Button