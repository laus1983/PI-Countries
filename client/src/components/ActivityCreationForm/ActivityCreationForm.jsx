import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getCountriesNames, postActivities } from "../../actions/index";
import Spinner from "../Spinner/Spinner.jsx";
import "./ActivityCreationForm.css";

export default function ActivityCreationForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const countriesNames = useSelector((state) => state.countriesNames);
  const language = useSelector((state) => state.language);
  const isLoading = useSelector((state) => state.isLoading);
  const darkMode = useSelector((state) => state.darkMode);

  function validate(input) {
    let error = {};
    if (!input.name) {
      error.name = language
        ? "Se requiere el nombre de la actividad"
        : "Activity name is required";
    }
    if (!input.duration) {
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

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesList: [],
  });

  useEffect(() => {
    dispatch(getCountriesNames());
  }, [dispatch]);

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCountry(e) {
    setInput({
      ...input,
      countriesList: [...input.countriesList, e.target.value],
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countriesList: input.countriesList.filter((c) => c !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivities(input, language));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countriesList: [],
    });
    alert(language ? "Actividad creada!" : "Activity created!");
    history.goBack();
  }

  return (
    <div
      className={darkMode ? "tourist-activities-dark" : "tourist-activities"}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="form-img-container"></div>
          <form
            className={darkMode ? "activities-form-dark" : "activities-form"}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div
              className={
                darkMode
                  ? "title-activities-form-dark"
                  : "title-activities-form"
              }
            >
              <h2>
                {language
                  ? "Formulario de Creación de Actividades"
                  : "Activity Creation Form"}
              </h2>
            </div>
            <div className="form-input-name">
              <label>
                {language ? "Actividad turística: " : "Tourist Activity: "}
              </label>
              <input
                className={darkMode ? "form-name-box-dark" : "form-name-box"}
                type={"text"}
                name="name"
                value={input.name}
                placeholder={language ? "Nombre..." : "Name..."}
                onChange={(e) => handleOnChange(e)}
              />
              {error.name && <p className="error-form">{error.name}</p>}
            </div>
            <div className="form-input-difficulty">
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
            <div className="form-input-duration">
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
            <div className="form-input-season">
              <label>{language ? "Temporada: " : "Season: "}</label>
              <select
                className={
                  darkMode ? "form-season-select-dark" : "form-season-select"
                }
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
                <option value="winter">
                  {language ? "Invierno" : "Winter"}
                </option>
              </select>
            </div>
            <div className="form-input-countries">
              <label>
                {language ? "Países: " : " Countries: "}
                <select
                  className={
                    darkMode ? "countries-list-dark" : "countries-list"
                  }
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
            <div
              className={
                darkMode
                  ? "form-country-activities-dark"
                  : "form-country-activities"
              }
            >
              {input.countriesList.map((c) => (
                <div
                  className={darkMode ? "form-country-dark" : "form-country"}
                  key={c}
                >
                  <h4 className="countries-title">{c}</h4>
                  <button
                    className={darkMode ? "delete-btn-dark" : "delete-btn"}
                    onClick={() => handleDelete(c)}
                  >
                    {language ? "Borrar" : "Delete"}
                  </button>
                </div>
              ))}
            </div>
            <div className="form-input-submit">
              <button
                className={darkMode ? "create-btn-dark" : "create-btn"}
                type="submit"
                disabled={error.name || error.duration ? true : false}
              >
                {language ? "Crear" : "Create"}
              </button>
            </div>
            <div className="back-btn">
              <NavLink to="/activities/options" className="back-btn-link">
                <button
                  className={darkMode ? "go-back-btn-dark" : "go-back-btn"}
                >
                  {language ? "⬅ Regresar" : "⬅ Back"}
                </button>
              </NavLink>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
