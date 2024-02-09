const asyncHandler = require("express-async-handler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
// export.register

// property : tài sản :
// thường 1 đối tượng ta sẽ sử dung là product
// đối với người là student, people, ....
// đói với 1 thứ giá trị hay quá lớn, hay với 1 trang web tông hợp quá nhiều thứ thì ta nên sử dụng từ 
// property

// create 1 căn nhà, 1 tài sản cần bán
const createNewProperty = asyncHandler( async(req, res) => {

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
    createNewProperty,
}