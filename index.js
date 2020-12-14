document.addEventListener("DOMContentLoaded", function() {
  console.log("The DOM has loaded");
});


fetch("http://localhost:3000/toy_categories")
.then(function(response) {
  console.log(response.json());
})
.then(function(json){
  // Use this data inside of `json` to do DOM manipulation
});



fetch("http://localhost:3000/toys")
.then(function(response) {
  console.log(response.json());
})
.then(function(json){
  // Use this data inside of `json` to do DOM manipulation
});

