import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { switchLanguage } from "../../actions/index";
import "./LanguageSwitch.css";

export default function LanguageSwitch() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);

  useEffect(() => {
    dispatch(switchLanguage());
  }, [dispatch]);

  function handleClick(event) {
    event.preventDefault();
    dispatch(switchLanguage(event.target.value));
  }

  return (
    <div className="switch-language">
      <label className="switch-language-label">
        {language ? "Idioma: " : "Language: "}
      </label>
      <select
        className="switch-language-select"
        name="language"
        onChange={(event) => handleClick(event)}
      >
        <option className="switch-language-option" value="es">
          ES
        </option>
        <option className="switch-language-option" value="en">
          EN
        </option>
      </select>
    </div>
  );
}
