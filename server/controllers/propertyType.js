const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

// const bcrypt = require("bcrypt");

const createNewPropertyType = asyncHandler( async (req, res) => {
    // const { uid } = req.user;
    const {name} = req.body;

    const response = await db.PropertyType.findOrCreate({
            where: {name},
            defaults: req.body
    });
    
    // const response = await db.PropertyFeature.findAll();
    // console.log(response);
    return res.json({
        // success: Boolean(response),
        // mes: response ? "Got" : "Cannot get user. ",
        // currentUser: response
        success: response[1],
        message: response[1] ? "Created" : "Name property type duplicated",
        propertyType: response[0],
        response
    }) 
});

const getPropertyTypes = asyncHandler( async (req, res) => {
    const { limit, page, fields, type, ...query } = req.query;
    if (type === "ALL") {
        const response = await db.PropertyType.findAll();
        return res.json({
            success: response.length > 0? "true": "false",
            mes: response.length > 0 ? "Got." : "Cannot get property Types",
            property_Type: response
        })
    } else {
        return res.json({"abc": "abc"})
    }
})

module.exports = {
    createNewPropertyType,
    getPropertyTypes,
}