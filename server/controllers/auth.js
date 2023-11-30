
const asyncHandler = require("express-async-handler");

// export.register
const register = asyncHandler( async (req, res) => {
    // password, phone, name, role= [USER, AGENT]
    // client = urlencoded || formData => req.body
    
    // client = params (?q=dadlandlenddd) => req.query

    // client = api/user/:id => req.params

    
    const { password, name, phone, role } = req.body;

    // console.log(">> check data:", {password, name, phone, role} )
    // console.log(req.query);
    // console.log(req.body)

    return res.json({
        success: true,
        mes: "api ok",
        data: {
            password,
            name,
            phone,
            role
        }
    })
})


module.exports = {
    register,
}