console.log('in appContainer')
class AppContainer {
    static toys = [];
    toyCategories = [];
    toysEndPoint = "http://localhost:3000/api/v1/toys";
    randomToy = [];
    
    
    bindEventListeners() { 
        const button = document.getElementById("getToys");
        //bind is use here so that everytime we call 'this' it's refer to the class itself
        
        button.addEventListener('click', this.getToys())
        
    };

    getToysLessThan() {
        console.log('get toy less than...')
        let toysLessThanThirtyDollar = AppContainer.toys.filter(function (e) {
            return e.price < 30;
        });
        // console.log(toysLessThanThirtyDollar);
        
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
            // console.log(toys);
            toys.data.forEach(toy => {
              let newToy = new Toy(toy, toy.attributes)
              //when console.log(AppContainer.toys) here, we see that objects are adding to the array
            //   document.querySelector('#toy-container').innerHTML +=newToy.renderToys();
            })
            this.renderToys();
            
          })
          .catch(err => console.log(err))
          //when we console.log(AppContainer.toys) here, the array is empty
          
    }
    
    renderToys(){
        const birthToOneSelect = document.getElementById('birth to one');
        const learningAndSchoolSelect = document.getElementById('learning and school');
        const puzzleSelect = document.getElementById('puzzle');
        AppContainer.toys.forEach(toy => {
            
            const option = document.createElement('option');
            option.innerText = toy.title;
            //where we append will be conditional based on what category it belongs to
            // ul.appendChild(li);
            switch(toy.toy_category.name) {
                case "Birth to One": 
                    birthToOneSelect.appendChild(option);
                    break;
                case "Learning and School":
                    learningAndSchoolSelect.appendChild(option);
                    break;
                case "Puzzle":
                    puzzleSelect.appendChild(option);
                    break;
            }

        })    
    };
}