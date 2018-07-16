import React, { Component } from 'react';
import {connect} from 'react-redux';

// Firebase App is always required and must be first
import firebase from 'firebase';
// Add additional services you want to use
require("firebase/database");
// Comment out (or don't require) services you don't want to use
let config = {
    apiKey: "AIzaSyCzeH91zL1Ms0XVuQBpj56iJy33W9B6cxg",
    authDomain: "forecast-with-openweathermap.firebaseapp.com",
    databaseURL: "https://forecast-with-openweathermap.firebaseio.com",
    projectId: "forecast-with-openweathermap",
    storageBucket: "forecast-with-openweathermap.appspot.com",
    messagingSenderId: "30889185514"
};
firebase.initializeApp(config);
let rootRef = firebase.database().ref();

let countryObj = {};

const CountriesComponent = ({onFillStoresWithCities, citiesInform}) => {

    const ShowCityList = (event, item) => {

    };


    return(
        <div>
            {/*{FillStoresWithCities()}*/}
            <section className="CountriesList">
                {Object.keys(citiesInform).map((item, index) =>
                    <section    className="CountryItem"
                                key={index}
                                onClick={(event)=>ShowCityList(event, item)}
                    >
                        {item}
                    </section>
                )}
            </section>

        </div>
    );
};


export default connect(
    (state) => ({
        citiesInform: state.citiesInform
    }),

    dispatch => ({
        onFillStoresWithCities: (citiesInform) => {
            const payload = citiesInform;
            dispatch({type: "FILL_STORES_WITH_CITIES", payload})
        }
    })
)(CountriesComponent);