const auth = require("./auth");
const user = require("./user");
const insert = require("./insert");
const propertyType = require("./propertyType");
const properties = require("./property");
const { errHandler, badRequestException } = require("../middlewares/errorHandler");


const initRoutes = (app) => {

    app.use("/api/property-type", propertyType);
    // app.use("/api/insert", insert);
    app.use("/api/properties", properties);
    app.use("/api/auth", auth);
    app.use("/api/user", user);



    // app.use("/", badRequestException);
    app.use( badRequestException);
    app.use(errHandler);
}

module.exports = initRoutes;