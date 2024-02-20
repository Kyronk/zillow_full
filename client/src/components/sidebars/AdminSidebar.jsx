import React, { Fragment, useState } from 'react'
import { adminSidebar } from '../../utils/constants'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'

import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";


const AdminSidebar = () => {
    const [activeTabs, setActiveTabs] = useState([]);

    const handleActiveTabs = (tabId) => {
        if (activeTabs.some(el => el === tabId)) {
            setActiveTabs((prev) => prev.filter((el) => el !== tabId) )
        }else {
            setActiveTabs((prev) => [...prev,tabId])
        }
    }
    return (
        <div className='h-screen w-full'>
            <div className="w-full flex flex-col items-center justify-center">
                <img src="/img/logo.png" alt="logo" className="w-5/5 object-contain" />
                <small className="text-red-100 italic">Admin workspace</small>
            </div>

            <div className="mt-6">
                {
                    adminSidebar.map(el => 
                    <Fragment key={el.id}>
                        {el.type === "SINGLE" && (
                            <NavLink
                                className={({isActive}) => 
                                    clsx(
                                        "flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3",
                                        isActive && "bg-main-700 border-r-4"
                                    )
                                }
                                to={el.path}
                            >
                                <span className='text-2xl'>{el.icon}</span>
                                <span className='select-none'>{el.name}</span>
                            </NavLink>
                        )}

                        {el.type === "PARENT" && (
                            <>
                                <div 
                                    onClick={() => handleActiveTabs(el.id)}
                                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-700">
                                    <span className="flex items-center gap-2">
                                        <span className='text-2xl'>{el.icon}</span>
                                        <span className='select-none'>{el.name}</span>
                                    </span>
                                    {activeTabs.some((tabId) => tabId === el.id) ? (
                                        <FaCaretDown size={20} />
                                    ) : (
                                        <FaCaretRight size={20} />
                                    )}
                                </div>

                            {activeTabs.some(tabId => tabId === el.id) &&
                                <div className=''>
                                    {el.subs.map((sub) => (<NavLink
                                    key={sub.id}
                                    className={({isActive}) => 
                                        clsx(
                                            "flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3",
                                            isActive && "bg-main-700 border-r-4"
                                        )} 
                                    to={sub.path}
                                >
                                     {/* <span className='text-2xl'>{sub}</span> */}
                                    <span className='select-none'>{sub.name}</span>
                                    </NavLink> ))}
                                </div>

                            }
                            </>)
                        }

                        
                    </Fragment>
                    )
                }
            </div>
        </div>
    )
}

export default AdminSidebar