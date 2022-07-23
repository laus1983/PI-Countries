/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Pagination.css";

export default function Pagination({
  countriesByPage,
  allCountries,
  pagesToShow,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesByPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      <ul className="pages">
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li key={number} className="page-number">
                <a className="paginacion" onClick={() => pagesToShow(number)}>
                  {number}
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
