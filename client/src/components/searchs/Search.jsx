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

const Search = ({ navigate }) => {

    const {
        register,
        formState: {errors},
        handleSubmit,
        // watch,
        setValue,
    } = useForm();
    const { propertyTypes } = usePropertiesStore();
    // const propertyType = watch("propertyType");
    // const onChangeCustom = (id, value) =>  setValue(id, value);
    const [isShowPopupPrice, setIsShowPopupPrice] = useState(false);

    const handleSearchParams = data => {
        // console.log(data)
        const { start, end, address, propertyType} = data;
        const params = new Object();
        if (address) params.address = address;
        if (propertyType) params.propertyTypeId = propertyType.id;
        if (start && !end)  params.price = [ +start, Math.pow(10, 9)];
        if (!start && end) params.price = [0, +end];
        if (start && end) params.price= [+start, +end];
        
        // console.log(params);
        navigate({
            pathname: `/${path.PROPERTIES}`,
            search: createSearchParams(params).toString()
        })
    }
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
                    className="bg-white text-black border border-gray-300 w-full max-w-[196px]">
                    <span>select range price</span>
                    <FaChevronDown />
                </Button>
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