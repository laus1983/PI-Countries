import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch.jsx";
import "./LandingPage.css";

export default function LandingPage() {
  const language = useSelector((state) => state.language);

  return (
    <div className="landing">
      <div className="title-landing">
        {language ? (
          <h1>Bienvenido a la App de Países</h1>
        ) : (
          <h1>Welcome to the Countries App</h1>
        )}
      </div>
      <div className="linkTo">
        <NavLink to="/countries" className="landing-navlink">
          <button className="landing-btn">{language ? "Comenzar" : "Get Started"}</button>
        </NavLink>
      </div>
      <div className="language-switch">
        <LanguageSwitch/>
      </div>
    </div>
  );
}
