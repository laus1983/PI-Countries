import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  const language = useSelector((state) => state.language);


  return (
    <div className="container-404">
      <div className="page-not-found-back-container">
        <label className="page-not-found-label">
        {language ? "Doble click para regresar " : "Double click to return "}
        </label>
        <NavLink to="/countries" className="back-page-not-found">
          <button className="page-not-found-btn">
            {language ? "⬅ Volver" : "⬅ Go Back"}
          </button>
        </NavLink>
      </div>
    </div>
  );
}
