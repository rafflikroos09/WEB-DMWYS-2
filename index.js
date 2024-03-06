import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "src/view");

// serving static file such as css, js, img, etc
app.use("/assets", express.static("src/assets"));
// body parser for req body
app.use(express.urlencoded({ extended: false }));
// request = dari client ke server
// respose = dari server ke client

// Roting
app.get("/home", home);
app.get("/blog", blog);
app.get("/blogdetail/:id", blogdetail);
app.get("/delete-blog/:id", handleDeleteBlog);
app.get("/testi", testi);
app.get("/contact", contact);

function home(req, res) {
  res.render("home");
}

function blog(req, res) {
  const data = [
    {
      title: "Title 1",
      content: "Content 1",
    },

    {
      title: "Title 2",
      content: "Content 2",
    },
  ];

  res.render("blog", { data });
}

function blogdetail(req, res) {
  const id = req.params.id;

  res.render("blogdetail", { id });
}

function testi(req, res) {
  res.render("testi");
}

function contact(req, res) {
  res.render("contact");
}

function handleDeleteBlog(req, res) {
  const { id } = req.params.id;

  datas.splice(id, 1);

  res.redirect("/blog");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
