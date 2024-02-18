import React from 'react'
import { Link, NavLink } from "react-router-dom";
import Button from '../commons/Button';
import { navigations } from '../../utils/constants';
import { twMerge } from "tailwind-merge";
import clsx from 'clsx';
import withRouter from '../../hocs/withRouter';
import {Login} from '../index';

// redux
import {useUserStore} from "../../store/useUserStore";
import { useAppStore } from '../../store/useAppStore';


const Navigation = ({location}) => {

    const {current} = useUserStore();
    const { setModal} = useAppStore();
    // console.log("check ", setModal);

    return (
        <div className={twMerge(clsx("h-[85px] w-full bg-transparent flex items-center justify-between fixed z-50 top-[85px] px-[100px] py-[26px]",
            location.pathname !== "/" && "bg-white"
        ))}> 
            <Link to="/">
                <img src="img/logo.png" alt="logo" className="w-[200px] object-contain" />
            </Link>

            <div className={clsx('flex text-lg items-center gap-6',
                location.pathname === "/" ? " text-main-100" : "text-gray-700 "
            )}>
                {navigations.map((elm) => (
                    <NavLink className={({isActive}) => clsx(isActive && "font-medium", location.pathname === "/" ? "text-white": "text-gray-900" )} 

                        key={elm.id} to={elm.path}
                        >
                        {elm.text}
                    </NavLink>
                ))}

                { !current ? 
                <Button 
                    className={twMerge(clsx(location.pathname === "/" && "bg-transparent border-main-100 border"))}
                    onClick={() => setModal(true, <Login /> )}
                    >
                Sign in
                </Button> : <Button className={twMerge(clsx(location.pathname === "/" && "bg-transparent border-main-100 border"))}>
                    Add Listing
                </Button>}

            </div>
        </div>
    )
}

export default withRouter(Navigation);