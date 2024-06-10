import App from "../App";
import path from "./path";
import { AboutUs, Home, OurAgents, Properties, PublicLayout} from "../pages/public";
import { AdminLayout, Create, Dashboard, ManagerPropertyType } from "../pages/admin";

import {Personal, UserLayout} from "../pages/user";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            // public routes
            {
                path: path.PUBLIC_LAYOUT,
                element: <PublicLayout />,
                children: [
                    {
                        path: path.HOME,
                        element: <Home />
                    },
                    {
                        path: path.OUT_AGENTS,
                        element: <OurAgents />
                    },
                    {
                        path: path.PROPERTIES,
                        element: <Properties />
                    },
                    {
                        path: path.ABOUT_US,
                        element: <AboutUs />
                    },
                    // {
                    //     path: path.HOME,
                    //     element: <Home />
                    // },
                ]
            },

            // admin routes
            {
                path: path.ADMIN_LAYOUT,
                element: <AdminLayout />,
                children: [
                    {
                        path: path.ADMIN_DASHBOARD,
                        element: <Dashboard />
                    },
                    {
                        path: path.CREATE_PROPERTY_TYPE,
                        element: <Create />
                    },
                    {
                        path: path.MANAGER_PROPERTY_TYPE,
                        element: <ManagerPropertyType />
                    },
                ]
            },

            // user routes
            {
                path: path.USER_LAYOUT,
                element: <UserLayout />,
                children: [
                    {
                        path: path.PERSONAL,
                        element: <Personal />
                    },
                    // {
                    //     path: path.OUT_AGENTS,
                    //     element: <OurAgents />
                    // },
                    
                ]
            },
        ]
    }
]

export default routes;