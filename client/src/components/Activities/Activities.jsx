import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Activities.css";

export default function Activities() {
  const language = useSelector((state) => state.language);

  return (
    <div className="activities-linkTo">
      <h1 className="activities-title">
        {language ? "Actividades turísticas" : "Tourist activities"}
      </h1>
      <NavLink to="/activities/create" className="activities-options-navlink">
        <button className="touristAct-btn">
          {language ? "Crear actividad" : "Create activity"}
        </button>
      </NavLink>

      <NavLink to="/activities" className="activities-options-navlink">
        <button className="touristAct-btn">
          {language ? "Ver actividades" : "See activities"}
        </button>
      </NavLink>

      <NavLink to="/activities/edit" className="activities-options-navlink">
        <button className="touristAct-btn">
          {language ? "Editar / borrar actividad" : "Edit / delete activity"}
        </button>
      </NavLink>

      <NavLink to="/countries" className="activities-options-navlink">
        <button className="touristAct-btn">
          {language ? "⬅ Volver" : "⬅ Go Back"}
        </button>
      </NavLink>
    </div>
  );
}
