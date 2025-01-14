const { Sequelize, QueryTypes, where } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);
const { Hero, User, Type } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function renderHome(req, res) {
  try {
    const { user } = req.session;
    const { id } = req.params;

    if (!user) {
      req.flash("error", "silahkan login");
      return res.redirect("/login");
    }

    const heros = await Hero.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: Type,
          as: "type",
        },
      ],
      order: [["createdAt", "DESC"]],
      ...(id && { where: { id: id } }),
    });

    return res.render("index", { data: heros, heros, user });
  } catch (error) {
    console.error("Error rendering home:", error);
    return res.status(500).send("Internal Server Error");
  }
}

function renderLogin(req, res) {
  const user = req.session.user;

  if (user) {
    res.redirect("/");
  } else {
    res.render("auth-login");
  }
}

function renderRegister(req, res) {
  const user = req.session.user;

  if (user) {
    res.redirect("/");
  } else {
    res.render("auth-register");
  }
}

async function authRegister(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const emailExist = await User.findOne({
    where: {
      email: email,
    },
  });

  if (emailExist) {
    req.flash("error", "Email sudah terdaftar");
    return res.redirect("/register");
  }

  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  req.flash("success", "berhasil mendaftar silahkan login");
  res.redirect("/login");
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  // check if user exist
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    req.flash("error", "email tidak ditemukan.");
    return res.redirect("/login");
  }
  //check if password is correct
  const isValidated = await bcrypt.compare(password, user.password);

  if (!isValidated) {
    req.flash("error", "password salah silahkan dicoba lagi");
    return res.redirect("/login");
  }
  console.log(req.body);
  let loggedInUser = user.toJSON();
  delete loggedInUser.password;
  req.session.user = loggedInUser;
  res.redirect("/");
}

function authLogout(req, res) {
  req.session.user = null;
  res.redirect("/login");
}

function render404(req, res) {
  res.render("404");
}

module.exports = {
  renderHome,
  renderLogin,
  renderRegister,
  authRegister,
  authLogin,
  authLogout,
  render404,
};
