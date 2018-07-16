import React, { Component } from 'react';
import {connect} from 'react-redux';


import "./MiniCardComponent.css";

const MiniDetailCardComponent = ({minInform, indexFocusCard, index, styleMiniCardArr}) => {
    const showMinTemperature = (obj) => {
        if ((obj.temp_min)&&(obj.temp_min !== minInform.temperature)){
            return (
                <tr>
                    <td>min temp.</td>
                    <td>{obj.temp_min}&#176;C</td>
                </tr>
            );
        }
    };

    const showMaxTemperature = (obj) => {
        if((obj.temp_max)&&(obj.temp_max !== minInform.temperature)){
            return (
                <tr>
                    <td>max temp.</td>
                    <td>{obj.temp_max}&#176;C</td>
                </tr>
            );
        }
    };

    const showAtmosphericPressure = (obj) => {
        if ((obj.pressure !== obj.grnd_level) && (obj.pressure !== obj.sea_level)){
            return (
                <tr>
                    <td>atm. press.</td>
                    <td>{obj.pressure}hPa</td>
                </tr>
            );
        }
    };

    const showAtmosphericPressureSeaLevel = (obj) => {
        if (obj.sea_level){
            return (
                <tr>
                    <td>atm. press. on the sea level</td>
                    <td>{obj.sea_level}hPa</td>
                </tr>
            );
        }
    };

    const showAtmosphericPressureGrndLevel = (obj) => {
        if (obj.grnd_level){
            return (
                <tr>
                    <td>atm. press. on the ground level</td>
                    <td>{obj.grnd_level}hPa</td>
                </tr>
            );
        }
    };

    const showHumidity = (obj) => {
        return (
            <tr>
                <td>humidity</td>
                <td>{obj.humidity} %</td>
            </tr>
        );
    };

    const showWind = (obj) => {
        return (
            <tr>
                <td>wind</td>
                <td>{obj.windSpeed}m/s, {obj.windDirection}</td>
            </tr>
        );
    };

    const showClouds = (obj) => {
        if (obj.clouds){
            return (
                <tr>
                    <td>clouds</td>
                    <td>{obj.clouds} %</td>
                </tr>
            );
        }
    };

    const showRain = (obj) => {
        if ((obj.rain) && (obj.rain !== undefined)){
            return (
                <tr>
                    <td>rain volume for the last 3 hours</td>
                    <td>{Math.ceil(100*obj.rain)/100} mm</td>
                </tr>
            );
        }
    };

    const showSnow = (obj) => {
        if ((obj.snow) && (obj.snow !== undefined)){
            return (
                <tr>
                    <td>snow volume for the last 3 hours</td>
                    <td>{Math.ceil(100*obj.snow)/100}mm</td>
                </tr>
            );
        }
    };

    const VisibleClassName = () =>{
        if (indexFocusCard === index){
            return "Visible animated flipInX";
        }else{
            return "Hidden"
        }
    };

    const MiniForecastCardStyle = (index) => {
        if (index !== 7){
            return {
                left: styleMiniCardArr.left+(styleMiniCardArr.width*index/8)-3*styleMiniCardArr.width/32,
                bottom: "95px",
                width: (styleMiniCardArr.width/(8/2.5))
            }
        }else{
            return {
                left: styleMiniCardArr.left+(styleMiniCardArr.width*index/8)-11*styleMiniCardArr.width/64,
                bottom: "95px",
                width: (styleMiniCardArr.width/(8/2.5))
            }
        }

    };

    if (indexFocusCard >= 0){
        return(
            <div className={minInform.DayOfNight+" "+VisibleClassName()+ " MiniDetailCardComponent "}
                 style={MiniForecastCardStyle(index)}
            >
                <h3>
                    {minInform.time}
                </h3>
                <div className='DescriptionCard'>
                    <h2>{minInform.temperature}&#176;C</h2>
                    <img    className="iconWeather"
                            src={minInform.src}
                            alt={minInform.description}
                            title={minInform.description}
                    />
                </div>
                <table>
                    <tbody>
                    {showMinTemperature(minInform)}
                    {showMaxTemperature(minInform)}
                    {showAtmosphericPressure(minInform)}
                    {showAtmosphericPressureSeaLevel(minInform)}
                    {showAtmosphericPressureGrndLevel(minInform)}
                    {showHumidity(minInform)}
                    {showWind(minInform)}
                    {showClouds(minInform)}
                    {showRain(minInform)}
                    {showSnow(minInform)}
                    </tbody>
                </table>
            </div>
        );
    }else{
        return <div>  </div>
    }
};

export default connect(
    (state) => ({
        indexFocusCard: state.indexFocusCard,
        styleMiniCardArr: state.styleMiniCardArr
    }),

    dispatch => ({


    })
)(MiniDetailCardComponent);