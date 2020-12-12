// const babyToddlerUrl = "http://localhost:3000/users"
//          function getBabyToddlerToy() {
//             return fetch(babyToddlerUrl);
//             .then( function (response))
//         }
//         console.log(getBabyToddlerToy());

fetch("https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?api_key=hxr4z7lluezdeklqxdzk6pj5&taxonomy_id=1580&taxonomy_id=1581")
.then(function(response) {
  console.log(response.json());
})
.then(function(json){
  // Use this data inside of `json` to do DOM manipulation
})

// const APIController = (function() { 
//     const clientId = 'hxr4z7lluezdeklqxdzk6pj5'; 
//     const clientSecret = 'yu594ri77y'; 


//     const _getToken = async() => {
//         const result = await fetch('https://openapi.etsy.com/v2/listings/active?api_key=hxr4z7lluezdeklqxdzk6pj5&taxonomy_id=1580&taxonomy_id=1581', {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/',
//                 'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)
//             },
//             body: 'grant_type=client_crediential'
//         });
//         const data = await result.json();
//         return data.access_token;
//     }

// })();
// fetch("https://openapi.etsy.com/v2/listings/active?api_key=hxr4z7lluezdeklqxdzk6pj5&taxonomy_id=1580&taxonomy_id=1581", {
//     headers: {"Content-Type": "application/json", 
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Request-Headers": "*",
//     "Access-Control-Request-Method": "*" } })
//     .then(response => response.json())
//     .then(data => console.log(data));