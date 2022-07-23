import {
    GET_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    GET_COUNTRY_BY_ID,
    POST_ACTIVITIES,
} from "../actions/index";

const initialState = {
    countries: [],
    country: {},
    countryDetails: {},
    activities: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            };
        case GET_COUNTRIES_BY_NAME:
            return {
                ...state,
                country: action.payload,
            };
        case GET_COUNTRY_BY_ID:
            return {
                ...state,
                countryDetails: action.payload,
            };
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