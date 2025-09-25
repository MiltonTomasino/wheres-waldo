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

    // console.log("Data: ", data);

    const time = req.session.totalTime || "no time";
    
    res.render("game", { image: title, title: `${title}'s page`, file: data, time: time });
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

module.exports.submitRecord = async (req, res) => {
    try {
        const { username, file } = req.body;
        const time = req.session.totalTime;

        await prisma.record.create({
            data: {
                username: username,
                time: time,
                fileInfoId: parseInt(file)
            }
        })

    } catch (error) {
        console.error("Error submitting record: ", error);
    }
}