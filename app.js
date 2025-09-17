const express = require("express");
const session = require("express-session")
const indexRouter = require("./routes/index");
const gameRouter = require("./routes/game");
require("dotenv").config();

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use("/", indexRouter);
app.use("/game", gameRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    
})