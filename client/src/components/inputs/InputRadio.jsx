import clsx from 'clsx'
import React from 'react'
import { twMerge } from "tailwind-merge";


const InputRadio = ({ 
    style = "form-radio",
    containerClassname, 
    optionClassname,
    label, 
    id, 
    register,
    errors,
    inputClassname,
    validate,
    // placeholder,
    option=[]
}) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full", containerClassname ))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}

            <div className={twMerge(clsx(optionClassname))}>
                {option.map(el => (
                        <div className="flex items-center cursor-pointer gap-2" key={el.value}>
                            <input 
                                type='radio'
                                name={id}
                                id={el.value} 
                                value={el.value}
                                className={clsx(style, inputClassname)}
                                {...register(id, validate)}
                        />
                        {label && <label className='cursor-pointer' htmlFor={el.value}>{el.label}</label>}

                        </div>
                    ))
                }
            </div>
            
            {errors[id] && <small className="text-red-600">{errors[id]?.message}</small> }
        </div>
    )
}

export default InputRadio