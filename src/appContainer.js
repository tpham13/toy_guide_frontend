console.log('in appContainer')
class AppContainer {
    static toys = [];
    toyCategories = [];
    toysEndPoint = "http://localhost:3000/api/v1/toys";
    randomToy = [];
    
    
    bindEventListeners() { 
        const button = document.getElementById("getToys");
        //bind is use here so that everytime we call 'this' it's refer to the class itself
        
        button.addEventListener('click', this.getToysLessThan)
        
    };

    getToysLessThan() {
        console.log('get toy less than...')
        let toysLessThanThirtyDollar = AppContainer.toys.filter(function (e) {
            return e.price < 30;
        });
        console.log(toysLessThanThirtyDollar);
        
    //     let toysLessThanThirtyDollar = [];
    //         for (let i = 0; i < this.toys.length; i++) {
    //             debugger
    //             if (this.toys[i].price >= 30) {
    //                 toysLessThanThirtyDollar.push(this.toys[i]);
    //             }
            
    //         return toysLessThanThirtyDollar;
    // }
    // console.log(toysLessThanThirtyDollar);

    }
    getToys(){
        fetch(this.toysEndPoint)
        .then(response => response.json())
        .then(toys => {
        //   // Use this data inside of `json` to do DOM manipulation
            console.log(toys);
            toys.data.forEach(toy => {
              let newToy = new Toy(toy, toy.attributes)
              console.log(AppContainer.toys)
            //   document.querySelector('#toy-container').innerHTML +=newToy.renderToys();
            })
            
          })
          .catch(err => console.log(err))
          
    }
    

    renderToys(){
        //if there's issue, it's due to innerhtml. 
        //this is a string
        //use createlement then append to the div then render append div to the toy container. this way we can add eventlistener direxctly to the button
        return `
          <div data-id=${this.id}>
            <h3>${this.title}</h3>  
            <p>${this.description}</p>    
            <p>$ ${this.price}</p>
            <p>${this.url}</p>
            <h4>${this.toy_category.name}</h4>
            <button data-id=${this.id}>edit</button>
          </div>
          <br><br>`;
          
      };
}