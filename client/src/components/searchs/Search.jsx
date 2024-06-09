import React, { useState } from 'react'
import SearchItem from './SearchItem'
import {Button, InputForm, InputSelect} from "../";

import { FaChevronDown } from "react-icons/fa";

import { useForm } from "react-hook-form";
import SelectLib from '../inputs/SelectLib';
import { usePropertiesStore } from '../../store/useProperties';
import withRouter from '../../hocs/withRouter';
import path from '../../utils/path';
import { createSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAppStore } from '../../store/useAppStore';

const Search = ({ navigate, direction="horizontal" }) => {

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        // watch,
    } = useForm();
    const { setModal } =  useAppStore()
    const { propertyTypes } = usePropertiesStore();
    // const propertyType = watch("propertyType");
    // const onChangeCustom = (id, value) =>  setValue(id, value);
    const [isShowPopupPrice, setIsShowPopupPrice] = useState(false);
    // const propertyType = watch("propertyType");
    

    const handleSearchParams = data => {
        // console.log(data)
        const { start, end, address, propertyType} = data;
        const params = new Object();
        if (address) params.address = address;
        if (propertyType) params.propertyTypeId = propertyType.id;
        // if (start && !end)  params.price = [ +start, Math.pow(10, 9)];
        // if (!start && end) params.price = [0, +end];
        if (start && !end)  params.price = [ "gte" ,+start]; // greater than equal
        if (!start && end) params.price = [ "lte", +end]; // less than equal

        if (start && end) params.price= [+start, +end];
        if (direction === "vertical") setModal(false, null);
        
        // console.log(params);
        navigate({
            pathname: `/${path.PROPERTIES}`,
            search: createSearchParams(params).toString()
        })
    }
    return (
        //  1 rem = 16px
        <form 
            className={twMerge(clsx('bg-white py-8 rounded-md shadow-lg mx-auto mt-[-4em] relative z-20'),
                    direction === "vertical" ? "flex flex-col gap-4 h-fit w-[500px] px-8" : "",
                    direction === "horizontal" ? "grid grid-cols-4 h-[8em] w-[1096px]": ""
                )}
            onClick={e => e.stopPropagation()}
        >
            <SearchItem className={direction === "vertical" ? "items-start justify-start border-none" : ""} title="Location">
                <InputForm
                    id="address"
                    register={register}
                    errors={errors}
                    placeholder="Type your required locations"
                    containerClassname={direction === "vertical"? "w-full" : "w-[14em]"}
                    inputClassname="rounded-md border border-gray-300"
                />
            </SearchItem>

            <SearchItem className={direction === "vertical" ? "items-start justify-start border-none" : ""} title="Property Type">
                <SelectLib 
                    id="propertyType"
                    register={register}
                    errors={errors}
                    containerClassname={direction === "vertical"? "w-full" : "w-[14em]"}
                    inputClassname="rounded-md border border-gray-300"
                    placeholder="Select property type"
                    options={propertyTypes?.map((el) => ({...el, label: el.name}))}
                    onChange={(val) => setValue("propertyType", val)} //error
                />
            </SearchItem>

            <SearchItem className={direction === "vertical" ? "items-start justify-start border-none" : ""}  title="Rent range">
                {/* <SelectLib 
                    id="price"
                    register={register}
                    errors={errors}
                    containerClassname="w-[14em]"
                    inputClassname="rounded-md border border-gray-300"
                    placeholder="Select rent range"
                /> */}
                {isShowPopupPrice &&  <div className='absolute border top-full right-0 left-0 bg-white drop-shadow p-4 gap-6 rounded-md '>
                    <div className='flex flex-col gap-2'>
                        <span className='font-bold'>Type your price</span> 
                        <div className='grid grid-cols-2 gap-3'>
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
                        {/* <div className='flex flex-col gap-2'>
                            <span className='font-bold'>Choose your price</span>
                            <input className='w-full' type="range" name="" id="priceRange" {...register('priceRange')} />
                        </div> */}
                    </div>
                </div>}
                
                <Button
                    onClick={() => setIsShowPopupPrice((prev) => !prev)} 
                    className={
                        twMerge(
                            clsx("bg-white text-black border border-gray-300 w-full", 
                            direction === "vertical" 
                                ?"max-w-full hidden"
                                : "max-w-[14em]"))}>
                    <span>select range price</span>
                    <FaChevronDown />
                </Button>
                {
                    direction === "vertical" && (
                        <div className='grid grid-cols-2 w-full gap-3'>
                            <InputForm 
                                inputClassname="border-gray-300 rounded-md"
                                id="start"
                                register={register}
                                errors={errors}
                                placeholder="Type price start"
                            />
                            <InputForm 
                                inputClassname="border-gray-300 rounded-md"
                                id="end"
                                register={register}
                                errors={errors}
                                placeholder="Type price end"
                            />
                        </div>
                    )
                }
            </SearchItem>
            {/* <SearchItem /> */}
            <div className='flex items-center justify-center'>
                <Button 
                    // onClick={handleSubmit((data) => console.log(data))} 
                    onClick={handleSubmit(handleSearchParams)} 
                    className="px-8">
                    Search
                </Button>
            </div>
            
        </form>
    )
}

export default withRouter(Search);