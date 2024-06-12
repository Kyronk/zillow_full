import clsx from 'clsx'
import React from 'react'
import { twMerge } from "tailwind-merge";

const InputForm = ({ 
    style = "form-input",
    containerClassname, 
    label, 
    id, 
    type="text",
    register,
    errors,
    inputClassname,
    validate,
    placeholder,
    require,
}) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full my-2", containerClassname ))}>
            {label && (
                <label className='font-medium text-main-700' htmlFor={id}>
                    {label}
                    {require && (
                        <sup>
                            (<span className='text-red-500'>*</span>)
                        </sup>
                    )}
                </label> )}

            <input 
                placeholder={placeholder}
                type={type} 
                id={id} 
                // className={clsx(style, inputClassname)}
                className={twMerge(clsx(style, "placeholder:text-sm", inputClassname))}
                {...register(id, validate)}
                
                />
            
            {errors[id] && <small className="text-red-600">{errors[id]?.message}</small> }
        </div>
    )
}

export default InputForm