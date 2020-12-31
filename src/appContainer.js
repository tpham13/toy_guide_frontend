console.log('in appContainer')
class AppContainer {
    static toys = [];
    toyCategories = [];
    toysEndPoint = "http://localhost:3000/api/v1/toys";
    randomToy = [];
    
    
    bindEventListeners() { 
        const button = document.getElementById("get selected toys button");
        //bind is use here so that everytime we call 'this' it's refer to the class itself
        button.addEventListener('click', this.displaySelectedToys)
        document.addEventListener("", this.getToys())
        //  button.addEventListener('click', this.displaySelectedToys())
    };

    //add html to append getToysLessThan
    getToysLessThan() {
        console.log('get toy less than...')
        let toysLessThanThirtyDollar = AppContainer.toys.filter(function (e) {
            return e.price < 30;
        });

    }

    displaySelectedToys() {
        console.log('display selected toy')
        const getSelectedToyButton = document.getElementById('get selected toys button');
        const selectBirthToOneToy = document.getElementById('birth to one');
        
        getSelectedToyButton.onclick = (e) => {
            
            e.preventDefault();
            const selectedValues = [].filter
            
                .call(selectBirthToOneToy.options, option => option.selected)
                .map(option => option.text);
                debugger
            
            const toyMarkup = `
                <div data-id=${AppContainer}>
                    <h3>${selectedValues}</h3>
                </div>`
                console.log(toyMarkup)
            return toyMarkup;
        };
        // const toyLi = document.createElement("li");
        // const showToy = document.createTextNode("Coffee");
        // toyLi.appendChild(showToy);
        // document.getElementById("show toy").appendChild(toyLi);
        //when select toy button is clicked, toys content will be displayed on page 

    };

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
            // console.log(toy)
            
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