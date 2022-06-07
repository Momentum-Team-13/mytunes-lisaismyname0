const resultElement = document.getElementById("results")

const trackDeet = document.getElementById("deet")


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
    // if (result = "  ") {
    //     alert("Search Field Empty");
    // tried result = null, or result = " ", but result = " " triggers replaceSpace()
    // }
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
        newElement = document.createElement("div")
        newElement.appendChild(trackDeet)
        newElement.id = "deetBox"
        showAlbumArt(track);
        showTrackName(track);
        showBandName(track);
        resultElement.appendChild(newElement)
    }
}

function showTrackName(track) {

    let nameElement = document.createElement("p")
    nameElement.innerText = `${track.trackName}`
    console.log(nameElement.innerText)
    newElement.appendChild(nameElement)
}

function showAlbumArt(track) {
    let imageElement = document.createElement("img");
    imageElement.src = `${track.artworkUrl60}`;
    imageElement.alt = "artist's album covers"
    imageElement.classList.add("photos")
    newElement.appendChild(imageElement)

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
    newElement.appendChild(bandElement)
}

// radio button attempts
// function searchArtist(track) {
//     console.log("Search by Artist Name")
// }

// function searchSong(track) {
//     console.log("Search by Song Title")
// }

// function searchAlbum(track) {
//     console.log("Search by Album Title")
// }