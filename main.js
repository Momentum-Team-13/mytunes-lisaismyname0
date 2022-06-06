const resultElement = document.getElementById("results")

const trackDeet = document.getElementById("deet")
trackDeet.classList.add("info")

const trackDeetBox = document.createElement("div")
trackDeetBox.classList.add("info")

// function searchBar() {

// }

let searchButton = document.getElementById("search")
let searchField = document.querySelector("input")
let artistUrl = "https://itunes.apple.com/search?term=`${result}`."

searchButton.addEventListener("click", function (event) {
    let result = searchField.value
    console.log(result)

    findArtist();

})

function findArtist() {
    fetch(artistUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("response from api: ", data.results[0])
            buildResults(data.results)
        })

}

function buildResults(trackArray) {
    for (let track of trackArray) {
        resultElement.appendChild(trackDeet)
        trackDeet.appendChild(trackDeetBox)
        showAlbumArt(track);
        showTrackName(track);
        showBandName(track);
    }
}

function showTrackName(track) {

    let nameElement = document.createElement("div")
    nameElement.innerText = `${track.trackName}`
    console.log(nameElement.innerText)
    trackDeetBox.appendChild(nameElement)
}

function showAlbumArt(track) {
    let imageElement = document.createElement("img");
    imageElement.src = `${track.artworkUrl60}`;
    imageElement.alt = "artist's album covers"
    imageElement.classList.add("photos")
    trackDeetBox.appendChild(imageElement)
}

function showBandName(track) {
    let bandElement = document.createElement("div")
    bandElement.innerText = `${track.artistName}`
    trackDeetBox.appendChild(bandElement)
}