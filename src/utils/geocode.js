const request = require('request');

const geoCode = (address, callback) =>{
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXJ1bm1heWVlLXRhbHdhbGthciIsImEiOiJjbDJseTYzY20wcnNqM2pvOHdic3R0dm9nIn0._LO4Rf7kus6nd15uj_g85A&limit=1'
    debugger
    request({url: URL, json:true}, (error,{ body }) => {
        if(error){
            callback('Unable to connect to location services!')
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.');
        }
        else{
            const locationData = body.features;
            const latitude = locationData[0].center[1];
            const longitude = locationData[0].center[0];
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: locationData[0].place_name
            })
        }
    })
}

module.exports = geoCode