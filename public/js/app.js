console.log("loading client side js file")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const location = search.value
        fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ""
            } else {
                console.log(data)
                messageOne.textContent = data.temp + ", " + data.pressure + ", " + data.humidity 
                messageTwo.textContent = data.location
            }
        })
    })
})