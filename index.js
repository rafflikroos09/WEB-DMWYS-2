import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "src/view");

app.use("/assets", express.static("src/assets"));

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/blogdetail", (req, res) => {
  res.render("blogdetail");
});

app.get("/testi", (req, res) => {
  res.render("testi");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
