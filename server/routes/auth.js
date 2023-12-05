const router = require("express").Router()
const validateDto = require("../middlewares/validation");
const Joi = require("joi")

const ctrls = require("../controllers/auth");
const { stringReq, numberReq } = require("../middlewares/joiSchema");

// {
    // validateDto(Joi.object({
    //     password: stringReq,
    //     name: stringReq,
    //     phone: numberReq
    // })),
// }
router.post("/register", validateDto(Joi.object({
    password: stringReq,
    name: stringReq,
    phone: numberReq,
    role: stringReq
})),ctrls.register);

router.post("/signin", validateDto(Joi.object({
    password: stringReq,
    phone: numberReq,
})),ctrls.signIn);



// router.get("/test-get")

router.get("/", (req, res ) => {
    return res.status(200).json({mess: "okk"})
});



module.exports = router;