const router = require("express").Router();
const controller = require("../controllers/gameController");

router.get("/", controller.getGamePage);

module.exports = router;