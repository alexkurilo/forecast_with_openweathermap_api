import {appId} from '../Data/data';

export const asyncGetForecast = (cityName, cityId, countryCode, reSelected) => dispatch => {
    function forecastPromise(){
        return new Promise( function (resolve,reject){
            let inquiry = new XMLHttpRequest();
            inquiry.open ('GET', "http://api.openweathermap.org/data/2.5/weather?q="+cityName+","+countryCode+"&APPID="+appId+"&units=metric", true);
            inquiry.onreadystatechange = function(){
                if (inquiry.readyState !== 4){
                    return;
                }
                if (inquiry.status === 200){
                    let forecast = JSON.parse(inquiry.responseText);
                    resolve ({forecast, reSelected});

                }else{
                    console.log('shit happens: ' +  inquiry.status + ', ' + inquiry.statusText );
                }
            };
            inquiry.onerror = function(error){
                reject(error);
            };
            inquiry.send()
        });
    }

    forecastPromise()
        .then(result => {
            console.log(result.reSelected);
            if (result.reSelected !== undefined){
                console.log(result.reSelected);
                dispatch ({ type: "UPDATE_FORECAST", payload: result });
                return result;
            }else{
                dispatch ({ type: "FETCH_FORECAST", payload: result });
                return result;
            }
        })
};

