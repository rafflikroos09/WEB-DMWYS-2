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

// get = mengambil data
// post = mengirim data

// Roting
app.get("/home", home);
app.get("/blog", blog);
app.get("/blogdetail/:id", blogdetail);
app.post("/blog", handleBlog);

app.get("/delete-blog/:id", handleDeleteBlog);
app.get("/testi", testi);
app.get("/contact", contact);

const data = [];

function home(req, res) {
  res.render("home");
}

function blog(req, res) {
  res.render("blog", { data });
}

function blogdetail(req, res) {
  const id = req.params.id;

  res.render("blogdetail", {
    data: [id],
  });
}

function testi(req, res) {
  res.render("testi");
}

function contact(req, res) {
  res.render("contact");
}

function handleBlog(req, res) {
  // const title = req.body.title;
  // const startDate = req.body.startDate;
  // const endDate = req.body.endDate;
  // const content = req.body.content;

  const { title, startDate, endDate, content, techIcon } = req.body;

  data.push({ title, startDate, endDate, content, techIcon });

  res.redirect("/blog");
}

function handleDeleteBlog(req, res) {
  const { id } = req.params;

  // if (confirm("Apkah anda yakin ?") == true) {
  //   data.splice(id, 1);
  // } else {
  //   res.redirect("/blog");
  // }

  data.splice(id, 1);
  res.redirect("/blog");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
