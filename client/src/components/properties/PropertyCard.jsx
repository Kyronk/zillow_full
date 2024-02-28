import React from 'react'
import { formatMoney } from '../../utils/fn'
import { BsCurrencyDollar } from "react-icons/bs";

const PropertyCard = ({properties}) => {
    return (
        <div className='border rounded-md'>
            <img 
                src={properties?.featuredImage} 
                alt=""
                className="w-full h-[240px] rounded-t-md object-cover"
                />
            <div className='p-4 flex flex-col gap-2'>
                <h1 className='text-2xl uppercase text-gray-700'>{properties?.name}</h1>
                <span className='text-lg flex items-center gap-1 font-bold text-main-500'> 
                <BsCurrencyDollar size={22} />
                {`${formatMoney(properties?.price)}`}</span>
                {/* <span>{properties?.price}</span> */}
            </div>

        </div>
    )
}

export default PropertyCard