import React from 'react'
// import Topheader from '../../components/banners/Topheader';
import {Outlet} from "react-router-dom";
import {Navigation, Topheader} from "../../components/index";

import clsx from 'clsx';
import withRouter from '../../hocs/withRouter';


const PublicLayout = ({location}) => {
    return (
        <main>
            <Topheader />
            <Navigation />
            <div className={clsx(location.pathname === "/" ? "pt-0": 'pt-[232px]')}>
                <Outlet />
            </div>
        </main>
    )
}

export default withRouter(PublicLayout);