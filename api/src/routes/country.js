const { Router } = require("express");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db.js");
const { getCountries, getInfo } = require("../controllers");
const router = Router();

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  const { language } = req.query;
  console.log(language);
  if (name) {
    try {
      if (language === "true") {
        const countries = await Country.findAll({
          where: {
            nameSearch: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
        if (countries.length > 0) {
          res.json(countries);
        } else {
          await getInfo();
          const countries = await Country.findAll({
            where: {
              nameSearch: {
                [Op.iLike]: `%${name}%`,
              },
            },
          });
          if (countries.length > 0) {
            res.json(countries);
          } else {
            res.status(200).json("País no encontrado");
            // res.status(404).send("País no encontrado");
            // res.sendStatus(404);
            // res.send("País no encontrado");
          }
        }
      } else {
        const countries = await Country.findAll({
          where: {
            nameEn: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
        if (countries.length > 0) {
          res.json(countries);
        } else {
          await getInfo();
          const countries = await Country.findAll({
            where: {
              nameEn: {
                [Op.iLike]: `%${name}%`,
              },
            },
          });
          if (countries.length > 0) {
            res.json(countries);
          } else {
            // res.sendStatus(404);
            res.status(200).json("Country not found");
            // res.status(404).send("Country not found");
            // res.send("Country not found");
          }
        }
      }
    } catch (e) {
      next(e);
    }
  } else {
    try {
      const result = await getCountries();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
});

router.get("/:idPais", async (req, res, next) => {
  const { idPais } = req.params;
  try {
    const result = await Country.findByPk(idPais.toUpperCase(), {
      include: {
        model: Activity,
      },
    });
    if (result) res.json(result);
    else {
      await getInfo();
      const result = await Country.findByPk(idPais.toUpperCase(), {
        include: {
          model: Activity,
        },
      });
      if (result) res.json(result);
      else res.send("No matches were found");
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
