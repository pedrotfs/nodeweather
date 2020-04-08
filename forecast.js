const request = require("request")

const simpleForecast = (weather) => {
    console.log("In your coordinates, we have")
    console.log("temperature: " + (weather.temp - 273))
    console.log("pressure: " + weather.pressure / 1000)
    console.log("humidity: " + weather.humidity + "%")
    console.log("weather: " + weather.weather[0].description)
}

const geocode = (address, callback) => {
    const urlMapBox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicGVkcm90ZnMiLCJhIjoiY2s4b3VhdmNmMDJpcDNlcDN2NWYzOXZkMCJ9.95rIcgrKw0QA-nmQlycB2g"
    request({url:urlMapBox, json:true }, (error, response) => {
        if(error) {
            callback("error retrieving geocode coordinates.", undefined)
        } else if(response.body.features.length === 0) {
            callback("error converting address.", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

const weather = (key, latitude, longitude, callback) => {
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