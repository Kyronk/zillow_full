import React, { useEffect, useState } from 'react'
import { BreadCrumb, Button, InputSelect, PropertyCard } from '../../components'
import { apiGetPropertyList } from '../../apis/properties';
import { useForm } from 'react-hook-form';
import { twMerge } from "tailwind-merge";
import clsx from 'clsx';
import { Pagination } from '../../components/paginations';
import { useSearchParams } from 'react-router-dom';
import {toast} from "react-toastify";

const Properties = () => {

    const [propertyList, setPropertyList] = useState([]);
    const [mode, setMode] = useState("ALL");
    const [searchParams] = useSearchParams();
    const { register, formState: {errors}, watch} = useForm();
    const sort = watch("sort");

    useEffect(() => {
        const fetchProperties = async (params) => {
            const response =  await apiGetPropertyList({
                // limit: import.meta.env.VITE_LIMITS,

                limit: 9,
                ...params
            });
            // console.log(response);
            if (response.success) setPropertyList(response.property);
            else toast.error(response.mes);
        }
        const params = Object.fromEntries([...searchParams]);
        console.log(params)
        fetchProperties(params);
    }, [searchParams]);

    return (
        <div className='w-full'>
            <div className='relative w-full'>
                <img src="/img/property.png" alt=""  className='w-full object-contain'/>
                <div className='absolute  flex flex-col inset-0 text-white justify-center items-center'>
                    <h1 className='text-[48px] font-medium'>Properties</h1>
                    <div>
                        <BreadCrumb />
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="w-main mx-auto my-20">
                <div className='my-4 flex justify-between items-center text-sm'>
                    <div>
                        {/* <span>Sort :</span> */}
                        <InputSelect 
                            register={register}
                            id="sort"
                            errors={errors}
                            options={[
                                {label: 'Lastest', value: "-createdAt"},
                                {label: 'Oldest', value: "createdAt"},
                                {label: 'A - Z', value: "name"},
                                {label: 'Z - A', value: "-name"},
                            ]}
                            placeholder="Select"
                            containerClassname="flex-row items-center gap-2"
                            label="Sort :"
                            inputClassname="w-fit rounded-md"
                        />
                    </div>

                    <div className='flex items-center gap-4'>
                        <Button
                            onClick={() => setMode("ALL")} 
                            className={twMerge(clsx("whitespace-nowrap bg-transparent border-none text-gray-900 font-medium", mode ==="ALL" && 'font-bold'))}>
                            All Properties
                        </Button>
                        <Button 
                            onClick={() => setMode("RENT")}
                            className={twMerge(clsx("whitespace-nowrap bg-transparent border-none text-gray-900 font-medium", mode ==="RENT" && 'font-bold'))}>
                            For Rent
                        </Button>
                        <Button 
                            onClick={() => setMode("SALE")}
                            className={twMerge(clsx("whitespace-nowrap bg-transparent border-none text-gray-900 font-medium", mode ==="SALE" && 'font-bold'))}>
                            For Sale
                        </Button>
                    </div>
                </div>
                
                <div className='w-full grid grid-cols-3 gap-4'>
                    {propertyList?.rows?.map((el) => (
                        <PropertyCard key={el.id} properties={el} /> 
                    ))}
                    {/* <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard /> */}
                </div>

                {/* pagination */}
                <div className="flex justify-center items-center my-4">
                    <Pagination 
                        total={propertyList?.count}
                        limit={propertyList?.limit}
                        page={propertyList?.page}
                    />
                </div>
            </div>

        </div>
    )
}

export default Properties