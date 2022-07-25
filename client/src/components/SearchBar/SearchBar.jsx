import React from "react";
import { useState } from "react";
import { useDispatch, /*useSelector*/ } from "react-redux";
import { NavLink } from "react-router-dom";
import { getByName } from "../../actions/index.js";
// import icon from './global-research.png';
import exit from "./exit.png";
import "./SearchBar.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(event) {
    // console.log(ev.target.value);
    setName(event.target.value);
    event.preventDefault();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name) {
      alert("Please enter a country name");
    }
    try{
      dispatch(getByName(name));
      setCurrentPage(1);
    } catch(err){
      alert("Please enter a valid country name");
    }
  }

  return (
    <div className="navbar">
      <NavLink to="/">
        <img src={exit} alt="Icon-exit" className="icon-exit" />
      </NavLink>

      <NavLink to="/TourActivity" className="actForm">
        <h4 className="crearActividad">Create activity</h4>
      </NavLink>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleInput}
            value={name}
          />
          {/* <button className='submit' type='submit'><img src={icon} alt='Icon-search' className='icon-search'/></button> */}
          <input type="submit" value="Search" className="icon-search" />
        </form>
      </div>
    </div>
  );
}
