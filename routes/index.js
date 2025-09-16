const router = require("express").Router();
const controller = require("../controllers/indexController");

router.get("/", controller.getIndexPage);

module.exports = router;