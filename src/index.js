const app = new AppContainer
const getToyData = app.getToys()
const bindEvents = app.bindEventListeners();
//declare enpoints
// insert toysEndPoint to AppContainer
// // const toysEndPoint = "http://localhost:3000/api/v1/toys"

// document.addEventListener("DOMContentLoaded", () => {
//   //when contentloaded (event), what kind of fetch do we need to make? (ans.: GET)
//   bindEvents
//   getToyData
  

//   const createToyForm = document.querySelector("#create-toy-form")
//   //listen for the event "submit", then handle the inputs from the form
//   createToyForm.addEventListener("submit", (e) => createFormHandler(e))
// });

//making GET request
// function getToys(){
//   fetch(toysEndPoint)
//   .then(response => response.json())
//   .then(toys => {
//     // Use this data inside of `json` to do DOM manipulation
//       console.log(toys);
//       toys.data.forEach(toy => {
//         let newToy = new Toy(toy, toy.attributes)
//         document.querySelector('#toy-container').innerHTML +=newToy.renderToys();
//       })
      
//     })
//     .catch(err => console.log(err))
//   }

//POST request
function createFormHandler(e) {
  e.preventDefault()
  console.log(e);
  //grab all the value of the form inputs
  const titleInput = document.querySelector("#input-title").value
  const descriptionInput = document.querySelector("#input-description").value
  const priceInput = parseFloat(document.querySelector("#input-price").value)
  const urlInput = document.querySelector("#input-url").value
  const categoryId = parseInt(document.querySelector("#categories").value)
  postFetch(titleInput, descriptionInput, priceInput, urlInput, categoryId)
}

function postFetch(title, description, price, url, toy_category_id) {
  //build toy object outside of fetch
  const bodyData = {title, description, price, url, toy_category_id}
  fetch(toysEndPoint,{
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyData)
  
})
.then(response => response.json())
.then(toy => { 
    console.log(toy);
    const toyData = toy.data
    let newToy = new Toy(toyData, toyData.attributes)
    document.querySelector('#toy-container').innerHTML +=
    newToy.renderToys()
    
})
//catch the error when one input is empty, 
//but the error doesn't show on the browser, why? 
.catch(err => console.log(err))
// debugger
}
//deleted function renderToy(toy){}

fetch("http://localhost:3000/api/v1/toy_categories")
.then(function(response) {
  return (response.json());
})
.then(function(json){
  // Use this data inside of `json` to do DOM manipulation
  console.log(json)
});

