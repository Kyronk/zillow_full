import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { RiFacebookFill } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";
import { RxLinkedinLogo } from "react-icons/rx";

import withRouter from '../../hocs/withRouter';

import clsx from "clsx"
import {twMerge} from "tailwind-merge"
import { useAppStore } from '../../store/useAppStore';
import { useUserStore } from '../../store/useUserStore';
const Topheader = ({location}) => {

    const { current } = useUserStore();
    console.log(current)
    // console.log(location.pathname)

    return (
        <div className={twMerge(
            clsx("h-[85px] text-white border-b border-main-400 w-full bg-transparent fixed z-50 top-0 flex items-center justify-between px-[100px] py-[26px]",
            location.pathname !== "/" && "bg-main-700"
            ))}>
            <span className='flex items-center gap-2'>
                <span><MdOutlineEmail /></span>
                <span>
                    <span>Email us at: </span>
                    <span className='text-gray-300'> ginkyato@gmail.com</span>
                </span>
            </span> 
            
            <div className='flex items-center gap-6'>
                <div className='flex items-center text-xl text-gray-300 gap-4'>
                    <RiFacebookFill />
                    <FaInstagramSquare />
                    <RxLinkedinLogo />
                </div>

                <div className='flex items-center pl-8 border-l border-main-400'>
                    <span className='flex items-center gap-2'>
                        <FaPhone />
                        <span>123-456 7890</span>
                    </span>
                </div>

                <div className='flex items-center gap-4 pl-8 border-l border-main-400'>
                    <div className='flex flex-col gap-2'>
                        <span>{current?.name}</span>
                        {/* <span>ID: # <span>{current?.id}</span></span> */}
                    </div>
                    <img src={current?.image || './user.svg'} alt="avatar" className='w-8 h-8 object-cover rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Topheader);