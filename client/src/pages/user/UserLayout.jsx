import React from 'react'

import Swal from 'sweetalert2';

import { Login, UserSidebar } from "../../components"

import { useUserStore } from '../../store/useUserStore';
import { useAppStore } from '../../store/useAppStore';
import { Outlet, useNavigate } from 'react-router-dom';

const UserLayout = () => {
    const { current } = useUserStore();
    const { setModal, isShowModal } = useAppStore();
    const navigate = useNavigate();
    if(!current || !current.userRoles.some(el => el.roleCode === "ROL7")){
        Swal.fire({
            icon: "info",
            title: "Oops!",
            text: "Login required.",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Go Homepage",
            confirmButtonText: "Go Login",
        }).then((response) => {
            console.log(response);
            if (response.isConfirmed) setModal(true, <Login />)
            if (response.isDismissed) navigate("/");

        })
    }

    return (
        <>{current?.userRoles?.some((el) => el.roleCode === "ROL7") && (
            <div className='w-full grid grid-cols-12 min-h-screen max-h-screen overflow-y-auto'> 
                <div className='bg-gray-200 col-span-2'>
                    <UserSidebar  /> 
                </div>
                <div className='bg-blue-500 col-span-10'>
                    <Outlet />
                </div>
            </div>
        )}
    </>
    )
}

export default UserLayout