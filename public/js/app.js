console.log('Client side JS loaded');


//queryselector matches the first element in the DOM
const weatherForm = document.querySelector('form'); 
const search = document.querySelector('input');
const locationMsg = document.querySelector('#location');
const forecastMsg = document.querySelector('#forecast');
const errorMsg = document.querySelector('#error');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault(); //prevents default behaviour of a submit button
    const location = search.value; //extracts value typed in input 
    fetch('http://localhost:3000/weather?address='+ location)
    .then((response) => {
       response.json().then((data) => {
        if(data.error){
            return errorMsg.textContent = data.error;
        }
        if(data.Error){
            return errorMsg.textContent = data.Error;
        }
        console.log(data.location);
        locationMsg.textContent = data.location;
        forecastMsg.textContent = data.forecast;
    });
});
});