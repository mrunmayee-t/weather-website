const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handle bars engine and views location
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Mrunmayee'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Mrunmayee'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'May I help you!',
        title: 'Help',
        name: 'Mrunmayee'
    });
});

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address to getthe weather'
        })
    }

    geoCode(req.query.address, (error,{ latitude, longitude, location } = {}) =>{
        if(error){
            return res.send({
                'Error': error
            });
        }
        
        foreCast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    'Error': error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
          });
    });
});

app.get('/products', (req,res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error',{
        error: 'Help article not found'
    });
});

app.get('*', (req,res) => {
    res.render('error',{
        error: 'My 404 page'
    });
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
});