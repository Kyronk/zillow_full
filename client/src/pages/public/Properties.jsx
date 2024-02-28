import React, { useEffect, useState } from 'react'
import { BreadCrumb, PropertyCard } from '../../components'
import { apiGetPropertyList } from '../../apis/properties';

const Properties = () => {

    const [propertyList, setPropertyList] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const response =  await apiGetPropertyList({
                // limit: import.meta.env.VITE_LIMITS,

                limit: 9
            });
            console.log(response);
            if (response.success) setPropertyList(response.property);
        }
        fetchProperties();
    }, []);

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
                <div>
                    sort by
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
            </div>

        </div>
    )
}

export default Properties