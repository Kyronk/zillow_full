import { useEffect, useState } from 'react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom"
import path from './utils/path'
// import PublicLayout from './pages/public/PublicLayout'
// import Home from "./pages/public/Home"
import { AboutUs, Home, OurAgents, Properties, PublicLayout, Search } from './pages/public'
import { Modal } from './components';

// redux zustand
import { useAppStore } from "./store/useAppStore";
import { useUserStore } from './store/useUserStore';
import { usePropertiesStore } from "./store/useProperties";
import { AdminLayout, Create, Dashboard, ManagerPropertyType } from './pages/admin/';
import { Personal, UserLayout } from './pages/user';
// import { getRoles } from '../../server/controllers/user';



function App() {
    // const [count, setCount] = useState(0)

    const { isShowModal, contentModal } = useAppStore();
    // console.log("check", isShowModal, contentModal)
    const {getCurrent, current, token, getRoles} = useUserStore();
    const { getPropertyTypes } = usePropertiesStore();

    // const getToken = window.localStorage.getItem("rest06");
    // console.log(getToken)
    // console.log(current)
    useEffect(() => {
        getCurrent();
        getRoles();
        getPropertyTypes({fields: "id,name,image"});
    }, [token])
    return (

        <div className="">
            {isShowModal && <Modal />}


            <Routes>
                <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.ABOUT_US} element={<AboutUs />} />
                    <Route path={path.OUT_AGENTS} element={<OurAgents />} />
                    <Route path={path.PROPERTIES} element={<Properties />} />
                    <Route path={path.SEARCH} element={<Search />} />


                </Route>


                {/* Admin routes */}
                <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
                    <Route path={path.ADMIN_DASHBOARD} element={<Dashboard />} />
                    <Route path={path.CREATE_PROPERTY_TYPE} element={<Create />}/>
                    <Route path={path.MANAGER_PROPERTY_TYPE} element={<ManagerPropertyType />}/>

                </Route>


                {/* User router */}
                <Route  path={path.USER_LAYOUT} element={<UserLayout />}>
                    <Route path={path.PERSONAL} element={<Personal />}/>


                </Route>

            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>

    )
}

export default App
