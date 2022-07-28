import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getById } from "../../actions/index";
import "./CountryDetails.css";

export default function CountryDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const country = useSelector((state) => state.countryDetails);

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  return (
    <div className="countryDetails">
      {country.hasOwnProperty("name") ? (
        <div>
          <div className="details">
            <div>
              <img className="flag" src={country.flag} alt={country.name} />
            </div>
            <div className="country-info">
              <h1>{country.id}</h1>
              <h2>{country.name}</h2>
              <h3>
                <i>Capital: </i>
                {country.capital}
              </h3>
              <h3>
                <i>Subregion: </i>
                {country.subregion}
              </h3>
              <h3>
                <i>Area: </i>
                {parseInt(country.area).toLocaleString("de-DE")} Km2
              </h3>
              <h3>
                <i>Population: </i>
                {country.population.toLocaleString("de-DE")}
              </h3>
            </div>
          </div>
          <div className="activities">
            <h2>
              <i>Activities: </i>
            </h2>
            {country.Activities?.length > 0 ? (
              country.Activities?.map((act) => (
                <p key={act.id}>
                  <li>Id: {act.id}</li>
                  <li className="titleAct">Activity: {act.name}</li>
                  <li>Season: {act.season}</li>
                  <li>Duration: {act.duration}</li>
                  <li>Difficulty: {act.difficulty}</li>
                </p>
              ))
            ) : (
              <h2 className="noActivity">It has no activities!</h2>
            )}
          </div>
        </div>
      ) : (
        <h2 className="noActivity">¡Country not found!</h2>
      )}
      <div className="back">
        <NavLink to="/countries" className="back">
          <button>⬅ Go Back</button>
        </NavLink>
      </div>
    </div>
  );
}
