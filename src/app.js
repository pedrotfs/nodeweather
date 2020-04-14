const path = require("path")
const express = require("express")
const hbs = require("hbs")

const forecast = require("./forecast.js")

const app = express()
const port = process.env.PORT || 3000
const key = "e038c191ace82028934d1f0f08627fff"

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
    address = req.query.address
    if(address === undefined) {
        return res.send({
            error:"no address specified"
        })
    }
    forecast.geocode(address, (error, dataGeocode) => {
        if(error) {
            return res.send(error)
        } 
        const {latitude:lat, longitude:lon, location: location} = dataGeocode
        forecast.weather(key, lat, lon, location ,(error, dataForecast ) => {
            if(error) {
                res.send(error)
            }
            const {body: body} = dataForecast
            const json = JSON.parse(body)
                                                
            const object = {
                temp : (json.current.temp - 273) + " ºC",
                pressure : (json.current.pressure / 1000) + " ATM",
                humidity : json.current.humidity + " %",
                weather: json.current.weather[0].description,
                location : location,
                after1hour: json.hourly[1],
                after2hour: json.hourly[2],
                after3hour: json.hourly[3],
                after4hour: json.hourly[4],
                after5hour: json.hourly[5],
                daily: json.daily[0].temp
            }
            res.send(object)
        })
    })
})

app.get("/weatherPanel", (req, res) => {
    address = req.query.address
    if(address === undefined) {
        return res.render("error", {                    
            errorMessage: "Address not provided",
            title: "WEATHER APP",
            name: "Pedro Silva"
        })
    }
    
    forecast.geocode(address="Uberaba", (error, dataGeocode) => {
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

app.listen(port, () => {
    console.log("server is starting on port " + port)
})