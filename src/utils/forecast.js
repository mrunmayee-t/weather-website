const request = require('request');

const forecast = (long, lat, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=f206b549465b2e7dd7794de5b8f5fa41&query='+lat+','+long+'&units=f';
    request({url, json: true}, (error,{ body }) => {
        if(error){
            callback('Unalble to connect to weather srvice!')
        }
        else if(body.hasOwnProperty('error')){
            callback('Unable to find the weather. Try another location')
        }
        else{
            const currentData = body.current;
            callback(undefined,currentData.weather_descriptions[0] + '. It is currently ' + currentData.temperature + ' degrees out. It feels like ' + currentData.feelslike + ' deegrees out.');
        }
    });
}


module.exports = forecast;