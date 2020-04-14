console.log("loading client side js file")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

const messageOne = document.querySelector('#messageOne')
const messageOneB = document.querySelector('#messageOneB')
const messageOneC = document.querySelector('#messageOneC')
const messageOneD = document.querySelector('#messageOneD')
const messageOneE = document.querySelector('#messageOneE')
const messageOneF = document.querySelector('#messageOneF')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const location = search.value
        fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageOneB.textContent = ""
                messageOneC.textContent = ""
                messageOneD.textContent = ""
                messageOneE.textContent = ""
                messageOneF.textContent = ""
                messageTwo.textContent = ""
            } else {
                messageOne.textContent = "temperature:" + data.temp + ", pressure:" + data.pressure + ", humidity: " + data.humidity + ", weather: " + data.weather
                messageOneB.textContent = "+1h> t: " + (data.after1hour.temp - 273) + ", p: " + data.after1hour.pressure + ", h:" + data.after1hour.humidity + ", w:" + data.after1hour.weather[0].description
                messageOneC.textContent = "+2h> t: " + (data.after2hour.temp - 273) + ", p: " + data.after2hour.pressure + ", h:" + data.after2hour.humidity + ", w:" + data.after2hour.weather[0].description
                messageOneD.textContent = "+3h> t: " + (data.after3hour.temp - 273) + ", p: " + data.after3hour.pressure + ", h:" + data.after3hour.humidity + ", w:" + data.after2hour.weather[0].description
                messageOneE.textContent = "+4h> t: " + (data.after4hour.temp - 273) + ", p: " + data.after4hour.pressure + ", h:" + data.after4hour.humidity + ", w:" + data.after2hour.weather[0].description
                messageOneF.textContent = "+5h> t: " + (data.after5hour.temp - 273) + ", p: " + data.after5hour.pressure + ", h:" + data.after5hour.humidity + ", w:" + data.after2hour.weather[0].description

                messageTwo.textContent = data.location
            }
        })
    })
})
