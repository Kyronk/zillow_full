// beyond này là dùng để gọi api không thuộc server của mình 
// api bên thứ 3, api upload,...

import axios from "axios";

export const apiUploadImages = (data) => 
    axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUNDINARY_NAME}/image/upload`,
        data
    })

