/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from "react-redux";
import "./Pagination.css";

export default function Pagination({
  countriesByPage,
  allCountries,
  pagesToShow,
  currentPage,
}) {
  const pageNumbers = [];
  const darkMode = useSelector((state) => state.darkMode);

  for (let i = 1; i <= Math.ceil(allCountries / countriesByPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={darkMode ? "pagination-nav-dark" : "pagination"}>
    <button
        className={darkMode ? "prev-nav-btn-dark" : "prev-nav-btn"}
        onClick={() => currentPage=currentPage-1 && pagesToShow(currentPage-1)}
      >
        PREV
      </button>
      <ul className="pages">
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li key={number} className={darkMode ? "page-number-dark" : "page-number"}>
                <a className="paginacion" onClick={() => pagesToShow(number)}>
                  {number}
                </a>
              </li>
            );
          })}
      </ul>
      <button
        className={darkMode ? "next-nav-btn-dark" : "next-nav-btn"}
        onClick={() => currentPage=currentPage+1 && pagesToShow(currentPage+1)}
      >
        NEXT
      </button>
    </nav>
  );
}
