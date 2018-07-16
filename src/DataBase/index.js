const config = require("./config.json");
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: "https://forecast-with-openweathermap.firebaseio.com"
});
const db = admin.database();

let ref = db.ref("/country-code-list");
ref.on("value", function(snapshot) {
    let val = snapshot.val();
    for(let key in val){
        let refNameCountry = db.ref("/data/"+val[key].name+"/code");
        refNameCountry.set( val[key].code);
    }

    let refCityList = db.ref("/city-list");
    refCityList.on("value", function(snapshotCityList) {
        let valCityList = snapshotCityList.val();
        for (let i = valCityList.length-1; i>=0; i--){
            for (let j = val.length-1; j>=0; j--){
                if (val[j].code === valCityList[i].country ){
                    let obj = {
                        name: valCityList[i].name,
                        id: valCityList[i].id
                    };
                    let refNameCity = db.ref("/data/"+val[j].name+"/cities");
                    refNameCity.push( obj);
                }
            }
        }
    });
});
