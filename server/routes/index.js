const auth = require("./auth");

const { errHandler, badRequestException } = require("../middlewares/errorHandler");


const initRoutes = (app) => {

    app.use("/api/auth", auth);




    // app.use("/", badRequestException);
    app.use( badRequestException);
    app.use(errHandler);
}

module.exports = initRoutes;