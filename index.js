import express from "express";
const app = express();
const port = 3000;

// NOTE :
// request = dari client ke server
// respose = dari server ke client
// get = mengambil data
// post = mengirim data

app.set("view engine", "hbs");
app.set("views", "src/view");

// serving static file such as css, js, img, etc
app.use("/assets", express.static("src/assets"));
// body parser for req body
app.use(express.urlencoded({ extended: false }));

//DURATION CODE
const getDiffDate = (startDate, endDate) => {
  const diffInMs = Math.abs(endDate - startDate);
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (days < 1) {
    return "1 day";
  }

  if (days < 30) {
    return days + " days";
  }

  if (months === 1) {
    return "1 month";
  }

  if (months < 12) {
    return months + " months";
  }

  if (years === 1) {
    return "1 year";
  }

  return years + " years";
};

// Roting
app.get("/home", home);
app.get("/blog", blog);
app.get("/blogdetail/:id", blogdetail);
app.post("/blog", handleBlog);

app.get("/delete-blog/:id", handleDeleteBlog);
app.get("/edit-blog/:id", handleEditBlog);
app.post("/blog/:id/update", handleUpdateBlog);
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
    data: data[id],
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

  const { title, startDate, endDate, content, nodejs, golang, react, js } = req.body;

  data.push({
    title,
    startDate,
    endDate,
    content,
    nodejs,
    golang,
    react,
    js,
    diff: getDiffDate(new Date(startDate), new Date(endDate)),
  });

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

function handleEditBlog(req, res) {
  const { id } = req.params;

  res.render("/blogEdit", { data: data[id] });
}

function handleUpdateBlog(req, res) {
  const { id } = req.params;

  data.slice(id, 1, {
    title,
    startDate,
    endDate,
    content,
    nodejs,
    golang,
    react,
    js,
    diff: getDiffDate(new Date(startDate), new Date(endDate)),
  });

  res.redirect("/blog");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
