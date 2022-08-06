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

  function seasonName (season){
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

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  return (
    <div className="countryDetails">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {country.hasOwnProperty("name") ? (
            <div>
              <div className="details">
                <div className="flag-container">
                  <img className="flag-info" src={country.flag} alt={country.name} />
                </div>
                <div className="country-info">
                  <h1 className="countries-info-labels">{country.id}</h1>
                  <h2 className="countries-info-labels">{language ? country.nameSpa : country.name}</h2>
                  <h3 className="countries-info-content">
                    <i className="countries-info-labels">Capital: </i>
                    {country.capital}
                  </h3>
                  <h3 className="countries-info-content">
                    <i className="countries-info-labels">{language ? "Subregión: " : "Subregion: "}</i>
                    {country.subregion}
                  </h3>
                  <h3 className="countries-info-content">
                    <i className="countries-info-labels">{language ? "Área: " : "Area: "}</i>
                    {parseInt(country.area).toLocaleString("de-DE")} Km2
                  </h3>
                  <h3 className="countries-info-content">
                    <i className="countries-info-labels">{language ? "Población: " : "Population: "}</i>
                    {country.population.toLocaleString("de-DE")}
                  </h3>
                </div>
              </div>
              <div className="activities-container">
                <h2 className="activities-label-title">
                  <i className="activities-label">{language ? "Actividades" : "Activities: "}</i>
                </h2>
                {country.Activities?.length > 0 ? (
                  country.Activities?.map((act) => (
                    <p className="activities-info-container" key={act.id}>
                      {/* <li className="actInfoLabel">Id: {act.id}</li> */}
                      <li className="actInfoLabel-1">
                        {/* {language ? "Actividad: " : "Activity: "} */}
                        {act.name}
                        </li>
                      <li className="actInfoLabel">{language ? "Temporada: " : "Season: "}{language ? seasonName(act.season) : act.season}</li>
                      <li className="actInfoLabel">{language ? "Duración: " : "Duration: "}{act.duration}</li>
                      <li className="actInfoLabel">{language ? "Dificultad: " : "Difficulty: "} {act.difficulty}</li>
                    </p>
                  ))
                ) : (
                  <h2 className="noActivity">
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
              <button className="back-btn-info">{language ? "⬅ Volver" : "⬅ Go Back"}</button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
