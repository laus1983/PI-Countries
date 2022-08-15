import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../actions/index.js";
import ActivitiesCard from "../ActivitiesCard/ActivitiesCard.jsx";
import "./ActivitiesList.css";

export default function ActivitiesList() {
  const dispatch = useDispatch();
  const activitiesList = useSelector((state) => state.activities);
  const language = useSelector((state) => state.language);

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

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className="activities-list">
      <div className="activities-list-title-container">
        <h1 className="act-list-title">
          {language ? "Actividades Creadas" : "Activities created"}
        </h1>
      </div>
      <div className="cards-activities-list">
        {activitiesList.length > 0
          ? activitiesList.map((e) => {
              return (
                <ActivitiesCard
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  difficulty={e.difficulty}
                  duration={e.duration}
                  season={language ? seasonName(e.season) : e.season}
                  Countries={e.Countries.map((c) => (
                    <p>{language ? c.nameSpa : c.name}</p>
                  ))}
                />
              );
            })
          : language
          ? "No hay actividades creadas"
          : "No activities created"}
      </div>
      <div className="activities-list-navlink-container">
        <NavLink to="/activities/options" className="activities-list-navlink">
          <button className="activities-list-back-btn">
            {language ? "⬅ Volver" : "⬅ Go Back"}
          </button>
        </NavLink>
      </div>
    </div>
  );
}
