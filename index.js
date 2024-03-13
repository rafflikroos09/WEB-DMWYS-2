import express from "express";
// import squalize here
import { Sequelize, QueryTypes } from "sequelize";
import connection from "./src/config/connection.js";

const app = express();
const port = 3000;

//create instansi sequalize connection
const sequelizeConfig = new Sequelize(connection.development);

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

async function blog(req, res) {
  try {
    const QueryName = "SELECT * FROM blogs ORDER BY id DESC";

    const blog = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT });

    const obj = blog.map((data) => {
      return {
        ...data,
        author: "Budi Kroos",
      };
    });
    res.render("blog", { data: obj });
  } catch (error) {
    console.log(error);
  }
}

async function blogdetail(req, res) {
  try {
    const id = req.params.id;
    const QueryName = `SELECT * FROM blogs WHERE id=${id}`;

    const blog = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT });

    const obj = blog.map((data) => {
      return {
        ...data,
        author: "Budi Kroos",
      };
    });
    console.log(obj);

    res.render("blogdetail", { data: obj[0] });
  } catch (error) {
    console.log(error);
  }
}

function testi(req, res) {
  res.render("testi");
}

function contact(req, res) {
  res.render("contact");
}

async function handleBlog(req, res) {
  try {
    // const { title, startDate, endDate, content, nodejs, golang, react, js } = req.body;
    const { title, content } = req.body;
    const image = "https://id.pinterest.com/pin/503840277078970767/";
    // const diff = getDiffDate(new Date(startDate), new Date(endDate));
    // const start_Date = new Date(startDate).toISOString();
    // const end_Date = new Date(endDate).toISOString();
    // const is_nodejs = nodejs ? true : false;
    // const is_react = react ? true : false;
    // const is_js = js ? true : false;
    // const is_golang = golang ? true : false;

    // const QueryName = `INSERT INTO blogs(title, image, content, "createAt", "updateAt")
    // VALUES ('${title}', '${image}', '${content}', NOW(), NOW())`;

    // const QueryName = `INSERT INTO blogs(
    //   title, image, content, start_Date, end_Date, nodejs, react, js,golang, "createdAt", "updatedAt")
    //   VALUES ('${title}', '${image}','${start_Date}','${end_Date}','${is_nodejs}', '${is_react}', '${is_golang}','${is_js}','${diff}','${content}', NOW(), NOW())`;

    const QueryName = `INSERT INTO blogs(
        title, image, content,"createdAt", "updatedAt")
        VALUES ('${title}', '${image}','${content}', NOW(), NOW())`;

    await sequelizeConfig.query(QueryName);

    // data.push({
    //   title,
    //   startDate,
    //   endDate,
    //   content,
    //   nodejs,
    //   golang,
    //   react,
    //   js,
    //   diff: getDiffDate(new Date(startDate), new Date(endDate)),
    // });

    res.redirect("/blog");
  } catch (error) {
    console.log(error);
  }
}

async function handleDeleteBlog(req, res) {
  try {
    const { id } = req.params;
    const QueryName = `DELETE FROM blogs WHERE id = ${id}`;

    await sequelizeConfig.query(QueryName);

    res.redirect("/blog");
  } catch (error) {
    console.log(error);
  }
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
