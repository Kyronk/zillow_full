const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const { roles } = require("../utils/constants");
// export.register

/**
 *  add dữ liệu ban đàu
 *  các dữ liệu này sẽ không có api (hoặc có)
 *  thường sẽ khá là ít dùng
 * 
 */

// create role của user
const initRoles = asyncHandler( async(req, res) => {
    const response = await db.Role.bulkCreate(roles);
    // console.log(response);
    return res.json({
        success: Boolean(response),
        mes: response ? "Inserted." : "Some thing went wrong. ",
        // currentUser: response
    }) 
});

// const initPropertyType = asyncHandler( async (req, res) => {


// });

module.exports = {
    initRoles,
}