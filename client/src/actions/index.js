import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_BY_POPULATION = "FILTER_BY_POPULATION";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const POST_ACTIVITIES = "POST_ACTIVITIES";

function removeAccents(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getCountries() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/countries");
      dispatch({
        type: GET_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const nameToSearch = removeAccents(name);
      const { data } = await axios.get(
        `http://localhost:3001/countries?name=${nameToSearch}`
      );
      dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getById(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/countries/${id}`);
      dispatch({
        type: GET_COUNTRY_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function filterByPopulation(payload) {
  return {
    type: FILTER_BY_POPULATION,
    payload,
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function postActivities(activities) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/activities",
        activities
      );
      dispatch({
        type: POST_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
