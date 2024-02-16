const Joi = require("joi")

exports.string = Joi.string().allow(null, "");

// exports.string = Joi.string().allow();
exports.stringReq = Joi.string().required();
exports.numberReq = Joi.number().required();
exports.number = Joi.number().allow(null, "");
exports.array = Joi.array().allow(null, "");
exports.arrayReq = Joi.array().required();
