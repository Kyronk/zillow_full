const router = require("express").Router()
const validateDto = require("../middlewares/validation");
const Joi = require("joi")

const ctrls = require("../controllers/propertyType");
const { stringReq, numberReq, string } = require("../middlewares/joiSchema");

const { verifyToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", 
    verifyToken, isAdmin, 
    validateDto(Joi.object({
    name: stringReq,
    description: stringReq,
    image: stringReq,
})) ,
ctrls.createNewPropertyType);

router.get("/", ctrls.getPropertyTypes);
module.exports = router;
