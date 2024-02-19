import axios from "../axios";

export const apiGetCurrent = () => axios({
    url: "/user/current",
    method: "get",
    // dataz
})

export const apiGetRoles = () => axios({
    url: "/user/roles",
    method: "get"
})
