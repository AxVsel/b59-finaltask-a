const express = require("express");
var session = require("express-session");
var flash = require("express-flash");
const path = require("path");
const hbs = require("hbs");
const {
  renderHome,
  renderLogin,
  renderRegister,
  authRegister,
  authLogin,
  authLogout,
  render404,
} = require("./controllers/login-register-controler");
const {
  renderHeroAdd,
  renderHeroEdit,
  addHero,
  updateHero,
  deleteHero,
  renderHeroDetails,
} = require("./controllers/hero-controler");
const {
  renderType,
  renderTypeAdd,
  renderTypeEdit,
  addType,
  updateType,
  deleteType,
} = require("./controllers/type-controler");
const { formatDateToWIB, getRelativeTime } = require("./utils/time");
const { truncateText } = require("./utils/text");
const { sendAlert } = require("./utils/alert");

const upload = require("./middlewares/upload-file");
const app = express();
require("dotenv").config();
// const upload = require("./middlewares/upload-file");
const port = process.env.SERVER_PORT || 2001;

app.use(
  session({
    name: "my-session",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("truncateText", truncateText);
hbs.registerHelper("sendAlert", sendAlert);
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

app.get("/logout", authLogout);
app.get("/", renderHome);

app.post("/", upload.single("photo"), addHero);
app.get("/hero-edit/:id", renderHeroEdit);
app.get("/hero-detail/:id", renderHeroDetails);
app.post("/hero-update/:id", upload.single("photo"), updateHero);
app.post("/hero-delete/:id", deleteHero);

app.get("/login", renderLogin);
app.post("/login", authLogin);
app.get("/register", renderRegister);
app.post("/register", authRegister);

app.get("/hero-add", renderHeroAdd);

app.post("/type", addType);
app.get("/type", renderType);
app.get("/type-add", renderTypeAdd);
app.get("/type-edit/:id", renderTypeEdit);
app.post("/type-update/:id", updateType);
app.post("/type-delete/:id", deleteType);

app.get("/type-list", renderType);
app.get("*", render404);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  // console.log(`test dotenv ${process.env.URL_TEST}`);
});
