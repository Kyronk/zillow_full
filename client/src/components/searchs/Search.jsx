import React from 'react'
import SearchItem from './SearchItem'
import {Button, InputForm, InputSelect} from "../";

import { FaChevronDown } from "react-icons/fa";

import { useForm } from "react-hook-form";
import SelectLib from '../inputs/SelectLib';
import { usePropertiesStore } from '../../store/useProperties';

const Search = () => {

    const {
        register,
        formState: {errors},
        handleSubmit,
        watch,
        setValue,
    } = useForm();
    const { propertyTypes } = usePropertiesStore();
    const propertyType = watch("propertyType");
    // const onChangeCustom = (id, value) =>  setValue(id, value);

    return (
        //  1 rem = 16px
        <form className='bg-white py-8 grid grid-cols-4 rounded-md shadow-lg w-[1096px] mx-auto h-[8em] mt-[-4em] relative z-20'>
            <SearchItem title="Location">
                <InputForm
                    id="address"
                    register={register}
                    errors={errors}
                    placeholder="Type your required locations"
                    containerClassname="w-[14em]"
                    inputClassname="rounded-md border border-gray-300"
                />
            </SearchItem>

            <SearchItem title="Property Type">
                <SelectLib 
                    id="propertyType"
                    register={register}
                    errors={errors}
                    containerClassname="w-[14em]"
                    inputClassname="rounded-md border border-gray-300"
                    placeholder="Select property"
                    options={propertyTypes?.map((el) => ({...el, label: el.name}))}
                    onChange={(val) => setValue("propertyType", val)}
                />
            </SearchItem>

            <SearchItem title="Rent range">
                {/* <SelectLib 
                    id="price"
                    register={register}
                    errors={errors}
                    containerClassname="w-[14em]"
                    inputClassname="rounded-md border border-gray-300"
                    placeholder="Select rent range"
                /> */}
                <div className='absolute bg-white drop-shadow p-4 gap-6 rounded-md border top-full right-0 left-0'>
                    <div className='flex flex-col gap-2'>
                        <span>Type your price</span> 
                        <div className='flex flex-col gap-2'>
                            <InputForm 
                                id="start"
                                register={register}
                                errors={errors}
                            />
                            <InputForm 
                                id="end"
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <div>
                            <input className='w-full' type="range" name="" id="" />
                        </div>
                    </div>
                </div>
                
                <Button className="bg-white text-black border border-gray-300 w-full max-w-[196px]">
                    <span>select range price</span>
                    <FaChevronDown />
                </Button>
            </SearchItem>
            {/* <SearchItem /> */}
            <div className='flex items-center justify-center'>
                <Button onClick={handleSubmit((data) => console.log(data))} className="px-8">
                    Search
                </Button>
            </div>
            
        </form>
    )
}

export default Search