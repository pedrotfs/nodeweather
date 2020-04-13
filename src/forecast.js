const request = require("request")
const geocodeKey = "pk.eyJ1IjoicGVkcm90ZnMiLCJhIjoiY2s4b3VhdmNmMDJpcDNlcDN2NWYzOXZkMCJ9.95rIcgrKw0QA-nmQlycB2g"

const simpleForecast = (weather) => {
    var output = "In your coordinates, we have: <br>"
    output = output + "temperature: " + (weather.temp - 273) + "<br>"
    output = output + "humidity: " + weather.humidity + "%<br>"
    output = output + "pressure: " + weather.pressure / 1000 + " atm<br>"
    output = output + "weather: " + weather.weather[0].description + "<br>"
    return output
}

const geocode = (address, callback) => {
    const urlMapBox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + geocodeKey
    request({url:urlMapBox, json:true }, (error, {body}) => {
        if(error) {
            return callback({error: "error retrieving geocode coordinates."}, undefined)
        } else if(body.features === undefined) {
            return callback({error: "error converting address."}, undefined)
        } else if(body.features.length === 0) {
            return callback({error:"error converting address."}, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

const weather = (key, latitude, longitude, location, callback) => {
    const urlOpenWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + key
    console.log(urlOpenWeather)
    request({url: urlOpenWeather}, (error, data) => {
        if(error) {
            callback("error retrieving weather.", undefined)
        } else {
            callback(undefined, data)
        }
    })
}

module.exports = {
    simpleForecast: simpleForecast,
    geocode: geocode,
    weather: weather
}