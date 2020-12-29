console.log('in appContainer')
const toysEndPoint = "http://localhost:3000/api/v1/toys"
class AppContainer {
    toys = []
    toyCategories = []
    url = ""
    randomToy = []

    getToys(){
        fetch(toysEndPoint)
        .then(response => response.json())
        .then(toys => {
        //   // Use this data inside of `json` to do DOM manipulation
            console.log(toys);
        //     toys.data.forEach(toy => {
        //       let newToy = new Toy(toy, toy.attributes)
        //       document.querySelector('#toy-container').innerHTML +=newToy.renderToys();
        //     })
            
          })
          .catch(err => console.log(err))
    }
    // getToys() {
    //     //fetch to toys
    //     //populate the toys and toy categories properties with the return data
    //     //call renderToys

    // }

    renderToys() {
        //create DOM nodes and insert data into them to render in the DOM

    }
}