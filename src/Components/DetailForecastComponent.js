import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

import CardComponent from "./CardComponent";
import MiniForecastCardArrComponent from "./MiniForecastCardArrComponent";

import {showWindDirection} from '../Data/data';
import {CountryName} from '../Data/data';

import "./DetailForecastComponent.css";

const DetailForecastComponent = ({forecastInfoDetail, countriesObj, forecastInfo, onNextRewind, page, onFocusCard,
                                     indexFocusCard, onMiniForecastCardStyle, styleMiniCardArr}) => {
    let AmountOfDays = page;
    const AmountOfReading = 8;
    let amountEnd =  page*AmountOfReading-1;
    let amountStart = (page-1)*AmountOfReading ;
    defaults.global.defaultFontFamily = "Oswald";
    defaults.global.defaultFontColor = "#000000";
    defaults.global.defaultFontSize = 12;
    defaults.global.title.fontSize = 20;
    defaults.global.title.fontStile = "normal";
    defaults.global.legend.display = false;
    let data = {
        default:{
            global:{
                defaultFontFamily: "Oswald"
            }
        },
        labels: [],
        datasets:[
            {

                data:[],
                borderColor:[
                    "#2F4F4F"
                ],
                fill: false,
                backgroundColor:{

                }
            }
        ]
    };

    let options = {
        title: {
            display: true,
            text: 'Temperature change graph',
            fontSize: 16
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Temperature, degrees Celsius'
                }
            }],
            xAxes: [{
                ticks: {
                    display: false
                }
            }]
        }
    };

    const ShowDate = (dataDate) => {
        let thisDay = new Date(dataDate);
        let Day = "undefined";
        let Mounth = "undefined";
        let date = thisDay.getDate() < 10 ? "0"+((thisDay.getDate()).toString()) : (thisDay.getDate()).toString();
        let mounth = thisDay.getMonth();
        let hours = thisDay.getHours() < 10 ? "0"+((thisDay.getHours()).toString()) : (thisDay.getHours()).toString();
        let minutes = thisDay.getMinutes()<10 ? "0"+((thisDay.getMinutes()).toString()) : (thisDay.getMinutes()).toString();
        let day = thisDay.getDay();

        switch(day) {
            case 1: Day = "Mond";
                break;
            case 2: Day = "Tue";
                break;
            case 3: Day = "Wed";
                break;
            case 4: Day = "Thu";
                break;
            case 5: Day = "Fri";
                break;
            case 6: Day = "Sat";
                break;
            default: Day = "Sun";
        }

        switch(mounth) {
            case 1: Mounth = "Feb.";
                break;
            case 2: Mounth = "Mar.";
                break;
            case 3: Mounth = "Apr.";
                break;
            case 4: Mounth = "May";
                break;
            case 5: Mounth = "June";
                break;
            case 6: Mounth = "July";
                break;
            case 7: Mounth = "Aug.";
                break;
            case 8: Mounth = "Sept.";
                break;
            case 9: Mounth = "Okt.";
                break;
            case 10: Mounth = "Nov.";
                break;
            case 11: Mounth = "Dec.";
                break;

            default: Mounth = "Jan.";
        }
        return  Mounth+" "+date+"\n"+Day+"\n"+hours+":"+ minutes
    };



    const FillOutDataArray = (forecastInfoDetail) => {
        if (forecastInfoDetail.forecast !== ""){
            for (let key in forecastInfoDetail.forecast.list ){
                if ((key >= amountStart) && (key <= amountEnd) ){
                    data.labels.push(ShowDate(forecastInfoDetail.forecast.list[key].dt_txt));
                    data.datasets[0].data.push(forecastInfoDetail.forecast.list[key].main.temp);
                }
            }
        }
    };
