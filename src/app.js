const path = require("path")
const express = require("express")
const hbs = require("hbs")

const forecast = require("./forecast.js")

const app = express()
const key = "e038c191ace82028934d1f0f08627fff"

const address = "São Paulo"

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../templates/views"))
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

app.use(express.static(path.join(__dirname, "../public")))


app.get("", (req, res) => { // root
    res.render("index", {
        title: "WEATHER APPLICATION",
        name: "Pedro Silva"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "WEATHER APPLICATION",
        name: "Pedro Silva"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "WEATHER APPLICATION",
        message: "this is an app on the Node Js Course. Its fun!",
        name: "Pedro Silva"
    })
})

app.get("/weather", (req, res) => {
    res.send({
        "weather":"weather",
        "location":"location"
    })
})

app.get("/weatherPanel", (req, res) => {
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
            const {latitude:lat, longitude:lon, location: location} = dataGeocode
            forecast.weather(key, lat, lon, location ,(error, dataForecast ) => {
                if(error) {
                    res.send(error)
                }
                const {body: body} = dataForecast
                const json = JSON.parse(body)
                
                const temp = (json.current.temp - 273) + " ºC"
                const pressure = (json.current.pressure / 1000) + " ATM"
                const humidity = json.current.humidity + " %"
                
                res.render("weather", {                    
                    temp: temp,
                    pressure: pressure,
                    humidity: humidity,
                    description: json.current.weather[0].description,
                    location: location,
                    title: "WEATHER APP",
                    name: "Pedro Silva"
                })
            })
        })
    }
})

app.get("/help/*", (req,res)=> {
    res.render("error", {
        title: "WEATHER APPLICATION",
        name: "Pedro Silva",
        errorMessage: "This help article was not found."
    })
})

app.get("*", (req,res)=> {
    res.render("error", {
        title: "WEATHER APPLICATION",
        name: "Pedro Silva",
        errorMessage: "This page was not found."
    })
})

app.listen("3000")