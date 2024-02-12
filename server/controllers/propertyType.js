const asyncHandler = require("express-async-handler");
const db = require("../models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
// export.register


const createNewPropertyType = asyncHandler( async(req, res) => {
    // const { uid } = req.user;
    const {name} = req.body;

    const response = await db.findOrCreate(
        {
            where: {name}
        }, {
            defaults: req.body
        });
    console.log(response);
    return res.json({
        // success: Boolean(response),
        // mes: response ? "Got" : "Cannot get user. ",
        // currentUser: response
        success: response[1],
        message: response[1] ? "Created" : "Name property type duplicated",
        propertyType: response[0]
    }) 

});

module.exports = {
    createNewPropertyType,
}