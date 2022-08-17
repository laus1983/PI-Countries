/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from "react-redux";
import "./PaginationActivities.css";

export default function Pagination({
  activitiesByPage,
  activitiesList,
  pagesToShow,
  currentPage,
}) {
  const pageNumbers = [];
  const language = useSelector((state) => state.language);

  for (let i = 1; i <= Math.ceil(activitiesList / activitiesByPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-Activities-container">
      <nav className="pagination-activities-nav">
        <button
          className="prev-nav-act-btn"
          onClick={() =>
            (currentPage = currentPage - 1 && pagesToShow(currentPage - 1))
          }
        >
          {language ? "ANT" : "PREV"}
        </button>
        <ul className="pages-activities">
          {pageNumbers &&
            pageNumbers.map((number) => {
              return (
                <li key={number} className="page-number-activities">
                  <a
                    className="paginacion-act-a"
                    onClick={() => pagesToShow(number)}
                  >
                    {number}
                  </a>
                </li>
              );
            })}
        </ul>
        <button
          className="next-nav-act-btn"
          onClick={() =>
            (currentPage = currentPage + 1 && pagesToShow(currentPage + 1))
          }
        >
          {language ? "SIG" : "NEXT"}
        </button>
      </nav>
      <p className="page-position-activities">
        {language
          ? `Página ${currentPage} de ${pageNumbers.length === 0 ? 1 : pageNumbers.length}`
          : `Page ${currentPage} of ${
              pageNumbers.length === 0 ? 1 : pageNumbers.length
            }`}
      </p>
    </div>
  );
}
