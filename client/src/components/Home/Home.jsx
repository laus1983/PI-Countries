import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions/index.js";
import Card from "../Card/Card"
import Pagination from "../Pagination/Pagination.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesByPage, /*setCountriesByPage*/] = useState(10);


  const lastIndex = currentPage * countriesByPage;
  const firstIndex = lastIndex - countriesByPage;
  const currentCountry = allCountries.slice(
    firstIndex,
    lastIndex
  );

  const pagesToShow = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(()=> {
    dispatch(getCountries());
  }, [dispatch])

  // function handleClick(event){
  //console.log(countries);
  //   event.preventDefault();
  //   dispatch(getCountries());
  //   // window.location.reload();
  // }

  return (
  <div className="home">
    <div>
    <SearchBar setCurrentPage={setCurrentPage}/>
    {/* <button onClick= {()=> dispatch(getCountries())}>Load</button> */}
    </div>
    <div className="cards">
      {currentCountry.map(e =>{
        return (<Card
        key={e.id}
        id={e.id}
        name={e.name}
        flag={e.flag}
        continent={e.continent}
        />)
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
  )
}
