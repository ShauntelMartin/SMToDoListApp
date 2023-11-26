import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var userIsAuthorised = false;

function passwordCheck(req, res, next) {
  const password = req.body["psw"];
  const username = req.body["uname"];
  if (username === "Shauntel" && password === "todolist") {
    userIsAuthorised = true;
  }
  next();
}

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "All Tasks"});
});

app.get("/today", (req, res) => {
  res.render("today.ejs", { name: "Today's Tasks" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { name: "Login"});
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.redirect("/").send;
  } else {   
    res.redirect("/login").send;
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
