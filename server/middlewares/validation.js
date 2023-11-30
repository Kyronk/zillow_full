
// const { throwErrorWithStatus } = require("./errorHandler");

const validateDto = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    // console.log("check errors in middleware joi: ",error);

    const messErr = error.details[0].message;
    // console.log("check mess", messErr);

    if(error ) {
        return res.status(403).json({
            success: false,
            mes: error.details[0].message,
        })
    };


    // if(error) throwErrorWithStatus(403, messErr, res , next)
    next();
}


module.exports = validateDto;