import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import {
  getCountries,
  orderByName,
  filterByPopulation,
  filterByContinent,
  countriesByActivities,
  getActivities,
} from "../../actions/index.js";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Spinner from "../Spinner/Spinner.jsx";
// import LanguageSwitch from "../LanguageSwitch/LanguageSwitch.jsx";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activitiesList = useSelector((state) => state.activities);
  const language = useSelector((state) => state.language);
  const isLoading = useSelector((state) => state.isLoading);
  const darkMode = useSelector((state) => state.darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesByPage /*setCountriesByPage*/] = useState(10);
  const [, /*inOrder*/ setInOrder] = useState("");


  const lastIndex = currentPage * countriesByPage;
  const firstIndex = lastIndex - countriesByPage;
  const currentCountry = allCountries.slice(firstIndex, lastIndex);

  let activitiesRender = [];
  try {let activitiesArray =
    activitiesList && activitiesList.map((act) => act.name).sort();
  for (let i = 0; i < activitiesArray.length; i++) {
    if (activitiesArray[i] !== activitiesArray[i + 1]) {
      activitiesRender.push(activitiesArray[i]);
    }
  }} catch (error) {
    // console.log(activitiesRender);
    // console.log(error);
  }

  const pagesToShow = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleOnClick(event) {
    event.preventDefault();
    dispatch(getCountries());
    window.location.reload();
  }

  function handleSort(event) {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setInOrder(event.target.value);
  }

  function handleFilterSort(event) {
    event.preventDefault();
    dispatch(filterByPopulation(event.target.value));
    setCurrentPage(1);
    setInOrder(event.target.value);
  }

  function handleContinentSort(event) {
    event.preventDefault();
    dispatch(filterByContinent(event.target.value));
    setCurrentPage(1);
    // setInOrder(event.target.value);
  }

  function handleActivitiesSort(event) {
    event.preventDefault();
    dispatch(countriesByActivities(event.target.value));
    setCurrentPage(1);
    setInOrder(event.target.value);
  }

  return (
    <div className={darkMode ? "home-dark" : "home"}>
      { isLoading ? (
        <div className="loading-spinner">
        <Spinner />
        </div>
      ) : (<>{/* <div className="language-switch">
        <LanguageSwitch />
      </div> */}
      <div className="search-bar">
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div className={darkMode ? "filters-dark" : "filters"}>
        <div className="filters-title">
          {language ? <h3>Filtrar por: </h3> : <h3>Filter by: </h3>}
        </div>
        <div className="alphabetically">
          <select onChange={(event) => handleSort(event)} className={darkMode ? "alpha-dark" : "alpha"}>
            <option>{language ? "Alfabéticamente" : "Alphabetically"}</option>
            <option value="asc">{language ? "Ascendente" : "Ascending"}</option>
            <option value="desc">
              {language ? "Descendente" : "Descending"}
            </option>
          </select>
        </div>
        <div className="population">
          <select onChange={(event) => handleFilterSort(event)} className={darkMode ? "pop-dark" : "pop"}>
            <option>{language ? "Población" : "Population"}</option>
            <option value="less">{language ? "Menor" : "Less than"}</option>
            <option value="more">{language ? "Mayor" : "More than"}</option>
          </select>
        </div>
        <div className="continents">
          <select
            onChange={(event) => handleContinentSort(event)}
            className={darkMode ? "cont-dark" : "cont"}
          >
            <option>{language ? "Continentes" : "Continents"}</option>
            <option value="Africa">{language ? "África" : "Africa"}</option>
            <option value="Antarctica">
              {language ? "Antártida" : "Antartica"}
            </option>
            <option value="Asia">Asia</option>
            <option value="Europe">{language ? "Europa" : "Europe"}</option>
            <option value="North America">
              {language ? "Norteamérica" : "North America"}
            </option>
            <option value="Oceania">{language ? "Oceanía" : "Oceania"}</option>
            <option value="South America">
              {language ? "Sudamérica" : "South America"}
            </option>
          </select>
        </div>
        <div className="activities-filter">
          <select
            onChange={(event) => handleActivitiesSort(event)}
            className={darkMode ? "act-dark" : "act"}
          >
            <option value={"all"}>
              {language ? "Actividades" : "Activities"}
            </option>
            if (activitiesRender.length === 0)
            {
              <p className="form-link">
                {language ? "No hay actividades." : "There are no activities."}
              </p>
            }
            {/* {
              <NavLink to="/activities" className="activities-form">
                <p className="form-link">
                  There are no activities.
                </p>
              </NavLink>
            } */}
            {activitiesRender &&
              activitiesRender.map((act) => {
                return (
                  <option key={act} value={act}>
                    {act}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="clear-filters">
          <button
            className={darkMode ? "clear-filters-btn-dark" : "clear-filters-btn"}
            onClick={(event) => {
              handleOnClick(event);
            }}
          >
            {language ? "Borrar filtros" : "Clear filters"}
          </button>
        </div>
      </div>
      <div className="cards">
        {typeof currentCountry === "string" ?
        <Redirect to="/notfound" />
        :
        currentCountry.map((e) => {
          return (
            <Card
              key={e.id}
              id={e.id}
              name={language ? e.nameSpa : e.name}
              flag={e.flag}
              continent={e.continent}
            />
          );
        })}
      </div>
      <div className={darkMode ? "pagination-dark" : "pagination"}>
        <Pagination
          countriesByPage={countriesByPage}
          allCountries={allCountries.length}
          pagesToShow={pagesToShow}
        />
      </div></>)}
    </div>
  );
}
