const { Sequelize, QueryTypes, where } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);
const { Hero, User, Type } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function renderHeroAdd(req, res) {
  const { user } = req.session;

  if (!user) {
    req.flash("error", "silahkan login");
    return res.redirect("/login");
  }

  const query = `SELECT id, nametype, description, "createdAt", "updatedAt"
	FROM public."Types";`;
  const types = await sequelize.query(query, { type: QueryTypes.SELECT });
  console.log(types);

  res.render("hero-add", { types: types, user: user });
}

async function renderHeroDetails(req, res) {
  const { user } = req.session;
  const { id } = req.params;
  const myprojectDetail = await Hero.findOne({
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
    ...(id && { where: { id: id } }),
  });

  if (myprojectDetail === null) {
    res.render("page-404");
  } else {
    console.log("Hero details :", myprojectDetail);
    res.render("hero-details", { data: myprojectDetail, user: user });
  }
}

async function addHero(req, res) {
  console.log("informasi file", req.file);
  console.log("form submit");
  const { user } = req.session;
  const { name, type_id } = req.body;

  const photo = "http://localhost:2002/" + req.file.path;

  const result = await Hero.create({
    name: name,
    type_id: type_id,
    photo: photo,
    user_id: user.id,
  });
  console.log("Add Hero", result);
  res.redirect("/");
}

async function renderHeroEdit(req, res) {
  const { user } = req.session;
  const { id } = req.params;

  if (!user) {
    req.flash("error", "silahkan login");
    return res.redirect("/login");
  }

  const query = `SELECT id, nametype, description, "createdAt", "updatedAt"
	FROM public."Types";`;
  const types = await sequelize.query(query, { type: QueryTypes.SELECT });

  const dataToEdit = await Hero.findOne({
    where: {
      id: id,
    },
  });

  if (dataToEdit === null) {
    res.render("page-404");
  } else {
    console.log("data yang mau di edit :", dataToEdit);
    res.render("hero-edit", { types: types, data: dataToEdit, user: user });
  }
}

async function updateHero(req, res) {
  console.log("req :", req);
  const { id } = req.params;
  const { name, type_id } = req.body;

  let photo;

  if (req.file) {
    // Jika ada file baru yang diunggah, gunakan file tersebut
    photo = "http://localhost:2002/" + req.file.path;
  } else {
    // Jika tidak ada file baru, ambil gambar lama dari database
    const project = await Hero.findOne({ where: { id } });
    if (!project) {
      console.error("Project not found");
      return res.status(404).send("Project not found");
    }
    photo = project.photo;
  }

  const result = await Hero.update(
    {
      name: name,
      type_id: type_id,
      photo: photo,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      where: {
        id: id,
      },
    }
  );
  // blogs.splice(index, 1);
  console.log("result update :", result);
  res.redirect("/");
}

async function deleteHero(req, res) {
  console.log("req :", req);
  const { id } = req.params;

  const result = await Hero.destroy({
    where: {
      id: id,
    },
  });
  console.log("result query delete :", result);
  res.redirect("/");
}

module.exports = {
  renderHeroAdd,
  renderHeroEdit,
  renderHeroDetails,
  addHero,
  updateHero,
  deleteHero,
};
