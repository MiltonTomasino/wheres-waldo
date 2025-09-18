const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports.getGamePage = async (req, res) => {
    const { title } = req.query;
    
    const data = await prisma.fileInfo.findFirst({
        where: {
            name: {
                equals: title,
                mode: 'insensitive'
            }
        }
    });

    console.log("Data: ", data);
    
    res.render("game", { image: title, title: `${title}'s page`, file: data });
}

module.exports.startGame = (req, res) => {
    req.session.gameStart = Date.now();
    res.status(200).json({ ok: true });
}

module.exports.finishGame = (req, res) => {
    const start = req.session.gameStart;
    if (!start) return res.status(400).send("Game is not started");

    const elapsedTime = (Date.now() - start) / 1000;

    req.session.totalTime = elapsedTime;
    res.json({ time: elapsedTime });
}