module.exports.getGamePage = (req, res) => {
    const { title } = req.query;
    // console.log("Title: ", title);
    res.render("game", { image: title, title: `${title}'s page` });
}

module.exports.startGame = (req, res) => {
    req.session.gameStart = Date.now();
    res.status(200).json({ ok: true });
}

module.exports.finishGame = (req, res) => {
    const start = req.session.gameStart;
    if (!start) return res.status(400).send("Game is not started");

    const elapsedTime = (Date.now() - start) / 1000;

    res.json({ time: elapsedTime });
}