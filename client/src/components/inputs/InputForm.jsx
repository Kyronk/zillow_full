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
    placeholder
}) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full my-2" ))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
            <input 
                placeholder={placeholder}
                type={type} 
                id={id} 
                className={clsx(style, inputClassname)}
                {...register(id, validate)}
                
                />
            
            {errors[id] && <small className="text-red-600">{errors[id]?.message}</small> }
        </div>
    )
}

export default InputForm