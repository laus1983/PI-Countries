import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../actions/index.js";
import ActivitiesCard from "../ActivitiesCard/ActivitiesCard.jsx";
import PaginationActivities from "../PaginationActivities/PaginationActivities.jsx";
import "./ActivitiesList.css";

export default function ActivitiesList() {
  const dispatch = useDispatch();
  const activitiesList = useSelector((state) => state.activities);
  const language = useSelector((state) => state.language);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesByPage /*setActivitiesByPage*/] = useState(10);

  const lastIndex = currentPage * activitiesByPage;
  const firstIndex = lastIndex - activitiesByPage;
  try {
    var currentActivity = activitiesList.slice(firstIndex, lastIndex);
  } catch (e) {}

  const pagesToShow = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        {currentActivity === undefined || currentActivity.length === 0
          ? language
            ? "No hay actividades creadas"
            : "No activities created"
          : currentActivity.map((e) => {
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
            })}
      </div>
      <div className="activities-list-navlink-container">
        <NavLink to="/activities/options" className="activities-list-navlink">
          <button className="activities-list-back-btn">
            {language ? "⬅ Volver" : "⬅ Go Back"}
          </button>
        </NavLink>
      </div>
      <div className="pagination-activities-container">
        <PaginationActivities
          activitiesByPage={activitiesByPage}
          activitiesList={activitiesList.length}
          pagesToShow={pagesToShow}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
