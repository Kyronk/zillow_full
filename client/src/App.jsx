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



function App() {
    // const [count, setCount] = useState(0)

    const { isShowModal, contentModal } = useAppStore()
    // console.log("check", isShowModal, contentModal)
    const {getCurrent, current, token} = useUserStore();

    // const getToken = window.localStorage.getItem("rest06");
    // console.log(getToken)
    console.log(current)
    useEffect(() => {
        getCurrent()
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
