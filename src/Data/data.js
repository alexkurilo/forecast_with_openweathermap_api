export const appId = "c1e69374144cd1d3246bd283a6729051";//for open-weather-map

export const config = {                                 //for firebase
    apiKey: "AIzaSyCzeH91zL1Ms0XVuQBpj56iJy33W9B6cxg",
    authDomain: "forecast-with-openweathermap.firebaseapp.com",
    databaseURL: "https://forecast-with-openweathermap.firebaseio.com",
    projectId: "forecast-with-openweathermap",
    storageBucket: "forecast-with-openweathermap.appspot.com",
    messagingSenderId: "30889185514"
};

export const config1 = {                                    //for firebase1
    apiKey: "AIzaSyAzf7VLHFy9rXUNzWgA000LAReMam2cO1A",
    authDomain: "forecast-with-openweathe-b65e9.firebaseapp.com",
    databaseURL: "https://forecast-with-openweathe-b65e9.firebaseio.com",
    projectId: "forecast-with-openweathe-b65e9",
    storageBucket: "forecast-with-openweathe-b65e9.appspot.com",
    messagingSenderId: "581936777440"
};

export const CountryName = (code, countriesObj) => {
    for (let key in countriesObj){
        if (countriesObj[key].countryCode === code){
            return countriesObj[key].countryName;
        }
    }
};

export  const showWindDirection = (deg) => {
    let data = deg.toFixed(2);
    if (((data) > (360 - 11.25)) || ((data) <= (11.25))) {
        return "North"+" ("+data+"deg)";
    }
    ;
    if (((data) > (1 * 360 / 16 - 11.25)) || ((data) <= (1 * 360 / 16 + 11.25))) {
        return "North-North-East"+" ("+data+"deg)";
    }
    ;
    if (((data) > (2 * 360 / 16 - 11.25)) || ((data) <= (2 * 360 / 16 + 11.25))) {
        return "North-East"+" ("+data+"deg)";
    }
    ;
    if (((data) > (3 * 360 / 16 - 11.25)) || ((data) <= (3 * 360 / 16 + 11.25))) {
        return "East-North-East"+" ("+data+"deg)";
    }
    ;
    if (((data) > (4 * 360 / 16 - 11.25)) || ((data) <= (4 * 360 / 16 + 11.25))) {
        return "East"+" ("+data+"deg)";
    }
    ;
    if (((data) > (5 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (5 * 360 / 16 + 11.25))) {
        return "East-South-East"+" ("+data+"deg)";
    }
    ;
    if (((data) > (6 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (6 * 360 / 16 + 11.25))) {
        return "South-East"+" ("+data+"deg)";
    }
    ;
    if (((data) > (7 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (7 * 360 / 16 + 11.25))) {
        return "South-South-East"+" ("+data+"deg)";
    }
    ;
    if (((data) > (8 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (8 * 360 / 16 + 11.25))) {
        return "South"+" ("+data+"deg)";
    }
    ;
    if (((data) > (9 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (9 * 360 / 16 + 11.25))) {
        return "South-South-West"+" ("+data+"deg)";
    }
    ;
    if (((data) > (10 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (10 * 360 / 16 + 11.25))) {
        return "South-West"+" ("+data+"deg)";
    }
    ;
    if (((data) > (11 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (11 * 360 / 16 + 11.25))) {
        return "West-South-West"+" ("+data+"deg)";
    }
    ;
    if (((data) > (12 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (12 * 360 / 16 + 11.25))) {
        return "West"+" ("+data+"deg)";
    }
    ;
    if (((data) > (13 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (13 * 360 / 16 + 11.25))) {
        return "West-North-West"+" ("+data+"deg)";
    }
    ;
    if (((data) > (14 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (14 * 360 / 16 + 11.25))) {
        return "North-West"+" ("+data+"deg)";
    }
    ;
    if (((data) > (15 * 360 / 16 - 11.25 - 11.25)) || ((data) <= (15 * 360 / 16 + 11.25))) {
        return "North-North-West"+" ("+data+"deg)";
    };
};

export const showTime = (number) => {
    let myNumber = number%(60*60*24);//отбросил кратное суткам
    let seconds = myNumber%60;//кол-во секунд
    myNumber = (myNumber/60).toFixed(0);//общее кол-во минут
    let minutes = myNumber%60;//кол-во минут
    number = (myNumber/60).toFixed(0);//общее кол-во часов
    let hours = number%24;
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    hours = (hours >= 10) ? hours : "0" + hours;
    return (hours + ":" + minutes + ":" + seconds );
};