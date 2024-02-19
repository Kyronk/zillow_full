
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
    
    const { password, name, phone } = req.body;
    // console.log(">> check data:", {password, name, phone, role} )
    // console.log(req.query);
    // console.log(req.body)

    // handle Logic
    // console.log(req.body.roleCode)

    const response = await db.User.findOrCreate({
        where: {phone: phone},
        defaults: {
            name: name,
            password: password,
            phone: phone,
        }
    })
    const userId = response[0]?.id;
    if(userId) {
        const roleCode = ['ROL7'];
        // console.log(req.body.roleCode)
        if(req.body?.roleCode) roleCode.push(req.body?.roleCode);
        
        const roleCodeBulk = roleCode.map((role) => ({ userId, roleCode: role}))
        // console.log(roleCodeBulk)
        const updateRole = await db.User_Role.bulkCreate(roleCodeBulk);

        // console.log(updateRole)
        // await db.User_Role.create({userId, roleCode: ["ROL7", req.body.roleCode]})
        if (!updateRole) await db.User.destroy({ where : { id: userId}});
    }
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

        if(!userLogin) return throwErrorWithStatus(401, "User with that phone have not registered.", res, next);
        const isMachingPassword = bcrypt.compareSync(password, userLogin.password);
        if(!isMachingPassword) return throwErrorWithStatus(401, "Password is Wrong.", res, next);

        // console.log(response);

        const token = jwt.sign({
            uid: userLogin.id, 
            roleCode: userLogin.roleCode
        }, process.env.JWT_SECRET, 
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