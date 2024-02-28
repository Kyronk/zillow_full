import React, { Fragment, useEffect, useRef, useState } from 'react'
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
import { showOption } from '../../utils/constants';
import { Link } from 'react-router-dom';
const Topheader = ({location}) => {

    const { current, logout } = useUserStore();
    // console.log(current)
    const optionBox = useRef();
    const [isShowOption, setIsShowOption] = useState(false);
    // console.log(location.pathname)
    useEffect(() => {
        const handleOnClick = (e) => {
            // console.log(optionBox.current.contains(e.target));

            if(optionBox.current && optionBox.current.contains(e.target)) {

                setIsShowOption(true);
            } else setIsShowOption(false);
        }

        document.addEventListener("click", handleOnClick);
        return () => {
            document.removeEventListener("click", handleOnClick);
        };
    }, [])

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

                {current && 
                <div 
                    ref={optionBox}
                    // onClick={() => setIsShowOption(!isShowOption)}
                    onClick={() => setIsShowOption(true)}
                    className='flex items-center relative gap-4 cursor-pointer hover:bg-overlay-30 p-2 rounded-md pl-8 border-l border-main-400'>
                    <div className='flex flex-col gap-2'>
                        <span>{current?.name}</span>
                        <span>ID: # <span>{current?.id.slice(0, 6)}</span></span>
                    </div>
                    <img 
                        // onClick={() => setIsShowOption(!isShowOption)}  
                        src={current?.image || './user.svg'} alt="avatar" 
                        className='w-10 h-10 object-cover ' />

                    {isShowOption && 
                    <div 
                        // ref={optionBox} 
                        className="absolute right-0 rounded-md top-full bg-white text-black drop-shadow-sm flex flex-col py-2 border">
                        {showOption.map((el) => (
                            <Fragment key={el.id}>
                                {current?.userRoles?.some(
                                    (role) => role.roleCode === el.code
                                ) && <Link className="px-6 py-2 hover:bg-gray-100" to={el.path}>{el.name}</Link>}
                            </Fragment>
                        ))}
                        <span onClick={() => logout()} className="px-6 py-2 hover:bg-gray-100 cursor-pointer">Logout</span>
                    </div>}
                </div>}
            </div>
        </div>
    )
}

export default withRouter(Topheader);