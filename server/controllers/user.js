const asyncHandler = require("express-async-handler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
// export.register


const getCurrent = asyncHandler( async(req, res) => {

    const { uid } = req.user;
    const response = await db.User.findByPk(uid, {
        attributes: {
            exclude: ["password"]
        }
    });
    // console.log(response);
    return res.json({
        success: Boolean(response),
        mes: response ? "Got" : "Cannot get user. ",
        currentUser: response

    })

});

module.exports = {
    getCurrent,
}