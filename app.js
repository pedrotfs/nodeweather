const forecast = require("./forecast.js")

const key = "e038c191ace82028934d1f0f08627fff"

var address = process.argv[2]

if(address === undefined) {
    console.log("no address informed")
    return
}

forecast.geocode(address, (error, dataGeocode) => {
    console.log(dataGeocode)
    if(error) {
        return console.log(error)
    } 
    forecast.weather(key, dataGeocode.latitude, dataGeocode.longitude, (error, dataForecast ) => {
        if(error) {
            return console.log(error)
        }
        const json = JSON.parse(dataForecast.body)
        forecast.simpleForecast(json.current)
    })
})