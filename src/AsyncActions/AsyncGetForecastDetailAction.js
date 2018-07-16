import {appId} from '../Data/data';

export const asyncGetForecastDetail = (cityName, cityId, countryCode, index, item) => dispatch => {
    //console.log(appId, cityName, cityId, countryCode);
    function forecastPromise(){
        return new Promise( function (resolve,reject){
            let inquiry = new XMLHttpRequest();
            //inquiry.open ('GET', "http://api.openweathermap.org/data/2.5/weather?q="+cityName+","+countryCode+"&APPID="+appId+"&units=metric", true);
            inquiry.open ('GET', "http://api.openweathermap.org/data/2.5/forecast?id="+cityId+"&APPID="+appId+"&units=metric&lang={ru}", true);
            inquiry.onreadystatechange = function(){
                if (inquiry.readyState !== 4){
                    return;
                }
                if (inquiry.status === 200){
                    let forecast = JSON.parse(inquiry.responseText);
                    //console.log(forecast.query.results.channel.item.condition.code);
                    //console.log(forecast);
                    let page = 1;
                    resolve ({forecast, index, page});

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
            dispatch ({ type: "FETCH_FORECAST_DETAIL", payload: result });
            return result;
        })
}
