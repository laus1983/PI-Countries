import React from "react";
import { NavLink } from "react-router-dom";
import "./Card.css";

export default function Card({id, flag, name, continent}) {
  return (
    <div className="card">
      <h1 className="country">{name}</h1>
      <h2 className="continent">{continent}</h2>
      <NavLink to={`/countries/${id}`}>
        <img className="flag" src={flag} alt={name} />
      </NavLink>
      
    </div>
  );
}
