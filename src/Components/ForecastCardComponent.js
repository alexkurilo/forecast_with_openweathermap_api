import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import CardComponent from "./CardComponent";

import {CountryName} from '../Data/data';

import "./ForecastCardComponent.css";
import "./Accordion.css"

import {asyncGetForecastDetail} from "../AsyncActions/AsyncGetForecastDetailAction";

const ForecastCardComponent = ({selectedCities, forecastInfo, onGetForecastDetail, countriesObj, onDeleteCard}) => {
    const GetForecast = (event, cityName, cityId, countryCode, index, item) => {
        onGetForecastDetail(cityName, cityId, countryCode, index, item);
    };

    const ForecastButtonClass = (item) => {
        if (item.forecast.weather[0].icon[item.forecast.weather[0].icon.length-1] === "d"){
            return "ForecastButtonDay";
        }else{
            return "ForecastButtonNight";
        }
    };

    const ForecastCardClass = (item) => {
        if (item.forecast.weather[0].icon[item.forecast.weather[0].icon.length-1] === "d"){
            return "ForecastCardDay";
        }else{
            return "ForecastCardNight";
        }
    };

    const DeleteCard = (event, index) => {
        event.stopPropagation();
        onDeleteCard(index);
    };

    const Click = (event, index) => {
        event.stopPropagation();
        document.getElementById('accordion'+index).classList.toggle("active");
        document.getElementById('accordion'+index).nextElementSibling.classList.toggle("show");

    };

    return(
        <div className="ForecastCardArr">
            {forecastInfo.map((item, index)=>
                <div className="ForecastCardComponent"
                     key={index}>
                    <div>
                        <button className={"accordion "+ForecastButtonClass(forecastInfo[index])}
                                id={'accordion'+index}
                                onClick={(event) => {Click(event, index)}}>
                            <div className="HeaderCard">
                                <h3>{index+1}. Weather in {forecastInfo[index].forecast.name}, {CountryName(forecastInfo[index].forecast.sys.country, countriesObj)}.</h3>
                                <section className={'HeaderCardDescription'}>
                                    <h4> temp.: {item.forecast.main.temp}&#176;C</h4>
                                    <img    className="iconWeather"
                                            src={"http://openweathermap.org/img/w/" + item.forecast.weather[0].icon + ".png"}
                                            alt={item.forecast.weather[0].description}
                                            title={item.forecast.weather[0].description}
                                    />
                                </section>
                                <img    className="cityCard-header-closeButton"
                                        src="https://png.icons8.com/nolan/64/000000/delete-sign.png"
                                        alt="delete this card"
                                        style = {{  width: 30,
                                            height: 30}}
                                        onClick={(event) => DeleteCard(event, index)}
                                        title="delete this card"
                                />
                            </div>
                        </button>
                        <div className={"panel "+ForecastCardClass(forecastInfo[index])}>
                            <CardComponent  item = {item}
                                            index = {index}
                            />
                            <ul>
                                <li
                                >
                                    <Link   to={'/detail_forecast_in_'+forecastInfo[index].forecast.name}
                                            onClick={(event) => GetForecast(event, forecastInfo[index].forecast.name,
                                                selectedCities[index].selectedCityId,
                                                forecastInfo[index].forecast.sys.country,
                                                index, item)}
                                            title="show detailed weather forecast for this city for the next five days"
                                    >
                                        Show detail forecast in {forecastInfo[index].forecast.name}, {CountryName(forecastInfo[index].forecast.sys.country, countriesObj)}.
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default connect(
    (state) => ({
        selectedCities: state.selectedCities,
        forecastInfo: state.forecastInfo,
        countriesObj: state.countriesObj
    }),

    dispatch => ({
        onDeleteCard: (index) => {
            const payload = index;
            console.log(payload);
            dispatch ({type: "ON_DELETE_CARD", payload})
        },
        onGetForecastDetail: ( cityName, cityId, countryCode, index, item) => {
            dispatch(asyncGetForecastDetail( cityName, cityId, countryCode, index, item));
        }
    })
)(ForecastCardComponent);