import React from 'react'

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { FaSpinner } from "react-icons/fa6";

const Button = ({ children, className, onClick, type = 'button', disable }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={twMerge(
                clsx(
                    "py-3 px-4 text-white bg-main-700 rounded-md flex justify-center items-center gap-3", 
                    className, 
                    disable && 'opacity-50'
                    )
            )}
            disabled={disable}

        >
            {disable && (<span className='animate-spin'>
                <FaSpinner />
            </span>)}
            {children}
        </button>
    )
}

export default Button