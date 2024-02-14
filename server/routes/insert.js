const router = require("express").Router();
const ctrls = require("../controllers/insert");

router.post("/roles", ctrls.initRoles);
router.get("/test", ctrls.testTable);


module.exports = router;

