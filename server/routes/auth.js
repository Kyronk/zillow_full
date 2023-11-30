const router = require("express").Router()
const validateDto = require("../middlewares/validation");
const Joi = require("joi")

const ctrls = require("../controllers/auth");
const { stringReq, numberReq } = require("../middlewares/joiSchema");

router.post("/register", validateDto(Joi.object({
    password: stringReq,
    name: stringReq,
    phone: numberReq
})), ctrls.register );


module.exports = router