import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getByName } from "../../actions/index.js";
import Spinner from "../Spinner/Spinner.jsx";
// import icon from './global-research.png';
import exit from "./exit.png";
import "./SearchBar.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const language = useSelector((state) => state.language);
  const isLoading = useSelector((state) => state.isLoading);

  function handleInput(event) {
    // console.log(ev.target.value);
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
        <img src={exit} alt="Icon-exit" className="icon-exit" />
      </NavLink>

      <NavLink to="/activities" className="actForm">
        <h4 className="crearActividad">{language ? "Crear actividad" : "Create activity"}</h4>
      </NavLink>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={language ? "Buscar..." : "Search..."}
            onChange={handleInput}
            value={name}
          />
          {/* <button className='submit' type='submit'><img src={icon} alt='Icon-search' className='icon-search'/></button> */}
          <input type="submit" value={language ? "Busqueda" : "Search"} className="icon-search" />
        </form>
      </div>
      </>)}
    </div>
  );
}
