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
            // when i logged data.results [0,1,2,3,4] different artists showed up... WHY
            let resultElement = document.getElementById("log");
            resultElement.innerText = data.results[0]
            showDeets(data)

            function showDeets() {
                let nameElement = document.createElement("p")
                nameElement.innerText = `${data.results.artistName}`
                console.log(nameElement.innerText)
                resultElement.appendChild(nameElement)
            }
        })

}
