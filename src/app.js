const path = require("path")
const express = require("express")
const hbs = require("hbs")

const forecast = require("./forecast.js")

const app = express()
const key = "e038c191ace82028934d1f0f08627fff"

const address = "Uberaba"

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
        title: "WEATHER APPLICATION - ABOUT ME",
        name: "Pedro Silva"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "WEATHER APPLICATION - HELP",
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