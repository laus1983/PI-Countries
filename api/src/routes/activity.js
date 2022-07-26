const { Router } = require("express");
const { Country, Activity, CountryActivity } = require("../db.js");
const router = Router();

router.post("/", async (req, res, next) => {
  if (!req.body) res.send("The form is empty");

  try {
    const { name, difficulty, duration, season, countriesList } = req.body;

    const activityCreated = await Activity.create({
      name,
      difficulty: parseInt(difficulty),
      duration: parseInt(duration),
      season: season.toLowerCase(),
    });

    const dbCountries = await Country.findAll({
      where: {
        nameSearch: countriesList,
      },
    });

    const result = await activityCreated.addCountry(dbCountries);

    return res.send({ result, message: "Activity Created" });
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      include: { model: Country },
    });
    res.json(activities);
  } catch (e) {
    next(e);
  }
});


module.exports = router;
