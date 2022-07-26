import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRY_BY_ID,
  ORDER_BY_NAME,
  FILTER_BY_POPULATION,
  FILTER_BY_CONTINENT,
  COUNTRIES_BY_ACTIVITIES,
  GET_ACTIVITIES,
  POST_ACTIVITIES,
} from "../actions/index";

const initialState = {
  countries: [],
  continentsFilter: [],
  countryDetails: {},
  activities: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        continentsFilter: action.payload,
      };
    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        // country: action.payload,
        countries: action.payload,
      };
    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        countryDetails: action.payload,
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
      console.log(actToRender);
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
    default:
      return state;
  }
}

export default rootReducer;
