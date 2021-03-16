const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");
console.log("routes exported");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));

//to use api
router.use("/api", require("./api"));
//for any further routes access from here
//router.use("/routename",require("./routerfile")):
module.exports = router;
