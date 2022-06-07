const resultElement = document.getElementById("results")

const trackDeet = document.getElementById("deet")
trackDeet.classList.add("info")


let artistUrl
let imageElement
let result
let audioElement

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
    // if (newResult.includes(" ")) {
    //     console.log("multiple spaces")
    //     replaceSpace()
    // }
    // else {
    //     findArtist()
    // }
    //^ need to tweak to console log when multiple spacese are in search bar
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
        showAlbumArt(track);
        showTrackName(track);
        showBandName(track);
    }
}

function showTrackName(track) {

    let nameElement = document.createElement("p")
    nameElement.innerText = `${track.trackName}`
    console.log(nameElement.innerText)
    trackDeet.appendChild(nameElement)
}

function showAlbumArt(track) {
    let imageElement = document.createElement("img");
    imageElement.src = `${track.artworkUrl60}`;
    imageElement.alt = "artist's album covers"
    imageElement.classList.add("photos")
    trackDeet.appendChild(imageElement)

    // adding click event listener to album photo
    imageElement.addEventListener("click", function (event) {
        let audioElement = document.querySelector("audio")
        audioElement.controls = true;
        audioElement.src = `${track.previewUrl}`;
        audioElement.type = "audio/mpeg"
        console.log("image clicked")
        console.log(audioElement.src)
    }
    )
}

function showBandName(track) {
    let bandElement = document.createElement("p")
    bandElement.innerText = `${track.artistName}`
    trackDeet.appendChild(bandElement)
}