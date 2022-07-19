const { Router } = require("express");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db.js");
const axios = require("axios");
const router = Router();

const url = "https://restcountries.com/v3/all";

const getInfo = async () => {
  try {
    const { data } = await axios.get(url);
    const countriesFromApi = data.map((element) => {
      const country = {
        id: element.cca3,
        name: element.name.common,
        nameSearch: element.translations.spa.common,
        flag: element.flags[0],
        continent: element.continents[0],
        capital: element.capital ? element.capital[0] : "No capital found",
        subregion: element.subregion,
        area: element.area,
        population: element.population,
      };

      Country.findOrCreate({
        where: { id: element.cca3 },
        defaults: country,
      });
    });
  } catch (e) {
    (e) => console.error(e);
  }
};

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    try {
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
        res.json(countries);
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    try {
      const countries = await Country.findAll();
      if (countries.length > 0) res.json(countries);
      else {
        await getInfo();
        const countries = await Country.findAll();
        res.json(countries);
      }
    } catch (e) {
      console.error(e);
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
    console.error(e);
  }
});
module.exports = router;
