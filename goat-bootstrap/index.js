const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use("/css", express.static("node_modules/bootstrap/dist/css"));
app.use("/js", express.static("node_modules/bootstrap/dist/js"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => res.render('index'));

app.listen(3000, () => console.log(`SERVER RUNNING ...`));
