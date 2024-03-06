import React from 'react'
import { Link, NavLink } from "react-router-dom";
import Button from '../commons/Button';
import { navigations } from '../../utils/constants';
import { twMerge } from "tailwind-merge";
import clsx from 'clsx';
import withRouter from '../../hocs/withRouter';
import { Login } from '../index';

// redux
import { useUserStore } from "../../store/useUserStore";
import { useAppStore } from '../../store/useAppStore';


const Navigation = ({ location }) => {

    const { current } = useUserStore();
    const { setModal } = useAppStore();
    // console.log("check ", setModal);
    // console.log(current)

    return (
        <div className={twMerge(clsx('fixed w-full z-10 top-[85px]', location.pathname !== "/" && "bg-white"))}>
            <div 
                className={
                    twMerge(
                        clsx(
                            "bg-transparent flex items-start justify-between w-main mx-auto z-10 py-[26px]",
                location.pathname !== "/" && "bg-white"
            ))}>
                <Link to="/">
                    <img src="img/logo.png" alt="logo" className="w-[200px] object-contain" />
                </Link>

                <div className={clsx('flex text-lg items-center gap-6',
                    location.pathname === "/" ? " text-main-100" : "text-gray-700 "
                )}>
                    {navigations.map((elm) => (
                        <NavLink className={({ isActive }) => clsx(isActive && "font-medium", location.pathname === "/" ? "text-white" : "text-gray-900")}

                            key={elm.id} to={elm.path}
                        >
                            {elm.text}
                        </NavLink>
                    ))}

                    {!current ?
                        <Button
                            className={twMerge(clsx(location.pathname === "/" && "bg-transparent border-main-100 border"))}
                            onClick={() => setModal(true, <Login />)}
                        >
                            Sign in
                        </Button> : <Button className={twMerge(clsx(location.pathname === "/" && "bg-transparent border-main-100 border"))}>
                            Add Listing
                        </Button>}

                </div>
            </div>
        </div>
    )
}

export default withRouter(Navigation);