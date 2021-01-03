console.log('in appContainer')
class AppContainer {
    static toys = [];
    toyCategories = [];
    toysEndPoint = "http://localhost:3000/api/v1/toys";
    // randomToy = [];
    
    
    bindEventListeners() { 
        const button = document.getElementById("get selected toys button");
        document.addEventListener("", this.getToys())
         button.addEventListener('click', this.getSelectedToys())

    };

    //add html to append getToysLessThan
    getToysLessThan() {
        console.log('get toy less than...')
        let toysLessThanThirtyDollar = AppContainer.toys.filter(function (e) {
            return e.price < 30;
        });

    }

    getSelectedToys() {
        fetch(this.toysEndPoint)
        .then(response => response.json())
        .then(toys => {
        //   // Use this data inside of `json` to do DOM manipulation
            // console.log(toys);
            toys.data.forEach(toy => {
              let newToy = new Toy(toy, toy.attributes)
              //when console.log(AppContainer.toys) here, we see that objects are adding to the array
            //   document.querySelector('#toy-container').innerHTML +=newToy.renderToys();
            });
            this.renderSelectedToy();
            
          })
    }
    
    renderSelectedToy() {

    }
    // getSelectedToys() {
    //     debugger
    //     // const toys = [];
    //     // const selectedToy = new GetSelectedToy(toys);
    //     console.log('display selected toy')
    //     const getSelectedToyButton = document.getElementById('get selected toys button');
    //     const selectBirthToOneToy = document.getElementById('birth to one');
        
    //     getSelectedToyButton.onclick = (e) => { 
            
    //         e.preventDefault();
    //         const selectedValues = [].filter
            
    //             .call(selectBirthToOneToy.options, option => option.selected)
                
    //             .map(option => option.text);
                
    //         // console.log(selectedValues)
        
    // AppContainer.toys.forEach(toy => {
    //     console.log(toy)
    //     // const option = document.createElement('option');
    //     const toyLi = document.createElement("li");
    //     const toyOl = document.getElementById("show toy");
    //     toyLi.innerText = toy.price;
    //     // console.log(option.innerText)
    //     //where we append will be conditional based on what category it belongs to
    //     // ul.appendChild(li);
    //     switch(toy) {
    //         // case if toy.toy_category.id = toyiD 
    //         //     render toy object; 
    //             // console.log(option)
    //             // break;
    //     }

    // })    
        
        
    //     // const showToy = AppContainer.toys.forEach(toy => {

    //         // if toy title is selected
    //         // if selectedValues = 
    //         // render this
    //     // })
        
    //     toyLi.innerText = selectedValues;
    //     // const showToy = document.createTextNode("Coffee");
    //     toyOl.appendChild(toyLi);
    
    // //     // when select toy button is clicked, toys content will be displayed on page 

    // };

    // // renderSelectedToy(){

    // }
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
            });
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
            // console.log(option.innerText)
            //where we append will be conditional based on what category it belongs to
            // ul.appendChild(li);
            switch(toy.toy_category.name) {
                case "Birth to One": 
                    birthToOneSelect.appendChild(option); 
                    
                    break;
                case "Learning and School":
                    learningAndSchoolSelect.appendChild(option);
                    // console.log(toy)
                    break;
                case "Puzzle":
                    puzzleSelect.appendChild(option);
                    break;
            }

        })    
    };
}