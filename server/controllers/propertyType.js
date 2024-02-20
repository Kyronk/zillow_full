const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

const { Op, Sequelize } = require("sequelize");
const { boolean } = require("joi");
const redis = require("../config/redis.config");

// const bcrypt = require("bcrypt");

const createNewPropertyType = asyncHandler(async (req, res) => {
    // const { uid } = req.user;
    const { name } = req.body;

    const response = await db.PropertyType.findOrCreate({
        where: { name },
        defaults: req.body
    });

    // const response = await db.PropertyFeature.findAll();
    // console.log(response);
    return res.json({
        // success: Boolean(response),
        // mes: response ? "Got" : "Cannot get user. ",
        // currentUser: response
        success: response[1],
        mes: response[1] ? "Created" : "Name property type duplicated",
        // propertyType: response[0],
        // response
    })
});

const getPropertyTypes = asyncHandler(async (req, res) => {
    const { limit, page, fields, name, sort, ...query } = req.query;
    // console.log(query)
    const options = {};
    // limit fields
    if (fields) {
        const attributes = fields.split(",");
        const isExclude = attributes.some((el) => el.startsWith("-"));
        if (isExclude) {
            options.attributes = {
                exclude: attributes.map((el) => el.replace("-", "")),
            }
        }
        else {
            options.attributes = attributes
        }
    }

    // Filter by client queries
    // if (name) query.name = { [Op.substring]: name } // %LIKE%

    // filter by client queries
    if (name) query.name = Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("name")),"LIKE",`%${name.toLocaleLowerCase()}%`)

    // sort
    // order = [[createdAt, ASC], [name, DESC]]
    // [createdAt, -name]
    // sort: createdAt, -name
    if ( sort ) {
        console.log(sort);
        const order = sort.split(",").map((el => el.startsWith("-")? [el.replace("-",""), "DESC"] : [el, "ASC"]));
        // console.log(order);
        // const isExclude = order.some((el) => el.startsWith("-"));
        // if (isExclude) {
            options.order = order;
        // }
        // else {
        //     options.attributes = order
        // }
    }

    if (!limit) {
        // if (fields) options.attributes = fields.split(",");
        // console.log(options)
        // const response = await db.PropertyType.findAll(options);

        // const response = await db.PropertyType.findAll(options);
        const alreadyGetAll = await redis.get("get-property-type");
        if(alreadyGetAll) {
            return res.json({
                success: true,
                mes: "Got",
                propertyTypes: JSON.parse(alreadyGetAll),
            })
        }

        const response = await db.PropertyType.findAll({
            where: query,
            ...options,
        })
        redis.set("get-property-type", JSON.stringify(response));

        return res.json({
            success: response.length > 0 ? "true" : "false",
            mes: response.length > 0 ? "Got." : "Cannot get property Types",
            property_Type: response
        })
    } 
    
    // offset là vị trí bắt đầu lấy
    // pagination
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const offset = ((prevPage - 1 ) * limit);
    if(offset) {
        options.offset = offset;
    } 
    options.limit = +limit;

    console.log(options);
    const response = await db.PropertyType.findAndCountAll({
        where: query,
        ...options
    });

    return res.json({
        success: response.length > 0 ? "true" : "false",
        mes: response.length > 0 ? "Got." : "Cannot get property Types",
        property_Type: response
    })
});



const updatePropertyType = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if(Object.keys(req.body).length === 0 ) return throwErrorWithStatus(403, "Need less 1 argument.", res, next);

    const response = await db.PropertyType.update(req.body, {
        where: {id}
    })
    // console.log(response);
    // const response = await db.PropertyFeature.findAll();
    // console.log(response);
    return res.json({

        success: Boolean(response[0]) > 0,
        message: response[0] ? "Updated" : "No data is updated",
        // propertyType: response[0],
        // response
    })
});

const removePropertyType = asyncHandler( async (req, res) => {
    const {id} = req.params;
    const response = await db.PropertyType.destroy({
        where: {id}
    });
    // console.log(response);

    return res.json({
        success: response > 0,
        mes: response > 0 ? "Deleted." : "No data is delete."
    })


})

module.exports = {
    createNewPropertyType,
    getPropertyTypes,
    updatePropertyType,
    removePropertyType,
}