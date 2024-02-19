import React from 'react'
import { twMerge } from "tailwind-merge";
import clsx from 'clsx'


const Textarea = ({
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
        <div className={twMerge(clsx("flex flex-col gap-2 w-full my-2", containerClassname ))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
            <textarea 
                placeholder={placeholder}
                type={type} 
                id={id} 
                className={clsx(style, inputClassname)}
                {...register(id, validate)}
                rows={5}
                
                ></textarea>
            
            {errors[id] && <small className="text-red-600">{errors[id]?.message}</small> }
        </div>
    )
}

export default Textarea