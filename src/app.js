const path = require("path")
const express = require("express")

const forecast = require("./forecast.js")

const app = express()
const key = "e038c191ace82028934d1f0f08627fff"

const address = "Uberaba"

app.use(express.static(path.join(__dirname, "../public")))

app.get("/help", (req, res) => {
    res.send([{
        "name":"weather app",
        "author":"pedro silva"
    },
    {
        "name":"weather app",
        "author":"pedro silva"
    }
    ])
})

app.get("/about", (req, res) => {
    res.send("<marquee>Node course by Andrew mead, Weather App</marquee>")
})

app.get("/weather", (req, res) => {
    res.send({
        "weather":"weather",
        "location":"location"
    })
})

app.get("/weatherPage", (req, res) => {
    if(address === undefined) {
        res.send("no address informed")
        console.log("no address informed")
        return
    } else {
        forecast.geocode(address, (error, dataGeocode) => {
            console.log(dataGeocode)
            if(error) {
                res.send(error)
            } 
            const {latitude:lat, longitude:lon} = dataGeocode
            forecast.weather(key, lat, lon, (error, dataForecast ) => {
                if(error) {
                    res.send(error)
                }
                const {body: body} = dataForecast
                const json = JSON.parse(body)
                res.send(forecast.simpleForecast(json.current))
            })
        })
    }
})

app.listen("3000")