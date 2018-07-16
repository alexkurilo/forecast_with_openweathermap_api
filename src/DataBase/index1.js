const serviceAccount = require("./serviceAccountKey.json");
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://forecast-with-openweathe-b65e9.firebaseio.com"

});
const db = admin.database();

let refCodeList = db.ref("/code-list");
refCodeList.on("value", function(snapshot) {
    let codeList = snapshot.val();
    let nameCountry = [];
    let newCodeList = [];
    for (let key in codeList){
        nameCountry.push(codeList[key]);
    }
    let nameCountrySort = nameCountry.sort();
    for (let i = 0; i < nameCountrySort.length; i++){
        for (let key in codeList){
            if (nameCountrySort[i] === codeList[key]){
                newCodeList.push({name: nameCountrySort[i], code: key});
            }
        }
    }
    let refNewCodeList = db.ref("/new-code-list");
    refNewCodeList.set( newCodeList);
});
let refCityList = db.ref("/city-list");
refCityList.on("value", function(snapshot){
    let cityList = snapshot.val();
    let codeObj = {};
    let objCountriesAndCities = {};
    for (let key in cityList){
        if (cityList[key].country !== ""){
            codeObj[cityList[key].country] = 0;
        }
    }
    let codeArr = Object.keys(codeObj).sort();//массив кодов всех стран в алфавитном порядке без повторений из "/city-list"
    for (let i = 0; i<codeArr.length; i++){
        for (let key in cityList){
            if (codeArr[i] === cityList[key].country){
                if (objCountriesAndCities[cityList[key].country] === undefined){
                    objCountriesAndCities[cityList[key].country] = [];
                    objCountriesAndCities[cityList[key].country].push(cityList[key].name);
                }else{
                    objCountriesAndCities[cityList[key].country].push(cityList[key].name);
                }
            }
        }
    }
    for (let key in objCountriesAndCities){
        objCountriesAndCities[key] = reduplicationCity(objCountriesAndCities[key]);
    }
    let objCountriesAndCitiesAndId = fillingResultObj(cityList, objCountriesAndCities);
    let refResultObj = db.ref("/result-obj");
    refResultObj.set( objCountriesAndCitiesAndId);
    console.log("finish");
});

let reduplicationCity = (arr) => {
    let obj = {};
    for (let i = 0; i < arr.length; i++){
        obj[arr[i]]=0;
    }
    arr = Object.keys(obj).sort();
    return arr;
};

let fillingResultObj = (obj1, obj2) => {
    let obj = {};
    for (let key in obj2){
        for (let i = 0; i < obj2[key].length; i++){
            for (let j = 0; j < obj1.length; j++){
               if ((obj1[j].name !== "")&&(obj1[j].name !== "-")&&(obj1[j].name !== "_")){
                   if ((obj1[j].name === obj2[key][i])&&(obj1[j].name !== "")){
                       if (obj[key] === undefined){
                           obj[key] = [];
                           obj[key].push({name: obj1[j].name, id: obj1[j].id });
                       }else{
                           if (obj[key][obj[key].length-1].name !== obj1[j].name){
                               obj[key].push({name: obj1[j].name, id: obj1[j].id });
                           }
                       }
                   }
               }
            }
        }
    }
    return obj;
};
