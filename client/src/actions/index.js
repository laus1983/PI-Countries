import axios from "axios";

export const LOADING = "LOADING";
export const SWITCH_LANGUAGE = "SWITCH_LANGUAGE"
export const DARK_MODE = "DARK_MODE"
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const GET_COUNTRIES_NAMES = "GET_COUNTRIES_NAMES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_BY_POPULATION = "FILTER_BY_POPULATION";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const COUNTRIES_BY_ACTIVITIES = "COUNTRIES_BY_ACTIVITIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const POST_ACTIVITIES = "POST_ACTIVITIES";

export function removeAccents(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function loading() {
  return {
    type: LOADING
  };
}

export function switchLanguage(payload) {
  return {
    type: SWITCH_LANGUAGE,
    payload,
  }
}

export function darkModeAction() {
  return {
    type: DARK_MODE,
  }
}

export function getCountries() {
  return async function (dispatch) {
    dispatch(loading());
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

export function getByName(name, language) {
  return async function (dispatch) {
    dispatch(loading());
    try {
      const nameToSearch = language ? removeAccents(name) : name.toLowerCase();
      const languageString = language.toString();
      const { data } = await axios.get(
        `http://localhost:3001/countries?name=${nameToSearch}&language=${languageString}`
      );
      dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: data,
      });
    } catch (error) {
      // console.log(error);
    }
  };
}

export function getById(id) {
  return async function (dispatch) {
    dispatch(loading());
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

export function getCountriesNames() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/countries");
      dispatch({
        type: GET_COUNTRIES_NAMES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }
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

export function countriesByActivities(payload) {
  return {
    type: COUNTRIES_BY_ACTIVITIES,
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

export function getActivities() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/activities");
      return dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    } catch (err) {
      console.log(err)
    }
  };
}
