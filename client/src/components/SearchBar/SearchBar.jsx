import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getByName } from "../../actions/index.js";
import Spinner from "../Spinner/Spinner.jsx";
import DarkMode from "../DarkMode/DarkMode.jsx";
import exit from "./icon-logout.png";
import exitDark from "./7.png";
import "./SearchBar.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const language = useSelector((state) => state.language);
  const isLoading = useSelector((state) => state.isLoading);
  const darkMode = useSelector((state) => state.darkMode);


  function handleInput(event) {
    setName(event.target.value);
    event.preventDefault();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name) {
      language ? alert("Por favor ingrese el nombre del país") : alert("Please enter a country name");
    }
    try{
      dispatch(getByName(name, language));
      setCurrentPage(1);
    } catch(err){
      language ? alert("Por favor ingrese un nombre válido") : alert("Please enter a valid country name");
    }
  }

  return (
    <div className="navbar">
        {isLoading ? (
          <Spinner />
        ) : (<>
      <NavLink to="/">
        <img src={darkMode ? exitDark : exit} alt="Icon-exit" className="icon-exit" />
      </NavLink>

      <NavLink to="/activities/options" className={darkMode ? "actForm-dark" : "actForm"}>
        <h4 className="crearActividad">{language ? "Actividades" : "Activities"}</h4>
      </NavLink>
      <div>
      <DarkMode />
      </div>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            className={darkMode ? "search-input-dark" : "search-input"}
            type="text"
            placeholder={language ? "Buscar..." : "Search..."}
            onChange={handleInput}
            value={name}
          />
          <input type="submit" value={language ? "Búsqueda" : "Search"} className={darkMode ? "icon-search-dark" : "icon-search"} />
        </form>
      </div>
      </>)}
    </div>
  );
}
