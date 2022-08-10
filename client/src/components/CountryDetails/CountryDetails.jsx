import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getById } from "../../actions/index";
import Spinner from "../Spinner/Spinner.jsx";
import "./CountryDetails.css";

export default function CountryDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const country = useSelector((state) => state.countryDetails);
  const language = useSelector((state) => state.language);
  const isLoading = useSelector((state) => state.isLoading);
  const darkMode = useSelector((state) => state.darkMode);

  function seasonName(season) {
    switch (season) {
      case "spring":
        return "Primavera";
      case "summer":
        return "Verano";
      case "autumn":
        return "Otoño";
      case "winter":
        return "Invierno";
      default:
        break;
    }
  }

  function subregionName(subregion) {
    switch (subregion) {
      case "Northern Africa":
        return "África del Norte";
      case "Eastern Africa":
        return "África Oriental";
      case "Caribbean":
        return "Caribe";
      case "South America":
        return "Sudamérica";
      case "Western Asia":
        return "Asia Occidental";
      case "Middle Africa":
        return "África Central";
      case "Polynesia":
        return "Polinesia";
      case "Northern Europe":
        return "Norte de Europa";
      case "South Eastern Asia":
        return "Asia Sudoriental";
      case "Southern Europe":
        return "Europa del Sur";
      case "Southern Africa":
        return "África del Sur";
      case "Southeast Europe":
        return "Sureste de Europa";
      case "Western Africa":
        return "África Occidental";
      case "null":
        return "Subregión no especificada";
      case "North America":
        return "América del Norte";
      case "Melanesia":
        return "Melanesia";
      case "Southern Asia":
        return "Asia Meridional";
      case "Central Europe":
        return "Europa Central";
      case "Eastern Asia":
        return "Asia Oriental";
      case "Western Europe":
        return "Europa Oriental";
      case "Australia and New Zealand":
        return "Australia y Nueva Zelanda";
      case "Micronesia":
        return "Micronesia";
      case "Central America":
        return "Centroamérica";
      case "Central Asia":
        return "Asia Central";
      case "Eastern Europe":
        return "Europa del Este";
      default:
        break;
    }
  }

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  return (
    <div className={darkMode ? "countryDetails-dark" : "countryDetails"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {country.hasOwnProperty("name") ? (
            <div>
              <div className="details">
                <div className="flag-container">
                  <img
                    className={darkMode ? "flag-info-dark" : "flag-info"}
                    src={country.flag}
                    alt={country.name}
                  />
                </div>
                <div className="country-info">
                  <h1 className={darkMode ? "countries-info-labels-dark" : "countries-info-labels"}>{country.id}</h1>
                  <h2 className={darkMode ? "countries-info-labels-dark" : "countries-info-labels"}>
                    {language ? country.nameSpa : country.name}
                  </h2>
                  <h3 className={darkMode ? "countries-info-content-dark" : "countries-info-content"}>
                    <i className={darkMode ? "countries-info-labels-dark" : "countries-info-labels"}>Capital: </i>
                    {country.capital}
                  </h3>
                  <h3 className={darkMode ? "countries-info-content-dark" : "countries-info-content"}>
                    <i className={darkMode ? "countries-info-labels-dark" : "countries-info-labels"}>
                      {language ? "Subregión: " : "Subregion: "}
                    </i>
                    {language
                      ? subregionName(country.subregion)
                      : country.subregion}
                  </h3>
                  <h3 className={darkMode ? "countries-info-content-dark" : "countries-info-content"}>
                    <i className={darkMode ? "countries-info-labels-dark" : "countries-info-labels"}>
                      {language ? "Área: " : "Area: "}
                    </i>
                    {parseInt(country.area).toLocaleString("de-DE")} Km2
                  </h3>
                  <h3 className={darkMode ? "countries-info-content-dark" : "countries-info-content"}>
                    <i className={darkMode ? "countries-info-labels-dark" : "countries-info-labels"}>
                      {language ? "Población: " : "Population: "}
                    </i>
                    {country.population.toLocaleString("de-DE")}
                  </h3>
                </div>
              </div>
              <div className="activities-container">
                <h2 className="activities-label-title">
                  <i className={darkMode ? "activities-label-dark" : "activities-label"}>
                    {language ? "Actividades" : "Activities: "}
                  </i>
                </h2>
                {country.Activities?.length > 0 ? (
                  country.Activities?.map((act) => (
                    <p className={darkMode ? "activities-info-container-dark" : "activities-info-container"} key={act.id}>
                      {/* <li className="actInfoLabel">Id: {act.id}</li> */}
                      <li className={darkMode ? "actInfoLabel-1-dark" : "actInfoLabel-1"}>
                        {/* {language ? "Actividad: " : "Activity: "} */}
                        {act.name}
                      </li>
                      <li className={darkMode ? "actInfoLabel-dark" : "actInfoLabel"}>
                        {language ? "Temporada: " : "Season: "}
                        {language ? seasonName(act.season) : act.season}
                      </li>
                      <li className={darkMode ? "actInfoLabel-dark" : "actInfoLabel"}>
                        {language ? "Duración: " : "Duration: "}
                        {act.duration}
                      </li>
                      <li className={darkMode ? "actInfoLabel-dark" : "actInfoLabel"}>
                        {language ? "Dificultad: " : "Difficulty: "}{" "}
                        {act.difficulty}
                      </li>
                    </p>
                  ))
                ) : (
                  <h2 className={darkMode ? "noActivity-dark" : "noActivity"}>
                    {language
                      ? "¡No tiene actividades!"
                      : "It has no activities!"}
                  </h2>
                )}
              </div>
            </div>
          ) : (
            <h2 className="noActivity">
              {language ? "¡País no encontrado!" : "¡Country not found!"}
            </h2>
          )}
          <div className="back-container">
            <NavLink to="/countries" className="back">
              <button className={darkMode ? "back-btn-info-dark" : "back-btn-info"}>
                {language ? "⬅ Volver" : "⬅ Go Back"}
              </button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
