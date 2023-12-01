
const { throwErrorWithStatus } = require("./errorHandler");

const validateDto = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);

    if(error) {
        const message = error.details[0].message?.replaceAll(`\"`, "");
        throwErrorWithStatus(403, message, res , next);

        // throwErrorWithStatus(403, error.details[0].message, res , next);
    };

    next();
    // console.log("check errors in middleware joi: ",error);

    // const messErr = error.details[0].message;
    // console.log("check mess", messErr);

    // if(error ) {
    //     return res.status(403).json({
    //         success: false,
    //         mes: error.details[0].message,
    //     })
    // };

}


module.exports = validateDto;