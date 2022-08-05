import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Card.css";

export default function Card({id, flag, name, continent}) {

  const language = useSelector((state) => state.language);

  function continentName (continent){
  switch (continent) {
    case "Africa":
      return "África";
    case "Asia":
      return "Asia";
    case "Europe":
      return "Europa";
    case "North America":
      return "Norteamérica";
    case "Oceania":
      return "Oceanía";
    case "South America":
      return "Sudamérica";
    default:
      break;
  }
}


  return (
    <div className="card">
      <div className="country-name">
      <h1 className="country">{name}</h1>
      </div>
      <h2 className="continent">{language ? continentName(continent) ? continentName(continent) : "Continente no encontrado" : continent ? continent : "Continent not found"}</h2>
      <NavLink to={`/countries/${id}`}>
        <img className="flag" src={flag} alt={name} />
      </NavLink>
      
    </div>
  );
}
