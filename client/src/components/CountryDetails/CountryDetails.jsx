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
                  <h1 className="country-id">{country.id}</h1>
                  <h2 className="country-name-1">{language ? country.nameSpa : country.name}</h2>
                  <h3 className="country-capital-info">
                    <i className="country-capital-label">Capital: </i>
                    {country.capital}
                  </h3>
                  <h3 className="country-subregion-info">
                    <i className="country-subregion-label">{language ? "Subregión: " : "Subregion: "}</i>
                    {country.subregion}
                  </h3>
                  <h3 className="country-area-info">
                    <i className="country-area-label">{language ? "Área: " : "Area: "}</i>
                    {parseInt(country.area).toLocaleString("de-DE")} Km2
                  </h3>
                  <h3 className="country-poblacion-info">
                    <i className="country-poblacion-label">{language ? "Población: " : "Population: "}</i>
                    {country.population.toLocaleString("de-DE")}
                  </h3>
                </div>
              </div>
              <div className="activities-container">
                <h2>
                  <i className="activities-label">{language ? "Actividades" : "Activities: "}</i>
                </h2>
                {country.Activities?.length > 0 ? (
                  country.Activities?.map((act) => (
                    <p key={act.id}>
                      <li>Id: {act.id}</li>
                      <li className="titleAct">
                        {language ? "Actividad: " : "Activity: "}
                        {act.name}
                      </li>
                      <li>Season: {act.season}</li>
                      <li>Duration: {act.duration}</li>
                      <li>Difficulty: {act.difficulty}</li>
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
              <button className="back-btn">{language ? "⬅ Volver" : "⬅ Go Back"}</button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
