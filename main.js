const resultElement = document.getElementById("results")

const trackDeet = document.getElementById("deet")

let artistUrl
let imageElement
let result
let audioElement

let searchButton = document.getElementById("search")
let searchField = document.getElementById("userInput")

function clearResult(resultDiv) {
    document.getElementById("results").innerText = " "
}

searchButton.addEventListener("click", function (event) {
    clearResult()
    event.preventDefault()
    let result = searchField.value
    searchSpecific(result)
    // check radio button for URL
    if (result >= 0) {
        alert("Search Field Empty");
    } else {
        replaceSpace()
        // artistUrl = "https://itunes.apple.com/search?term=" + result + "."
        console.log(artistUrl)
    }
})

function replaceSpace() {
    originalString = searchField.value
    newString = originalString.replaceAll(" ", "+")
    newResult = newString
    newArtistUrl = "https://itunes.apple.com/search?term=" + newResult + "."
    console.log(`${newString}`)
    findArtist()
    // console.log(newArtistUrl);
}

function findArtist() {
    fetch(newArtistUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("response from api: ", data.results[0])
            if (data.results[0] === undefined) {
                alert("No Results Found")
            } else {
                buildResults(data.results)
            }
        })
}

function buildResults(trackArray) {
    for (let track of trackArray) {
        newElement = document.createElement("div")
        newElement.appendChild(trackDeet)
        newElement.classList.add("deetBox")
        showAlbumArt(track);
        showTrackName(track);
        showBandName(track);
        showAlbumTitle(track);
        resultElement.appendChild(newElement)
    }
}

function showTrackName(track) {

    let nameElement = document.createElement("p")
    nameElement.innerText = `Track Name: ${track.trackName}`
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
    bandElement.innerText = `Artist Name: ${track.artistName}`
    newElement.appendChild(bandElement)
}

function showAlbumTitle(track) {
    let albumElement = document.createElement("p")
    albumElement.innerText = `Album Title: ${track.collectionName}`
    newElement.appendChild(albumElement)
}

// radio button attempts

//syntax: https://itunes.apple.com/search?parameterkeyvalue

let radioButtons = document.getElementsByClassName("radio")
searchSpecific()

function searchSpecific() {
    for (let radioBtn of radioButtons) {
        radioBtn.addEventListener("change", function (event) {
            if (event.target.id == "artistName") {
                console.log("searching by artist name")

                let searchTerm = result

                newArtistUrl = `https://itunes.apple.com.search?term=${searchField.value}&entity=musicArtist.`
                console.log(newArtistUrl)
                console.log(`${searchField.value}`)

            } else if (event.target.id === "songTitle") {
                console.log("searching by song title")
                newArtistUrl = `https://itunes.apple.com.search?term=${searchField.value}&entity=song.`
                console.log(newArtistUrl)
                console.log(`${searchField.value}`)

            } else if (event.target.id === "albumTitle") {
                console.log("searching by Album Title")
                newArtistUrl = `https://itunes.apple.com.search?term=${searchField.value}&entity=album.`
                console.log(newArtistUrl)

            }
            else {
                newArtistUrl = "https://itunes.apple.com/search?term=" + result + "."
            }
        })
    }
}