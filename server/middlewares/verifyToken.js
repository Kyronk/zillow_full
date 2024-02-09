
const { throwErrorWithStatus } = require("./errorHandler");
const jwt = require("jsonwebtoken");
const db = require("../models");

const verifyToken = (req, res, next) => {

    // const token = req.header?.authorization?.startsWith('Bearer');
    const token = req.headers?.authorization?.startsWith("Bearer");
    
    // console.log(">>> check raw token 1", token)

    if(!token) return throwErrorWithStatus(401, 'Creds not provide', res,next);

    const rawToken = req.headers?.authorization?.split(" ")[1];
    // console.log(">>> check raw token", rawToken);
    jwt.verify(rawToken, process.env.JWT_SECRET, (err, decode) => {
        if(err) return throwErrorWithStatus(401, 'creds invalid', res, next);
        req.user = decode;
        next();
    })
}

const isOwner = (req, res, next) => {
    const {roleCode} = req.user;
    if (roleCode === "ROL7" || roleCode === "ROL5") {
        return throwErrorWithStatus(401, "Bạn không có quyền truy cập.", res, next);
    } 
    next()
}

const isAgent = (req, res, next) => {
    const {roleCode} = req.user;
    if (roleCode === "ROL7") {
        return throwErrorWithStatus(401, "Bạn không có quyền truy cập.", res, next);
    } 
    next()
}

const isAdmin = (req, res, next) => {
    const {roleCode} = req.user;
    if (roleCode !== "ROL1") {
        return throwErrorWithStatus(401, "Bạn không có quyền truy cập.", res, next);
    }
    next();
}

module.exports = {
    verifyToken,
    isAgent,
    isOwner,
    isAdmin,
}