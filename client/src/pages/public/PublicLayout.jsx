import React from 'react'
// import Topheader from '../../components/banners/Topheader';
import {Outlet} from "react-router-dom";
import {Navigation, Topheader} from "../../components/index";

import clsx from 'clsx';
import withRouter from '../../hocs/withRouter';
import { useAppStore } from '../../store/useAppStore';


const PublicLayout = ({location}) => {
    // const {isShowModal} = useAppStore();
    
    return (
        <main
            // className={clsx(isShowModal ? "overflow-hidden max-h-screen" : "overflow-auto max-h-full")}
            //  cách này có nhược điểm là mỗi lần bắm vô login thì nó sẽ auto về top 0
        >
            <Topheader />
            
            <Navigation />
            <div className={clsx(location.pathname === "/" ? "pt-0": 'pt-[232px]')}>
                <Outlet />
            </div>
        </main>
    )
}

export default withRouter(PublicLayout);