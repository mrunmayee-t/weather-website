const geoCode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');

if(process.argv[2]){
    geoCode(process.argv[2], (error,{ latitude, longitude, location } = {}) =>{
        if(error){
            return console.log('Error', error);
        }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return console.log('Error', error);
            }
            console.log(location);
            console.log(forecastData);
          });
    });
}
else{
    console.log('Please provide an argument!')
}


