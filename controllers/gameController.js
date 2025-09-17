module.exports.getGamePage = (req, res) => {
    const { title } = req.query;
    // console.log("Title: ", title);
    res.render("game", { image: title, title: `${title}'s page` });
}