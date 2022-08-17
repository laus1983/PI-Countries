import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteActivity,
  getCountriesNames,
  putActivity,
} from "../../actions/index.js";
import { useState, useEffect } from "react";
import "./EditDeleteActivities.css";

export default function EditDeleteActivities() {
  const dispatch = useDispatch();
  const history = useHistory();
  const language = useSelector((state) => state.language);
  const countriesNames = useSelector((state) => state.countriesNames);
  const [input, setInput] = useState("");
  const [inputValue, setInputValue] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    deleteCountries: "",
    countriesList: [],
  });

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleOnSubmit(event) {
    if (!input) {
      alert(
        language
          ? "Ingrese el id de la actividad"
          : "Please enter an activity ID"
      );
    } else {
      event.preventDefault();
      dispatch(deleteActivity(input));
      setInput("");
      alert(language ? "Actividad borrada" : "Activity deleted");
    }
  }

  function validate(inputValue) {
    let error = {};
    if (!inputValue.name) {
      error.name = language
        ? "Se requiere el nombre de la actividad"
        : "Activity name is required";
    }
    if (!inputValue.duration) {
      error.duration = language
        ? "Se requiere la duración de la actividad"
        : "The duration of the activity is required";
    }
    return error;
  }

  const [error, setError] = useState({
    name: language
      ? "Se requiere el nombre de la actividad"
      : "Activity name is required",
    duration: "",
  });

  useEffect(() => {
    dispatch(getCountriesNames());
  }, [dispatch]);

  function handleOnChange(e) {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...inputValue,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSeason(e) {
    setInputValue({
      ...inputValue,
      season: e.target.value,
    });
    setError(
      validate({
        ...inputValue,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCountry(e) {
    setInputValue({
      ...inputValue,
      countriesList: [...inputValue.countriesList, e.target.value],
    });
    setError(
      validate({
        ...inputValue,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(e) {
    setInputValue({
      ...inputValue,
      countriesList: inputValue.countriesList.filter((c) => c !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(putActivity(input, inputValue, language));
    setInputValue({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countriesList: [],
    });
    alert(language ? "Actividad actualizada!" : "Activity updated!");
    history.goBack();
  }

  return (
    <div className="update-delete-activities-container">
      <div className="delete-activity-container">
        <h1 className="delete-activity-title">
          {language ? "Borrar actividad" : "Delete activity"}
        </h1>
        <form
          className="form-delete-activity"
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <div className="delete-activity-label">
            <label>{language ? "Id de la actividad" : "Activity id"}</label>
          </div>
          <div className="delete-activity-input-container">
            <input
              className="delete-activity-input"
              type={"text"}
              name="id"
              value={input.id}
              placeholder={language ? "Ingrese el id..." : "Enter the id..."}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="delete-activity-btn">
            <button type="submit" className="delete-button">
              {language ? "Eliminar" : "Delete"}
            </button>
          </div>
        </form>
        <div className="update-back-btn-container">
          <NavLink to="/activities/options" className="update-back-btn-link">
            <button className="update-back-btn">
              {language ? "⬅ Regresar" : "⬅ Back"}
            </button>
          </NavLink>
        </div>
      </div>
      <div className="update-form-container">
        <h1 className="delete-activity-title">
          {language ? "Editar actividad" : "Update activity"}
        </h1>
        <form
          className="form-update-activity"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="update-activity-input-container">
            <label className="update-activity-label">
              {language ? "Id de la actividad: " : "Activity id: "}
            </label>
            <input
              className="update-activity-input"
              type={"text"}
              name="id"
              value={input.id}
              placeholder={language ? "Ingrese el id..." : "Enter the id..."}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="update-input-name">
            <label className="update-activity-label">
              {language ? "Actividad turística: " : "Tourist Activity: "}
            </label>
            <input
              className="update-activity-input"
              type={"text"}
              name="name"
              value={inputValue.name}
              placeholder={language ? "Nombre..." : "Name..."}
              onChange={(e) => handleOnChange(e)}
            />
            {error.name && <p className="error-form">{error.name}</p>}
          </div>
          <div className="update-input-difficulty">
            <label>{language ? "Dificultad: " : "Difficulty: "}</label>
            <input
              type={"radio"}
              name="difficulty"
              value="1"
              onChange={(e) => handleOnChange(e)}
            />
            1
            <input
              type={"radio"}
              name="difficulty"
              value="2"
              onChange={(e) => handleOnChange(e)}
            />
            2
            <input
              type={"radio"}
              name="difficulty"
              value="3"
              onChange={(e) => handleOnChange(e)}
            />
            3
            <input
              type={"radio"}
              name="difficulty"
              value="4"
              onChange={(e) => handleOnChange(e)}
            />
            4
            <input
              type={"radio"}
              name="difficulty"
              value="5"
              onChange={(e) => handleOnChange(e)}
            />
            5
          </div>
          <div className="update-input-duration">
            <label>
              {language
                ? "Duración (entre 1 y 12 horas): "
                : "Duration (Between 1 and 12 hours): "}
            </label>
            <input
              type={"range"}
              name="duration"
              min="0"
              max="12"
              list="tickmarks"
              onChange={(e) => handleOnChange(e)}
            />
            <datalist id="tickmarks">
              <option value="1" />
              <option value="2" />
              <option value="3" />
              <option value="4" />
              <option value="5" />
              <option value="6" />
              <option value="7" />
              <option value="8" />
              <option value="9" />
              <option value="10" />
              <option value="11" />
              <option value="12" />
            </datalist>
            {error.duration && <p className="error-form">{error.duration}</p>}
          </div>
          <div className="update-input-season">
            <label>{language ? "Temporada: " : "Season: "}</label>
            <select
              className="update-activity-season-select"
              name="season"
              onChange={(e) => handleSeason(e)}
            >
              <option>
                {language ? "Seleccione una temporada" : "Select a season"}
              </option>
              <option value="spring">
                {language ? "Primavera" : "Spring"}
              </option>
              <option value="summer">{language ? "Verano" : "Summer"}</option>
              <option value="autumn">{language ? "Otoño" : "Autumn"}</option>
              <option value="winter">{language ? "Invierno" : "Winter"}</option>
            </select>
          </div>
          <div className="update-input-delete-countries">
            <label>
              {language
                ? "¿Borrar países almacenados? "
                : "Delete stored countries? "}
            </label>
            <input
              type={"radio"}
              name="deleteCountries"
              value="yes"
              onChange={(e) => handleOnChange(e)}
            />
            {language ? "Si" : "Yes"}
            <input
              type={"radio"}
              name="deleteCountries"
              value="no"
              onChange={(e) => handleOnChange(e)}
            />
            No
          </div>
          <div className="form-update-input-countries">
            <label className="form-update-input-countries-label">
              {language ? "Países: " : " Countries: "}
              <select
                className="update-countries-list-select"
                onChange={(e) => handleCountry(e)}
              >
                <option>
                  {language ? "Seleccione un país" : "Select a country"}
                </option>
                {countriesNames.sort().map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="update-countries">
            {inputValue.countriesList.map((c) => (
              <div className="update-countries-container" key={c}>
                <h4 className="countries-title">{c}</h4>
                <button
                  className="update-countries-btn"
                  onClick={() => handleDelete(c)}
                >
                  {language ? "Borrar" : "Delete"}
                </button>
              </div>
            ))}
          </div>
          <div className="update-input-submit">
            <button
              className="update-submit-btn"
              type="submit"
              disabled={error.name || error.duration ? true : false}
            >
              {language ? "Actualizar" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
