import axios from "../axios";

export const apiGetPropertyList = (params) => 
    axios({
        url: "/properties/" ,
        method: "get",
        params
    });

///
