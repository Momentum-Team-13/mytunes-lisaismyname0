const resultElement = document.getElementById("log");

function searchBar() {

}

let searchButton = document.querySelector("button");
let jackJohnsonURL = "https://itunes.apple.com/search?term=jack+johnson."

searchButton.addEventListener("click", function (event) {

    console.log("search")
    findJack();


})

function findJack() {
    fetch(jackJohnsonURL, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("response from api: ", data.results[0].trackName)
            cycleTracks(data.results)

        })

}

function cycleTracks(trackArray) {
    for (let track of trackArray) {
        showDeets(track)
    }
}

function showDeets(track) {

    let nameElement = document.createElement("p")
    nameElement.innerText = `${track.trackName}`
    console.log(nameElement.innerText)
    // console.log(Object.keys(data.results))
    resultElement.appendChild(nameElement)
}