//declare enpoints
const toysEndPoint = "http://localhost:3000/api/v1/toys"
//List ToyCategory.all()

//fetch('/toy_categories)
document.addEventListener("DOMContentLoaded", () => {
  getToys()

  const createToyForm = document.querySelector("#create-toy-form")
  createToyForm.addEventListener("submit", (e) => createFormHandler(e))
});

//making GET request
function getToys(){
  fetch(toysEndPoint)
  .then(response => response.json())
  .then(toys => {
    // Use this data inside of `json` to do DOM manipulation
      toys.data.forEach(toy => {
        const toyMarkup = `
        <div data-id=${toy.id}>
          <h3>${toy.attributes.title}</h3>
          <p>${toy.attributes.toy_category.name}</p>
          <button data-id=${toy.id}>edit</button>
        </div>
        <br><br>`;
        //we use the #toy-container b/c it's an id in html
        document.querySelector('#toy-container').innerHTML +=toyMarkup
      })
    })
  }

//POST request
function createFormHandler(e) {
  e.preventDefault()
  //grab all the value of the form inputs
  debugger
  const titleInput = document.querySelector("#input-title").value
  const descriptionInput = document.querySelector("#input-description").value
  const priceInput = document.querySelector("#input-price").value
  const categoryId = document.querySelector("#categories").value
  postFetch(titleInput, descriptionInput, priceInput, categoryId)
}

function postFetch(title, description, price, category_id) {
  
}

fetch("http://localhost:3000/api/v1/toy_categories")
.then(function(response) {
  return (response.json());
})
.then(function(json){
  // Use this data inside of `json` to do DOM manipulation
  console.log(json)
});

