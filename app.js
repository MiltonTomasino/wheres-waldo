const express = require("express");
const indexRouter = require("./routes/index");
const gameRouter = require("./routes/game");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/game", gameRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    
})