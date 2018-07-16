import React, { Component } from 'react';
import {connect} from 'react-redux';

import CityComponent from './CityComponent';

import firebase from 'firebase';
require("firebase/database");
let config = require('../DataBase/config.json');
firebase.initializeApp(config, 'CitiesDataFromFireBaseReactComponent');

const CitiesDataFromFireBaseReactComponent = ({selectedCountry, changeDisplay, onAddCountries, selectedCountries,
                                                  onSelectedCountries}) => {
    const ComponentWillMount  = ( ) => {
        let counter = 0;
        if (selectedCountries.length !== 0){
            for (let i=0; i<selectedCountries.length; i++) {
                if (selectedCountries[i].selectedCountry === selectedCountry ){
                    counter++;
                }
            }
        }
        if ((selectedCountry !== "") && (counter < 1)) {
            let cities = [];
            onAddCountries([{name: 'Please wait, the cities are loading...'}]);
            let citiesRef = firebase.database().ref('/result-obj/'+selectedCountry);
            let citiesArr = [];
            citiesRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childData = childSnapshot.val();
                    let childKey = childSnapshot.key;
                    //let dataRef = snapshot.ref;
                    //console.log(childKey);
                    //console.log(childData);
                    citiesArr.push(childData);

                });
                onAddCountries(citiesArr);
                onSelectedCountries(selectedCountry, citiesArr);
            });
            /*ref.once("value")
                .then(function (snapshot) {
                    let citiesInfo = snapshot.child(selectedCountry + '/cities').val();
                    let citiesArr = [];
                    for (let key in citiesInfo){
                        if ( (citiesInfo[key].name !== '-') && (citiesInfo[key].name !== '') ){
                            citiesArr.push(citiesInfo[key].name);
                        }
                    }
                    citiesArr = citiesArr.sort();
                    for (let i = 0; i < citiesArr.length; i++){
                        for (let keyInfo in citiesInfo){
                            if ((cities.length === 0)&&(citiesArr[i] === citiesInfo[keyInfo].name)){
                                cities.push({name: citiesInfo[keyInfo].name, id: citiesInfo[keyInfo].id})
                            }else if ((citiesArr[i] === citiesInfo[keyInfo].name) && (cities[cities.length-1].name !== citiesInfo[keyInfo].name)){
                                cities.push({name: citiesInfo[keyInfo].name, id: citiesInfo[keyInfo].id})
                            }
                        }
                    }
                    onAddCountries(cities);
                    onSelectedCountries(selectedCountry, cities);
                });*/
        }else if ((selectedCountry !== "")){
            for (let i = 0; i < selectedCountries.length; i++){
                if (selectedCountries[i].selectedCountry === selectedCountry){
                    //console.log(selectedCountries[i].selectedCountry);
                    //console.log(selectedCountries[i].cities);
                    onAddCountries(selectedCountries[i].cities);
                }
            }
        }
    };

    return (
        <div className="CountriesList"
             style = {{display: changeDisplay.nonDisplay}}
        >
            {ComponentWillMount()}
            <CityComponent />
        </div>
    );
}

export default connect(
    state => ({
        selectedCountry: state.selectedCountry,
        changeDisplay: state.changeDisplay,
        selectedCountries: state.selectedCountries
    }),
    dispatch => ({
        onAddCountries: (citiesArr) => {
            const payload = citiesArr;
            dispatch({type: "ADD_CITIES_ARR", payload})
        },
        onSelectedCountries: (selectedCountry, cities) => {
            const payload = {
                selectedCountry: selectedCountry,
                cities: cities
            };
            dispatch ({type: 'SELECTED_COUNTRIES', payload})
        }
    })
)(CitiesDataFromFireBaseReactComponent);