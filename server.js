// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Setup Server
const server = app.listen(port, listening);

function listening() {
    console.log("server running...")
    console.log(`running on localhost ${port}`);
}

app.get('/all', getData)

function getData(req, res){
    res.send(projectData)
    console.log(projectData)
}

// POST ROUTE 
app.post('/addWeather', addWeather);

function addWeather(req, res) {
    newEntry = {
        date:req.body.date,
        temp: req.body.temp,
        feelings: req.body.feelings
    }

    projectData.push(newEntry)
    res.send(projectData)
    console.log(projectData)
}