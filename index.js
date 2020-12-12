
// const APIController = (function() { 

//     const _getBabyToddlerToys = async () => {

//         const limit = 10;
        
//         const result = await fetch(`https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?api_key=hxr4z7lluezdeklqxdzk6pj5&taxonomy_id=1580&taxonomy_id=1581`);
        
//         const data = await result.json();
//         return data;
//     };
    
// }


fetch("https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?api_key=hxr4z7lluezdeklqxdzk6pj5&taxonomy_id=1580&taxonomy_id=1581")
.then(function(response) {
  console.log(response.json());
})
.then(function(json){
  // Use this data inside of `json` to do DOM manipulation
});




