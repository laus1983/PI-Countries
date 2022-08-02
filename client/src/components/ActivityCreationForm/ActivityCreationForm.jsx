import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getCountriesNames, postActivities } from "../../actions/index";

function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Activity name is required";
  }
  if (!input.duration) {
    error.duration = "The duration of the activity is required";
  }
  return error;
}

export default function ActivityCreationForm() {
  const dispatch = useDispatch();
  const history = useHistory();


  const countriesNames = useSelector((state) => state.countriesNames);
  const language = useSelector((state) => state.language);

  const [error, setError] = useState({
    name: "Activity name is required",
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
    // setError(validate({
    //   ...input,
    //   [e.target.name]: e.target.value,
    // }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivities(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countriesList: [],
    });
    alert("Activity created!");
    // navigate("/countries");
    history.goBack();
  }

  return (
    <div className="tourist-activities">
      <div className="title-activities-form">
        <h1>
          {language
            ? "Formulario de Creación de Actividades"
            : "Activity Creation Form"}
        </h1>
      </div>
      <form className="activities-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-input-name">
          <label>
            {language ? "Actividad turística: " : "Tourist Activity: "}
          </label>
          <input
            type={"text"}
            name="name"
            value={input.name}
            placeholder="Name"
            onChange={(e) => handleOnChange(e)}
          />
          {error.name && <p className="error">{error.name}</p>}
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
            // value="0"
            list="tickmarks"
            // placeholder="Duration (min: 1 / max: 12 hours)"
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
          {error.duration && <p className="error">{error.duration}</p>}
        </div>
        <div className="form-input-season">
          <label>{language ? "Temporada: " : "Season: "}</label>
          <select name="season" onChange={(e) => handleSeason(e)}>
            <option>
              {language ? "Seleccione una temporada" : "Select a season"}
            </option>
            <option value="spring">{language ? "Primavera" : "Spring"}</option>
            <option value="summer">{language ? "Verano" : "Summer"}</option>
            <option value="autumn">{language ? "Otoño" : "Autumn"}</option>
            <option value="winter">{language ? "Invierno" : "Winter"}</option>
          </select>
        </div>
        <div className="form-input-countries">
          <label>
            {language ? "Países" : " Countries:"}
            <select
              className="countries-list"
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
        {input.countriesList.map((c) => (
          <div className="form-country" key={c}>
            <h4 className="countries-title">{c}</h4>
            <button className="delete-btn" onClick={() => handleDelete(c)}>
              {language ? "Borrar" : "Delete"}
            </button>
          </div>
        ))}
        <div className="form-input-submit">
          <button
            className="create-btn"
            type="submit"
            disabled={error.name || error.duration ? true : false}
          >
            {language ? "Crear" : "Create"}
          </button>
        </div>
      </form>
      <div className="back-btn">
        <NavLink to="/countries" className="back-btn">
          <button>{language ? "⬅ Regresar" : "⬅ Back"}</button>
        </NavLink>
      </div>
    </div>
  );
}
