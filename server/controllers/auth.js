
const asyncHandler = require("express-async-handler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
// export.register


const register = asyncHandler( async(req, res) => {
    // password, phone, name, role= [USER, AGENT]
    // client = urlencoded || formData => req.body
    
    // client = params (?q=dadlandlenddd) => req.query

    // client = api/user/:id => req.params
    
    const { password, name, phone, role } = req.body;
    // console.log(">> check data:", {password, name, phone, role} )
    // console.log(req.query);
    // console.log(req.body)

    // handle Logic
    const response = await db.User.findOrCreate({
        where: {phone: phone},
        defaults: {
            name: name,
            password: password,
            phone: phone,
            role: role
        }
    })
    // console.log(response);
    return res.json({
        success: response[1],
        mes: response[1] ? "Your account is created." : "PhoneNumber already had exists",

    })

    // return res.json({
    //     success: true,
    //     mes: "api ok",
    //     data: {
    //         password,
    //         name,
    //         phone,
    //         role
    //     }
    // })
});



const signIn = asyncHandler( async(req, res, next) => {
    
    try {
        const { password, phone } = req.body;
        const userLogin = await db.User.findOne({
            where: {phone: phone},
        });

        if(!userLogin) throwErrorWithStatus(401, "User with that phone have not registered.", res, next);
        const isMachingPassword = bcrypt.compareSync(password, userLogin.password);
        if(!isMachingPassword) throwErrorWithStatus(401, "Password is Wrong.", res, next);

        // console.log(response);

        const token = jwt.sign({uid: userLogin.id, role: userLogin.role}, process.env.JWT_SECRET, 
            {expiresIn: "7d"})
        return res.json({
            // success: response[1],
            // mes: response[1] ? "Your account is created." : "PhoneNumber already had exists",
            success: true,
            mes: "Sign in is successfully",
            accessToken: token ? `Bearer ${token}` : token
        })
    } catch (error) {
        console.log(error)
    }
});




module.exports = {
    register,
    signIn,

}