import React from 'react'
import { twMerge } from "tailwind-merge";
import clsx from 'clsx';
import { FaCloudUploadAlt } from "react-icons/fa";

const InputFile = ({
    // style = "form-input",
    containerClassname, 
    label, 
    id, 
    // type="text",
    register,
    errors,
    inputClassname,
    validate,
    placeholder
}) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full my-2", containerClassname ))}>
        {label && <span className='font-medium text-main-700' htmlFor={id}>{label}</span>}
        <input 
            // placeholder={placeholder}
            type="file"
            id={id} 
            // className={clsx(style, inputClassname)}
            {...register(id, validate)}
            className='hidden'
            
            />
        <label 
            className='bg-gray-100 w-full p-16 flex items-center justify-center'
            htmlFor={id}
        >
            <div className='flex flex-col justify-center items-center' >
                <span className='text-5xl text-gray-300'><FaCloudUploadAlt /></span>
                <span> Choose image ... only support image with extension JPEG, PNG, JPG</span> 
            </div>
        </label>
        
        {errors[id] && <small className="text-red-600">{errors[id]?.message}</small> }
    </div>
    )
}

export default InputFile