const router = require("express").Router();
const controller = require("../controllers/gameController");

router.get("/", controller.getGamePage);
router.post("/start", controller.startGame);
router.post("/end", controller.finishGame);

module.exports = router;