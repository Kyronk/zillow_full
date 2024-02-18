import path from "./path";

// import { FaCaretRight } from "react-icons/fa";
// import { FaCaretDown } from "react-icons/fa";

import { LuLayoutDashboard } from "react-icons/lu";
import { BsFillHouseAddFill } from "react-icons/bs";

import { BsFillHouseGearFill } from "react-icons/bs";

export const navigations = [
    {
        id: 1,
        path: "",
        text: "HOME"
    },
    {
        id: 2,
        path: `/${path.ABOUT_US}`,
        text: "ABOUT US"
    },
    {
        id: 3,
        path: `/${path.OUT_AGENTS}`,
        text: "OUT AGENTS"
    },
    {
        id: 4,
        path: `/${path.PROPERTIES}`,
        text: "PROPERTIES"
    },
    {
        id: 5,
        path: `/${path.SEARCH}`,
        text: "SEARCH"
    },
];


export const adminSidebar = [
    {
        id: 12,
        name: "Dashboard",
        path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
        icon: <LuLayoutDashboard />,
        type: "SINGLE"
    },
    {
        id: 113,
        name: "Property Types",
        icon: <BsFillHouseGearFill />,
        type: "PARENT",
        subs: [
            {
                id: 121,
                path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
                name: "Create new"
            },
            {
                id: 122,
                path: `/${path.ADMIN_LAYOUT}/${path.MANAGER_PROPERTY_TYPE}`,
                name: "Manager"
            }
        ]
    }
]