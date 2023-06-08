/* Global Variables */
const zipURL = 'http://api.openweathermap.org/geo/1.0/zip?zip='
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?lat='
const restOfBaseURL = '&lon='
const apiKey = "&appid=ff5aa49c2abcb713e98dff328328fe81&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener("click", performAction)

function performAction(e){
    const zipCode = document.getElementById('zip').value
    const feelings = document.getElementById('feelings').value;
    let data2 = [];

    getAnimalData1(zipURL+zipCode+apiKey)

    .then(function(data){
        const myDate = new Date(data.dt * 1000)
        console.log(data, data.main.temp, myDate.toLocaleString())
        postData('/addWeather', {date: myDate.toLocaleString(), temp: data.main.temp, feelings:feelings})

        updateUI()
    })
}

const getAnimalData1 = async (url) =>{
    const res = await fetch(url);
    try {
        const data = await res.json();
        return getAnimalData2(baseURL+data.lat+restOfBaseURL+data.lon+apiKey);
    } catch(error){
        console.log("error", error);
    }
}

const getAnimalData2 = async (url) =>{
    const res = await fetch(url);
    try {
        const data = await res.json();
        return data;
    } catch(error){
        console.log("error", error);
    }
}

const postData = async ( url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("error", error)
    }
}

const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const allData = await request.json()
        console.log(allData);
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].feelings;
    }catch(error){
        console.log("error", error)
    }
}