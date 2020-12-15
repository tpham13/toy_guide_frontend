//declare enpoints
const toysEndPoint = "http://localhost:3000/api/v1/toys"
//List ToyCategory.all()

//fetch('/toy_categories)
document.addEventListener("DOMContentLoaded", () => {
  getToys()
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


//Build Todolist objects, store them in this.collection, render them and add them to this.container() DOM element

fetch("http://localhost:3000/api/v1/toy_categories")
.then(function(response) {
  return (response.json());
})
.then(function(json){
  // Use this data inside of `json` to do DOM manipulation
  console.log(json)
});

