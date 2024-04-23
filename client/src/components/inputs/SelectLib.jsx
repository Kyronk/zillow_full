import React from 'react'
import Select from "react-select"
import clsx from 'clsx'
import { twMerge } from "tailwind-merge";


const SelectLib = ({ 
    style = "form-select",
    containerClassname, 
    label,    
    id, 
    type="text",
    register,
    errors,
    inputClassname,
    validate,
    placeholder,
    options=[],
    onChange,
}) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full my-2", containerClassname ))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}

            <Select 
                {...register(id, validate)}
                placeholder={placeholder}
                isClearable
                options={options}
                isSearchable
                onChange={(val) => onChange(val)}
                formatOptionLabel={(option) => <div className='flex px-6 items-center gap-2'>
                    <img src={option.image} alt="" className='w-5 h-5 object-cover'/>
                    <span>{option.name}</span>
                </div>}
                className={
                    {
                        control: () => clsx(''),
                        input: () => "",
                        option: () => ""
                    }
                }
            />
            {/* <select 
                placeholder={placeholder}
                type={type} 
                id={id} 
                // className={clsx(style, inputClassname)}
                className={twMerge(clsx(style, "placeholder:text-sm", inputClassname))}
                {...register(id, validate)}
                
                >
                    <option value="">{placeholder}</option>
                    {
                        options.map((el, idx) => (
                            <option key={idx} value={el.value} >{el.label}</option>
                        ))
                    }
                </select> */}
            
            {errors[id] && <small className="text-red-600">{errors[id]?.message}</small> }
        </div>
    )
}

export default SelectLib