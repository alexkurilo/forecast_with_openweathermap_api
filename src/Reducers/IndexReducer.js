import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import citiesInform from "./FillStoresWithCitiesReducer";
import countriesObj from "./AddCountriesReducer";
import changeDisplay from "./ChooseCountryReducer";
import selectedCountry from "./SelectCountryReducer";
import selectedCountries from "./SelectedCountriesReducer";
import citiesArr from "./AddCitiesReducer";
import selectedCity from "./SelectCityReducer";
import selectedCities from "./SelectedCitiesReducer";
import forecastInfo from "./ForecastReducer";
import forecastInfoDetail from "./ForecastDetailReducer";
import page from "./PageReducer";
import indexFocusCard from "./FocusCardReducer";
import styleMiniCardArr from "./StyleMiniCardArrReducer";

export default combineReducers({
    routing: routerReducer,
    citiesInform,
    countriesObj,
    changeDisplay,
    selectedCountry,
    selectedCountries,
    citiesArr,
    selectedCity,
    selectedCities,
    forecastInfo,
    forecastInfoDetail,
    page,
    indexFocusCard,
    styleMiniCardArr
})
