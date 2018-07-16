import React, { Component } from 'react';
import CountriesDataFromFireBaseReactComponent from './CountriesDataFromFireBaseReactComponent';
import CitiesDataFromFireBaseReactComponent from "./CitiesDataFromFireBaseReactComponent";
import ForecastCardComponent from "./ForecastCardComponent";

import "./ForecastComponent.css";

class ForecastComponent extends Component {
    render() {
        return (
            <div className="ForecastComponent">
                <CountriesDataFromFireBaseReactComponent/>
                <CitiesDataFromFireBaseReactComponent/>
                <ForecastCardComponent/>
            </div>
        );
    }
}

export default ForecastComponent;