const express = require("express");
require('dotenv').config();
const cors = require("cors");
const dbconn = require("./config/dbconnect");

const initRoutes = require("./routes")

const app = express();


app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

initRoutes(app);


const PORT = process.env.PORT || 4567;

dbconn();

// app.use("/", (req,res) => {
//     return res.send("Server on");
// });



app.listen(PORT, () => console.log("server start on port : " + PORT));