const errHandler = (error, req, res, next) => {
    
    // console.log({error: error.message, res: res.statusCode})
    const formattedMes = error?.message?.replaceAll(`\"`, "");

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    return res.status(statusCode).json({
        success: false,
        mes: formattedMes,
    });

}

const throwErrorWithStatus =  (
    code, message, res, next
) => {
    const formattedMes = message?.replaceAll(`\"`, "");
    const error = new Error(formattedMes);
    res.status(code);
    next(error);
}

const badRequestException = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    res.status(404);
    next(error);
}

module.exports = {
    errHandler,
    throwErrorWithStatus,
    badRequestException,
}