/*
    const CountryName =(code) => {
        for (let key in countriesObj){
            if (countriesObj[key].countryCode === code){
                return countriesObj[key].countryName;
            }
        }
    };*/

    const OnVisibility = (forecastInfoDetail) => {
        if (forecastInfoDetail.forecast !== "") {
            return "Visible";
        }else{
            return "Hidden";
        }
    };

    const DetailForecast = (forecastInfoDetail, page) => {
        let nextDay = "one";
        switch(page) {
            case 2: nextDay = "second";
                break;
            case 3: nextDay = "third";
                break;
            case 4: nextDay = "fourth";
                break;
            case 5: nextDay = "fifth";
                break;
            default: nextDay = "one";
        }
        if (forecastInfoDetail.forecast !== ""){
            return (
                <div>
                    Weather forecast in {forecastInfoDetail.forecast.city.name}, {CountryName(forecastInfoDetail.forecast.city.country, countriesObj)} for the next {nextDay} day.
                </div>
            );
        }
    };

    const MiniForecastCardArr = (forecastInfoDetail) => {
        let minInform = [];
        let ending = "3h";
        if (forecastInfoDetail.forecast !== "") {
            for (let key in forecastInfoDetail.forecast.list) {
                if ((key >= amountStart) && (key <= amountEnd) ){
                    minInform.push(
                        {
                            src: "http://openweathermap.org/img/w/" + forecastInfoDetail.forecast.list[key].weather[0].icon + ".png",
                            time: ShowDate(forecastInfoDetail.forecast.list[key].dt_txt),
                            temperature: forecastInfoDetail.forecast.list[key].main.temp,
                            pressure: forecastInfoDetail.forecast.list[key].main.pressure,
                            description: forecastInfoDetail.forecast.list[key].weather[0].description,
                            humidity: forecastInfoDetail.forecast.list[key].main.humidity,
                            windSpeed: forecastInfoDetail.forecast.list[key].wind.speed,
                            windDirection: showWindDirection(forecastInfoDetail.forecast.list[key].wind.deg),
                            DayOfNight: DayOfNightBackGround(forecastInfoDetail.forecast.list[key].sys.pod)
                        }
                    );
                    if (forecastInfoDetail.forecast.list[key].main.temp_min){
                        minInform[minInform.length-1] = Object.assign(minInform[minInform.length-1],{temp_min:forecastInfoDetail.forecast.list[key].main.temp_min})
                    }
                    if (forecastInfoDetail.forecast.list[key].main.temp_max){
                        minInform[minInform.length-1] = Object.assign(minInform[minInform.length-1],{temp_max:forecastInfoDetail.forecast.list[key].main.temp_max})
                    }
                    if (forecastInfoDetail.forecast.list[key].main.sea_level){
                        minInform[minInform.length-1] = Object.assign(minInform[minInform.length-1],{sea_level:forecastInfoDetail.forecast.list[key].main.sea_level})
                    }
                    if (forecastInfoDetail.forecast.list[key].main.grnd_level){
                        minInform[minInform.length-1] = Object.assign(minInform[minInform.length-1],{grnd_level:forecastInfoDetail.forecast.list[key].main.grnd_level})
                    }
                    if (forecastInfoDetail.forecast.list[key].clouds.all){
                        minInform[minInform.length-1] = Object.assign(minInform[minInform.length-1],{clouds:forecastInfoDetail.forecast.list[key].clouds.all})
                    }
                    if (forecastInfoDetail.forecast.list[key].rain){
                        minInform[minInform.length-1] = Object.assign(minInform[minInform.length-1],{rain:forecastInfoDetail.forecast.list[key].rain[ending]})
                    }
                    if (forecastInfoDetail.forecast.list[key].snow){
                        minInform[minInform.length-1] = Object.assign(minInform[minInform.length-1],{snow:forecastInfoDetail.forecast.list[key].snow[ending]})
                    }
                }
            }
        }
        //console.log(minInform);
    return minInform;
    };

    const LeftRewind = () => {
        (AmountOfDays === 1 ) ? AmountOfDays = 5 : AmountOfDays--;
        onNextRewind(AmountOfDays);
    };

    const RightRewind = () => {
        (AmountOfDays === 5) ? AmountOfDays = 1 : AmountOfDays++;
        onNextRewind(AmountOfDays);
    };
    const DayOfNightBackGround = (pod) => {
        if (pod === "n") {
            return "NightCard";
        }else{
            return "DayCard";
        }
    };

    const MiniForecastCardArrStyle = () => {
        if (document.getElementById("MiniForecastCardArr") !== null){
            let left = document.getElementById("MiniForecastCardArr").getBoundingClientRect().left;
            let top = document.getElementById("MiniForecastCardArr").getBoundingClientRect().top;
            let width = document.getElementById("MiniForecastCardArr").getBoundingClientRect().width;
            onMiniForecastCardStyle(left, top, width);
        }
    };

    if ((forecastInfoDetail.forecast !== "")/*&&(document.getElementById("MiniForecastCardArr") !== null)*/){
        FillOutDataArray(forecastInfoDetail);
        MiniForecastCardArrStyle();
        return(
            <div className={OnVisibility(forecastInfoDetail)+" ForecastDetailComponent"}
            >
                <section>
                    <Link className="DetailLink" to='/'>
                        <img    className="BackLink"
                                src="https://png.icons8.com/ios-glyphs/30/000000/undo.png"
                                alt="back to previous page"
                                title="back to previous page"
                        />
                    </Link>
                </section>
                <div className="DetailForecast">
                    <div className="DetailForecastInformation">
                        <section className="DetailForecastCard animated bounceIn">
                            <center>
                                Weather in {forecastInfoDetail.forecast.city.name}, {CountryName(forecastInfoDetail.forecast.city.country, countriesObj)} at this momemt.
                            </center>
                            <CardComponent  index = {forecastInfoDetail.index}
                                            item = {forecastInfo[forecastInfoDetail.index]}/>
                        </section>
                        <section className="DetailInformation">
                            <section className="DetailForecastHeader animated fadeInDownBig">
                                {DetailForecast(forecastInfoDetail, page)}
                            </section>
                            <section    className="charWindow animated lightSpeedIn"
                                        style={{width: "95%"}}>
                                <Line
                                    data={data}
                                    width={100}
                                    height={30}
                                    options={options}
                                />
                            </section>
                            <MiniForecastCardArrComponent   className={"MiniForecastCardArrComponent "}
                                                            MiniForecastCardArr = {MiniForecastCardArr(forecastInfoDetail)}/>
                            <section className="Arrows">
                                <img src="https://png.icons8.com/material/50/000000/left3.png"
                                     alt="show the weather forecast for the previous day"
                                     onClick={(event) => LeftRewind(event)}
                                     title="show the weather forecast for the previous day"
                                />

                                <img src="https://png.icons8.com/material/50/000000/right3.png"
                                     alt="show the weather forecast for the next day"
                                     onClick={(event) => RightRewind(event)}
                                     title="show the weather forecast for the next day"
                                />
                            </section>
                        </section>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div className="Visible">
                <Link className="DetailLink" to='/'>
                    <img    className="BackLink"
                            src="https://png.icons8.com/ios-glyphs/30/000000/undo.png"
                            alt="back to previous page"
                            title="back to previous page"
                    />
                </Link>
            </div>
        );
    }
};

export default connect(
    (state) => ({
        forecastInfoDetail: state.forecastInfoDetail,
        countriesObj: state.countriesObj,
        selectedCities: state.selectedCities,
        forecastInfo: state.forecastInfo,
        page: state.page,
        indexFocusCard: state.indexFocusCard,
        styleMiniCardArr: state.styleMiniCardArr
    }),

    dispatch => ({
        onNextRewind: (page) => {
            const payload = page;
            dispatch({type: "NEXT_PAGE", payload})
        }
    })
)(DetailForecastComponent);