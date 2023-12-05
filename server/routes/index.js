const auth = require("./auth");
const user = require("./user");

const { errHandler, badRequestException } = require("../middlewares/errorHandler");


const initRoutes = (app) => {

    app.use("/api/auth", auth);
    app.use("/api/user", user)



    // app.use("/", badRequestException);
    app.use( badRequestException);
    app.use(errHandler);
}

module.exports = initRoutes;