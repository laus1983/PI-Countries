import React from "react";
import { useSelector } from "react-redux";
import "./ActivitiesCard.css";

export default function ActivitiesCard({
  id,
  name,
  difficulty,
  duration,
  season,
  Countries,
}) {
  const language = useSelector((state) => state.language);

  return (
    <div className="act-card-dark">
      <div className="act-name">
        <h2 className="actId">Id: {id}</h2>
        <h2 className="actName">
          {language ? "Nombre: " : "Name: "}
          {name}
        </h2>
      </div>
      <h3 className="act-card-info">
        {language ? "Dificultad: " : "Difficulty: "}
        {difficulty}
      </h3>
      <h3 className="act-card-info">
        {language ? "Duración: " : "Duration: "}
        {duration}
      </h3>
      <h3 className="act-card-info">
        {language ? "Temporada: " : "Season: "}
        {season}
      </h3>
      <h3 className="act-card-info">
        {language ? "Países: " : "Countries: "}
        {Countries}
      </h3>
    </div>
  );
}
