const resultElement = document.getElementById("results");

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
            console.log("response from api: ", data.results[0])
            cycleTracks(data.results)

        })

}

function cycleTracks(trackArray) {
    for (let track of trackArray) {
        showTrackName(track)
        showAlbumArt(track)
    }
}

function showTrackName(track) {

    let nameElement = document.createElement("p")
    nameElement.innerText = `${track.trackName}`
    console.log(nameElement.innerText)
    resultElement.appendChild(nameElement)
}

function showAlbumArt(track) {
    let imageElement = document.createElement("img");
    imageElement.src = `${track.artworkUrl60}`;
    imageElement.alt = "artist's album covers"
    imageElement.classList.add("photos")
    resultElement.appendChild(imageElement)
}