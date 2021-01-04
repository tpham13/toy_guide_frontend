const app = new AppContainer
// const getToyData = app.getToys()
const bindEvents = app.bindEventListeners();


fetch("http://localhost:3000/api/v1/toy_categories")
.then(function(response) {
  return (response.json());
})
.then(function(json){
  // Use this data inside of `json` to do DOM manipulation
  // console.log(json)
});

