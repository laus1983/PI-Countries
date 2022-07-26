import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activitiesList = useSelector((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesByPage /*setCountriesByPage*/] = useState(10);
  const [, /*inOrder*/ setInOrder] = useState("");

  const lastIndex = currentPage * countriesByPage;
  const firstIndex = lastIndex - countriesByPage;
  const currentCountry = allCountries.slice(firstIndex, lastIndex);

  let activitiesArray =
    activitiesList && activitiesList.map((act) => act.name).sort();
  let activitiesRender = [];
  for (let i = 0; i < activitiesArray.length; i++) {
    if (activitiesArray[i] !== activitiesArray[i + 1]) {
      activitiesRender.push(activitiesArray[i]);
    }
  }

  const pagesToShow = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleOnClick(event){
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
    <div className="home">
      <div>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div className="filters">
        <div className="filters-title">
          <h3>Filter by: </h3>
        </div>
        <div className="alphabetically">
          <select onChange={(event) => handleSort(event)} className="alpha">
            <option>Alphabetically</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="population">
          <select onChange={(event) => handleFilterSort(event)} className="pop">
            <option>Population</option>
            <option value="less">Less than</option>
            <option value="more">More than</option>
          </select>
        </div>
        <div className="continents">
          <select
            onChange={(event) => handleContinentSort(event)}
            className="cont"
          >
            <option>Continents</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antartica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
          </select>
        </div>
        <div className="activities-filter">
          <select
            onChange={(event) => handleActivitiesSort(event)}
            className="act"
          >
            <option value={"all"}>Activities</option>
            if (activitiesRender.length === 0){<p className="form-link">There are no activities.</p>}
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
          <button className="clear-filters-btn" onClick={(event) => {handleOnClick(event)}}>Clear filters</button>
        </div>
      </div>
      <div className="cards">
        {currentCountry?.map((e) => {
          return (
            <Card
              key={e.id}
              id={e.id}
              name={e.name}
              flag={e.flag}
              continent={e.continent}
            />
          );
        })}
      </div>
      <div className="pagination">
        <Pagination
          countriesByPage={countriesByPage}
          allCountries={allCountries.length}
          pagesToShow={pagesToShow}
        />
      </div>
    </div>
  );
}
