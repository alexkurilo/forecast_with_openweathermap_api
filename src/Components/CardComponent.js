import React, { Component } from 'react';
import {connect} from 'react-redux';

import {showTime} from '../Data/data';
import {showWindDirection} from '../Data/data';

import "./DetailForecastComponent.css";

const CardComponent = ({item}) => {
    const showMinTemperature = (item) => {
        if ((item.forecast.main.temp_min)&&(item.forecast.main.temp_min !== item.forecast.main.temp)){
            return (
                <tr>
                    <td>min temperature</td>
                    <td>{item.forecast.main.temp_min} &#176;C</td>
                </tr>
            );
        }
    };

    const showMaxTemperature = (item) => {
        if ((item.forecast.main.temp_max)&&(item.forecast.main.temp_max !== item.forecast.main.temp)){
            return (
                <tr>
                    <td>max temperature</td>
                    <td>{item.forecast.main.temp_max} &#176;C</td>
                </tr>
            );
        }
    };

    const showAtmosphericPressure = (item) => {
        if ((item.forecast.main.pressure)&&(item.forecast.main.pressure !== item.forecast.main.sea_level)&&(item.forecast.main.pressure !== item.forecast.main.grnd_level)){
            return (
                <tr>
                    <td>atmospheric pressure</td>
                    <td>{item.forecast.main.pressure} hPa</td>
                </tr>
            );
        }
    };

    const showAtmosphericPressureSeaLevel = (item) => {
        if (item.forecast.main.sea_level){
            return (
                <tr>
                    <td>atmospheric pressure on the sea level</td>
                    <td>{item.forecast.main.sea_level} hPa</td>
                </tr>
            );
        }
    };

    const showAtmosphericPressureGrndLevel = (item) => {
        if (item.forecast.main.grnd_level){
            return (
                <tr>
                    <td>atmospheric pressure on the ground level</td>
                    <td>{item.forecast.main.grnd_level} hPa</td>
                </tr>
            );
        }
    };

    const showVisibility = (item) => {
        if (item.forecast.visibility){
            return (
                <tr>
                    <td>visibility</td>
                    <td>{item.forecast.visibility} m</td>
                </tr>
            );
        }
    };

    const showHumidity = (item) => {
        if (item.forecast.main.humidity){
            return (
                <tr>
                    <td>humidity</td>
                    <td>{item.forecast.main.humidity} %</td>
                </tr>
            );
        }
    };

    const showWind = (item) => {
        if ((item.forecast.wind.speed) || (item.forecast.wind.deg)){
            return (
                <tr>
                    <td>wind</td>
                    <td>{item.forecast.wind.speed} m/s, {showWindDirection(item.forecast.wind.deg)} </td>
                </tr>
            );
        }
    };

    const showClouds = (item) => {
        if (item.forecast.clouds.all){
            return (
                <tr>
                    <td>clouds</td>
                    <td>{item.forecast.clouds.all} %</td>
                </tr>
            );
        }
    };

    const showRain = (item) => {
        let ending = "3h";
        if (item.forecast.rain){
            return (
                <tr>
                    <td>rain volume for the last 3 hours</td>
                    <td>{Math.ceil(100*item.forecast.rain[ending])/100} mm</td>
                </tr>
            );
        }
    };

    const showSnow = (item) => {
        let ending = "3h";
        if (item.forecast.snow){
            return (
                <tr>
                    <td>snow volume for the last 3 hours</td>
                    <td>{Math.ceil(100*item.forecast.snow[ending])/100} mm </td>
                </tr>
            );
        }
    };

    const showSunrise = (item) => {
        if (item.forecast.sys.sunrise){
            return (
                <tr>
                    <td>sunrise</td>
                    <td>{showTime(item.forecast.sys.sunrise)}, unix, UTC</td>
                </tr>
            );
        }
    };

    const showSunset = (item) => {
        if (item.forecast.sys.sunset){
            return (
                <tr>
                    <td>sunset</td>
                    <td>{showTime(item.forecast.sys.sunset)}, unix, UTC</td>
                </tr>
            );
        }
    };

    return(
        <div className={"Card"}>
            <div className='DescriptionCard'>
                <h2>{item.forecast.main.temp}&#176;C</h2>
                <img    className="iconWeather"
                        src={"http://openweathermap.org/img/w/" + item.forecast.weather[0].icon + ".png"}
                        alt={item.forecast.weather[0].description}
                        title={item.forecast.weather[0].description}
                />
            </div>
            <table>
                <tbody>
                    {showMinTemperature(item)}
                    {showMaxTemperature(item)}
                    {showAtmosphericPressure(item)}
                    {showAtmosphericPressureSeaLevel(item)}
                    {showAtmosphericPressureGrndLevel(item)}
                    {showVisibility(item)}
                    {showHumidity(item)}
                    {showWind(item)}
                    {showClouds(item)}
                    {showRain(item)}
                    {showSnow(item)}
                    {showSunrise(item)}
                    {showSunset(item)}
                </tbody>
            </table>
        </div>
    );
};

export default connect(
    (state) => ({

    }),

    dispatch => ({


    })
)(CardComponent);