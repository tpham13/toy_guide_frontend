//declare enpoints
const toysEndPoint = "http://localhost:3000/api/v1/toys"

document.addEventListener("DOMContentLoaded", () => {
  //when contentloaded (event), what kind of fetch do we need to make? (ans.: GET)
  getToys()

  const createToyForm = document.querySelector("#create-toy-form")
  //listen for the event "submit", then handle the inputs from the form
  createToyForm.addEventListener("submit", (e) => createFormHandler(e))
});

//making GET request
function getToys(){
  fetch(toysEndPoint)
  .then(response => response.json())
  .then(toys => {
    // Use this data inside of `json` to do DOM manipulation
      console.log(toys);
      toys.data.forEach(toy => {
        // debugger
        renderToy(toy)
        //find the #toy-container and update the innerhtml
      })
      
    })
    .catch(err => console.log(err))
  }

//POST request
function createFormHandler(e) {
  e.preventDefault()
  console.log(e);
  //grab all the value of the form inputs
  // debugger
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
//put catch at the end of a fetch here:
// .catch(err => console.log(err))
.then(toy => { 
  // debugger
    // console.log(toy);
    // const toyData = toy.data
    //render JSON response
    renderToy(toy.data)
    console.log(toy);
})

// .catch(err => console.log(err))
// debugger
}

function renderToy(toy){
  //if there's issue, it's due to innerhtml. 
  //this is a string
  //use createlement then append to the div then render append div to the toy container. this way we can add eventlistener direxctly to the button
  const toyMarkup = `
    <div data-id=${toy.id}>
      <h3>${toy.attributes.title}</h3>      
      <p>${toy.attributes.toy_category.name}<p>
      <button data-id=${toy.id}>edit</button>
    </div>
    <br><br>`;
    document.querySelector('#toy-container').innerHTML +=toyMarkup;
}

fetch("http://localhost:3000/api/v1/toy_categories")
.then(function(response) {
  return (response.json());
})
.then(function(json){
  // Use this data inside of `json` to do DOM manipulation
  console.log(json)
});

