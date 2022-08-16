import { loadState } from "../localStorage";
import {
  LOADING,
  SWITCH_LANGUAGE,
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRY_BY_ID,
  GET_COUNTRIES_NAMES,
  ORDER_BY_NAME,
  FILTER_BY_POPULATION,
  FILTER_BY_CONTINENT,
  COUNTRIES_BY_ACTIVITIES,
  GET_ACTIVITIES,
  POST_ACTIVITIES,
  DELETE_ACTIVITY,
  UPDATE_ACTIVITY,
  DARK_MODE,
} from "../actions/index";

export const persistedState = loadState();

const initialState = {
  countries: [],
  countriesNames: [],
  continentsFilter: [],
  countryDetails: {},
  activities: [],
  language: true,
  isLoading: false,
  darkMode: false,
  persistedState,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SWITCH_LANGUAGE:
      const options = action.payload === 'en' ? false : true;
      return {
        ...state,
        language: options,
      };
      case DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        continentsFilter: action.payload,
        isLoading: false,
      };
    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        countries: action.payload,
        isLoading: false,
      };
    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        countryDetails: action.payload,
        isLoading: false,
      };
    case GET_COUNTRIES_NAMES:
      const language = state.language;
      const namesOfCountries = language ? action.payload.map((c) => c.nameSpa) : action.payload.map((c) => c.name);
      return {
        ...state,
        countriesNames: namesOfCountries,
      };
    case ORDER_BY_NAME:
      let orderedCountries =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: orderedCountries,
      };
    case FILTER_BY_POPULATION:
      let sortedByPopulation =
        action.payload === "less"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedByPopulation,
      };
    case FILTER_BY_CONTINENT:
      let countriesList = state.continentsFilter;
      let filteredByContinent =
        action.payload === "all"
          ? countriesList
          : countriesList.filter((c) => c.continent === action.payload);
      return {
        ...state,
        countries: filteredByContinent,
      };
    case COUNTRIES_BY_ACTIVITIES:
      const filteredBycountries = state.countries;
      const filteredByActivities = state.activities;
      const actFiltered = action.payload === "all" ? filteredBycountries : filteredByActivities.filter((c) => c.name === action.payload);
      const actToRender = action.payload === "all" ? filteredBycountries : actFiltered.map((c) => c.Countries);
      const aux = actToRender.flat();
      return {
        ...state,
        countries: aux,
      };
      case GET_ACTIVITIES:
        return{
          ...state,
          activities: action.payload,
        }
    case POST_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
      case DELETE_ACTIVITY:
        return {
          ...state,
          activities: action.payload,
        };
        case UPDATE_ACTIVITY:
          return {
            ...state,
            activities: action.payload,
          };
    default:
      return state;
  }
}

export default rootReducer;
