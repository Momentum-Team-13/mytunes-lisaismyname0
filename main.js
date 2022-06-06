const resultElement = document.getElementById("results")

const trackDeet = document.getElementById("deet")
trackDeet.classList.add("info")

const trackDeetBox = document.createElement("div")
trackDeetBox.classList.add("info")

let artistUrl
let result

// function searchBar() {

// }

let searchButton = document.getElementById("search")
let searchField = document.querySelector("input")

searchButton.addEventListener("click", function (event) {
    let result = searchField.value
    artistUrl = "https://itunes.apple.com/search?term=" + result + "."
    if (result.includes(" ")) {
        replaceSpace()
    } else {
        console.log("one word")
        findArtist()
    }

})

function replaceSpace() {
    originalString = searchField.value
    newString = originalString.replace(" ", "+")
    newResult = newString
    newArtistUrl = "https://itunes.apple.com/search?term=" + newResult + "."
    console.log(newResult)
    findArtist2()
    console.log(newArtistUrl)
}

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

function findArtist2() {
    fetch(newArtistUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
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