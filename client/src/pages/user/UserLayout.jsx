import React from 'react'

import Swal from 'sweetalert2';

import { Login } from "../../components"

import { useUserStore } from '../../store/useUserStore';
import { useAppStore } from '../../store/useAppStore';
import { useNavigate } from 'react-router-dom';

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
        <>{current?.userRoles?.some((el) => el.roleCode === "ROL7") && <div> user layout</div>}</>
        // <div>UserLayout</div>
    )
}

export default UserLayout