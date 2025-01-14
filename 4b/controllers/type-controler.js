const { Sequelize, QueryTypes, where } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);
const { Hero, User, Type } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function renderType(req, res) {
  const { user } = req.session;

  if (!user) {
    req.flash("error", "silahkan login");
    return res.redirect("/login");
  }

  const types = await Type.findAll({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
  });
  // console.dir(blogs, { depth: null });
  console.log(types);
  // if (user.id) {
  //   res.render("blog", { blogs: blogs, user: user });
  // } else {
  //   res.render("blog", { blogs: blogs });
  // }
  res.render("type", { types: types, user: user });
}

async function renderTypeEdit(req, res) {
  const { user } = req.session;
  const { id } = req.params;

  if (!user) {
    req.flash("error", "silahkan login");
    return res.redirect("/login");
  }

  const dataToEdit = await Type.findOne({
    where: {
      id: id,
    },
  });
  if (dataToEdit === null) {
    res.render("page-404", { message: "blog tidak ditemukan" });
  } else {
    console.log("data yang mau di edit :", dataToEdit);
    res.render("type-edit", { data: dataToEdit, user: user });
  }
}

function renderTypeAdd(req, res) {
  const { user } = req.session;

  if (!user) {
    req.flash("error", "silahkan login");
    return res.redirect("/login");
  }

  res.render("type-add", { user: user });
}

async function addType(req, res) {
  console.log("informasi file", req.file);
  console.log("form submit");
  const { user } = req.session;
  const { nametype, description } = req.body;

  const result = await Type.create({
    nametype: nametype,
    description: description,
    user_id: user.id,
  });
  console.log("type created", result);
  res.redirect("/type");
}

async function updateType(req, res) {
  console.log("req :", req);
  const { id } = req.params;
  const { nametype, description } = req.body;

  const result = await Type.update(
    {
      nametype: nametype,
      description: description,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      where: {
        id: id,
      },
    }
  );
  console.log("result update :", result);
  res.redirect("/type");
}

async function deleteType(req, res) {
  console.log("req :", req);
  const { id } = req.params;

  const result = await Type.destroy({
    where: {
      id: id,
    },
  });
  console.log("result query delete :", result);
  res.redirect("/type");
}

module.exports = {
  renderType,
  renderTypeAdd,
  renderTypeEdit,
  addType,
  updateType,
  deleteType,
};
