const asyncHandler = require("express-async-handler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const redis = require("../config/redis.config");
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

const getPropertyList = asyncHandler(async (req, res) => {
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
    // if (name) query.name = Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("name")),"LIKE",`%${name.toLocaleLowerCase()}%`)

    // sort
    // order = [[createdAt, ASC], [name, DESC]]
    // [createdAt, -name]
    // sort: createdAt, -name
    if ( sort ) {
        console.log(sort);
        const order = sort.split(",").map((el => el.startsWith("-")? [el.replace("-",""), "DESC"] : [el, "ASC"]));
    
            options.order = order;
    }

    if (!limit) {
        const alreadyGetAll = await redis.get("get-properties");
        if(alreadyGetAll) {
            return res.json({
                success: true,
                mes: "Got",
                properties: JSON.parse(alreadyGetAll),
            })
        }

        const response = await db.Property.findAll({
            where: query,
            ...options,
        })
        redis.set("get-properties", JSON.stringify(response));

        return res.json({
            success: response.length > 0 ? "true" : "false",
            mes: response.length > 0 ? "Got." : "Cannot get property",
            properties: response
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
    const response = await db.Property.findAndCountAll({
        where: query,
        ...options,
        include: [
            {
                model: db.User,
                as: "rPostedBy",
                attributes: ["avatar", "phone", "name", "email"]
            },
            {
                model: db.User,
                as: "rOwner",
                attributes: ["avatar", "phone", "name", "email"]
            }
        ]
    });

    return res.json({
        // success: response.length > 0 ? "true" : "false",
        // mes: response.length > 0 ? "Got." : "Cannot get property 2",
        // properties: response
        success : Boolean(response),
        mes: response ? "Got." : "Cannot get propertyType",
        property: response
    })
})

module.exports = {
    createNewProperty,
    getPropertyList,
}