import React, { Component } from 'react';
import {connect} from 'react-redux';

import {asyncGetForecast} from "../AsyncActions/AsyncGetForecastAction";

import CountryComponent from "./CountryComponent";
import "./CountriesDataFromFireBaseReactComponent.css";

import firebase from 'firebase';
import {config1} from '../Data/data';
require("firebase/database");
firebase.initializeApp(config1);

class CountriesDataFromFireBaseReactComponent extends Component {
    constructor(props) {
        super(props);
        //this.OnClick = this.OnClick.bind(this);
    }

    componentWillMount ( ) {
        let myThis = this;
        if (myThis.props.countriesObj.length === 0){
            let countryRef = firebase.database().ref('/new-code-list');
            countryRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childData = childSnapshot.val();
                    //let childKey = childSnapshot.key;
                    //let dataRef = snapshot.ref;
                    //console.log(childData);
                    myThis.props.onAddCountries(childData.name, childData.code);
                });
            });
        }
    }

    render() {
        return (
            <div className="CountriesList"
                 style = {{display: this.props.changeDisplay.display}}
            >
                <CountryComponent />
            </div>
        );
    }
}

export default connect(
    state => ({
        countriesObj: state.countriesObj,
        changeDisplay: state.changeDisplay,
        selectedCountries: state.selectedCountries
    }),
    dispatch => ({
        onAddCountries: (countryName, countryCode)=>{
            const countryObj = {
                countryName,
                countryCode
            };
            dispatch({type: 'ADD_COUNTRIES_OBJ', countryObj})
        }
    })
)(CountriesDataFromFireBaseReactComponent);