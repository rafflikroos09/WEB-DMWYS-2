import express from "express";
import { Sequelize, QueryTypes } from "sequelize";
import connection from "./src/config/connection.js";
import bcrypt from "bcrypt";
import session from "express-session";
import flash from "express-flash";

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
// INIT flash and Session
app.use(flash());
app.use(
  session({
    secret: "bla bla bla",
    store: new session.MemoryStore(),
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
    },
    saveUninitialized: true,
    resave: false,
  })
);

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
app.get("/register", formRegister);
app.post("/register", register);
app.get("/login", fromLogin);
app.post("/login", login);
app.get("/contact", contact);

// const data = [];

function home(req, res) {
  console.log(req.session.isLogin);
  res.render("home", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
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

function fromLogin(req, res) {
  res.render("login");
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const QueryLogin = `SELECT * FROM users WHERE email = '${email}'`;

    const isCheckEmail = await sequelizeConfig.query(QueryLogin, { type: QueryTypes.SELECT });

    if (!isCheckEmail.length) {
      req.flash("danger", "Email has not been registered");
      return res.redirect("/login");
    }

    await bcrypt.compare(password, isCheckEmail[0].password, function (err, result) {
      if (!result) {
        req.flash("danger", "Password Wrong");
        return res.redirect("/login");
      } else {
        req.session.isLogin = true;
        req.session.user = isCheckEmail[0].name;
        req.flash("succses", "Login Succses");
        return res.redirect("/home");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function formRegister(req, res) {
  res.render("register");
}

async function register(req, res) {
  try {
    let { name, email, password } = req.body;

    bcrypt.hash(password, 10, async function (err, dataHase) {
      if (err) {
        res.redirect("/register");
      } else {
        const Queryuser = `INSERT INTO users(
          name, email, password,"createdAt", "updatedAt")
          VALUES ('${name}', '${email}','${dataHase}', NOW(), NOW())`;

        await sequelizeConfig.query(Queryuser);

        res.redirect("/login");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// async function register(req, res) {
//   try {
//     let { name, email, password } = req.body;

//     await sequelizeConfig.query(`INSERT INTO users(name, email, password, "createAt","updateAt") VALUES ('${name}', '${email}', '${password}', NOW(), NOW())`);

//     res.redirect("/register");
//   } catch (error) {
//     console.log(error);
//   }
// }

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
