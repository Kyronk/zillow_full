const router = require("express").Router()
const validateDto = require("../middlewares/validation");
const Joi = require("joi")

const ctrls = require("../controllers/propertyType");
const { stringReq, numberReq, string } = require("../middlewares/joiSchema");

const { verifyToken, isAdmin } = require("../middlewares/verifyToken");

const rateLimit = require("../middlewares/rateLimiter");

router.use(rateLimit)

router.post("/", 
    verifyToken, isAdmin, 
    validateDto(Joi.object({
        name: stringReq,
        description: stringReq,
        image: stringReq,
    })) ,
    ctrls.createNewPropertyType);

router.get("/", ctrls.getPropertyTypes);

router.patch("/:id", verifyToken, isAdmin,
    validateDto(Joi.object({
        name: string,
        description: string,
        image: string,
    })) ,
    ctrls.updatePropertyType);

router.delete("/:id", verifyToken, isAdmin, ctrls.removePropertyType);
module.exports = router;
