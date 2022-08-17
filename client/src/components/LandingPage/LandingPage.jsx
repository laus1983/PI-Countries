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
          <h1 className="title-landing-h">Bienvenido a CountryTravel</h1>
        ) : (
          <h1>Welcome to CountryTravel</h1>
        )}
        {language ? (
          <h3 className="title-landing-h">El mundo necesita más exploradores y menos turistas</h3>
        ):(
          <h3>The world needs more explorers and fewer tourists</h3>
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
