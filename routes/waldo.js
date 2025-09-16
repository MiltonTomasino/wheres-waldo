const router = require("express").Router();
const controller = require("../controllers/waldoController");

router.get("/", controller.getWaldoPage);

module.exports = router;