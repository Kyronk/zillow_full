const router = require("express").Router()
const validateDto = require("../middlewares/validation");
const Joi = require("joi")

const ctrls = require("../controllers/property");
const { stringReq, numberReq, string } = require("../middlewares/joiSchema");

const { verifyToken, isAdmin } = require("../middlewares/verifyToken");

const rateLimit = require("../middlewares/rateLimiter");

router.use(rateLimit)


router.get("/", ctrls.getPropertyList);


module.exports = router;
