import React from 'react'
import { formatMoney } from '../../utils/fn'
import { BsCurrencyDollar } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";

const PropertyCard = ({properties}) => {
    // console.log(properties.bedRoom)
    return (
        <div className='border rounded-md'>
            <img 
                src={properties?.featuredImage} 
                alt=""
                className="w-full h-[240px] rounded-t-md object-cover"
                />
            <div className='p-4 flex flex-col gap-2'>
                <h1 className='text-2xl font-semibold line-clamp-2 uppercase text-gray-700'>{properties?.name}</h1>
                <span className='text-xl flex items-center gap-1 font-bold text-main-500'> 
                <BsCurrencyDollar size={22} />
                {`${formatMoney(properties?.price)}`}</span>
                {/* <span>{properties?.price}</span> */}

                <div className='flex items-center gap-4 text-sm'>
                    <span className='flex gap-2 items-center text-gray-500'>
                        <FaBed size={20} />
                        <span className='font-medium text-base'>{properties?.bedRoom}</span>
                    </span>

                    <span className='flex gap-2 items-center text-gray-500'>
                        <FaBath size={20} />
                        <span className='font-medium text-base'>{properties?.bathRoom}</span>
                    </span>

                    <span className='flex gap-2 items-center text-gray-500'>
                        <MdLocationCity size={20} />
                        <span className='font-medium text-base'>{properties?.propertySize}</span>
                    </span>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <img 
                            src={properties?.rPostedBy?.avatar} 
                            alt=""
                            className='w-10 h-10 object-cover rounded-full'
                            />
                        <span className='text-gray-500'>{properties?.rPostedBy?.name}</span>
                    </div>
                    <span className='px-4 py-1 text-xs flex items-center justify-center bg-green-600 text-white'>
                        Agent
                    </span>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <img 
                            src={properties?.rOwner?.avatar} 
                            alt=""
                            className='w-10 h-10 object-cover rounded-full'
                            />
                        <span className='text-gray-500'>{properties?.rOwner?.name}</span>
                    </div>
                    <span className='px-4 py-1 text-xs flex items-center justify-center bg-purple-600 text-white'>
                        Owner
                    </span>
                </div>
            </div>

        
        </div>
    )
}

export default PropertyCard