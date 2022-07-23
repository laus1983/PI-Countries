import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const POST_ACTIVITIES = "POST_ACTIVITIES";

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
      const { data } = await axios.get(
        `http://localhost:3001/countries?name=${name}`
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

export function postActivities(activities) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/activities",
        activities
      );
      dispatch ({
        type: POST_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
