import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkModeAction } from "../../actions/index";
import icon from "./dark-mode-1.png";
import iconLight from "./dark-mode.png";
import "./DarkMode.css";

export default function DarkMode() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  function handleOnClick(event) {
    event.preventDefault();
    console.log(darkMode);
    dispatch(darkModeAction());
  }

  return (
    <div>
      <button
        className="dark-mode-button"
        onClick={(event) => handleOnClick(event)}
      >
        <img src={darkMode ? icon : iconLight} alt="dark-mode-img" className="dark-mode-img" />
      </button>
    </div>
  );
}
