const express = require("express");
const indexRouter = require("./routes/index")

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    
})