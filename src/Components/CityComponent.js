import React, { Component } from 'react';
import {connect} from 'react-redux';
//import selectedCountry from "../Reducers/SelectCountryReducer";

import {asyncGetForecast} from "../AsyncActions/AsyncGetForecastAction";


const CityComponent = ({citiesArr, onChangeDisplay, onSelectCity, onSelectedCities, selectedCities, selectedCountry,
                           countriesObj, onGetForecast, onUpdateSelectedCities, onUpdateForecast}) => {
    const ShowCity = (event, item) => {
        let reSelected;
        onSelectCity(item.id);
        onChangeDisplay('block', 'none');
        for (let i = 0; i < selectedCities.length; i++){
            if (selectedCities[i].selectedCity === item.name){
                reSelected = i;
            }
        }

        if (reSelected !== undefined){
            for (let key in countriesObj){
                if (countriesObj[key].countryCode === selectedCountry){
                    let countryCode = countriesObj[key].countryCode.toLowerCase();
                    onSelectedCities(item.name, item.id , countryCode);
                    onUpdateForecast(item.name, item.id , countryCode, reSelected);
                }
            }
        }else{
            for (let key in countriesObj){
                if (countriesObj[key].countryCode === selectedCountry){
                    let countryCode = countriesObj[key].countryCode.toLowerCase();
                    onSelectedCities(item.name, item.id , countryCode);
                    onGetForecast(item.name, item.id , countryCode);
                }
            }
        }
        console.log(selectedCities);
    };

    return(
        <div>
            {citiesArr.map((item, index) =>
                <section    className="CountryItem"
                            key = {index}
                            onClick={(event)=>ShowCity(event, item)}
                >
                    {item.name}
                </section>
            )}
        </div>
    );
};


export default connect(
    (state) => ({
        citiesArr: state.citiesArr,
        selectedCities: state.selectedCities,
        selectedCountry: state.selectedCountry,
        countriesObj: state.countriesObj
    }),

    dispatch => ({
        onChangeDisplay: (display, nonDisplay)=>{
            const payload = {
                display,
                nonDisplay
            };
            dispatch({type: 'CHOOSE_COUNTRY', payload})
        },
        onSelectCity: (city) => {
            const payload = city;
            dispatch ({type: 'SELECT_CITY', payload})
        },
        onSelectedCities: (selectedCity, selectedCityId, selectedCountryCode) => {
            const payload = {
                selectedCity: selectedCity,
                selectedCityId: selectedCityId,
                selectedCountryCode: selectedCountryCode
            };
            dispatch ({type: 'SELECTED_CITIES', payload})
        },
        onGetForecast: ( cityName, cityId, countryCode) => {
            dispatch(asyncGetForecast( cityName, cityId, countryCode));
        },
        /*onUpdateSelectedCities: (selectedCity, selectedCityId, selectedCountryCode, reSelected) => {
            const payload = {
                selectedCity: selectedCity,
                selectedCityId: selectedCityId,
                selectedCountryCode: selectedCountryCode,
                reSelected: reSelected
            };
            dispatch ({type: 'UPDATE_SELECTED_CITIES', payload})
        },*/
        onUpdateForecast: ( cityName, cityId, countryCode, reSelected) => {
            dispatch(asyncGetForecast( cityName, cityId, countryCode, reSelected));
        },
    })
)(CityComponent);