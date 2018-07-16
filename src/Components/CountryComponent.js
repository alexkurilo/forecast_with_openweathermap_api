import React, { Component } from 'react';
import {connect} from 'react-redux';

import "./CountryComponent.css";

const CountryComponent = ({countriesObj, displayCountriesComponent, onChangeDisplay, selectedCountry, onSelectCountry,
                              }) => {
    const ShowCityList = (event, item) => {
        onChangeDisplay('none', 'block');
        onSelectCountry(item.countryCode);

    };

    return(
        <div>
            {countriesObj.map((item, index) =>
                <section    className="CountryItem"
                            key = {index}
                            onClick={(event)=>ShowCityList(event, item)}
                >
                    {item.countryName}
                </section>
            )}
        </div>
    );
};


export default connect(
    (state) => ({
        countriesObj: state.countriesObj,
        changeDisplay: state.changeDisplay,
        selectedCountry: state.selectedCountry
    }),

    dispatch => ({
        onChangeDisplay: (display, nonDisplay)=>{
            const payload = {
                display,
                nonDisplay
            };
            dispatch({type: 'CHOOSE_COUNTRY', payload})
        },
        onSelectCountry: (country) => {
            const payload = country;
            dispatch ({type: 'SELECT_COUNTRY', payload})
        }
    })
)(CountryComponent);