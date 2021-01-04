console.log('in appContainer')
class AppContainer {
    static toys = [];
    toyCategories = [];
    toysEndPoint = "http://localhost:3000/api/v1/toys";
    // randomToy = [];
    
    
    bindEventListeners() { 
        const button = document.getElementById("get selected toys button");
        document.addEventListener("", this.getToys());
         button.addEventListener('click', this.getSelectedToys());
        
        const createToyFormButton = document.querySelector("#create-toy-form");
        createToyFormButton.addEventListener("submit", this.createFormHandler);
    };

    //add html to append getToysLessThan
    getToysLessThan() {
        console.log('get toy less than...')
        let toysLessThanThirtyDollar = AppContainer.toys.filter(function (e) {
            return e.price < 30;
        });

    }

    getSelectedToys() {
        // debugger
        // const toys = [];
        // const selectedToy = new GetSelectedToy(toys);
        console.log('display selected toy')
        const getSelectedToyButton = document.getElementById('get selected toys button');
        const selectBirthToOneToy = document.getElementById('birth to one');
            
        getSelectedToyButton.onclick = (e) => { 
            console.log(e)
            e.preventDefault();
            const selectedValues = [].filter
            
                .call(selectBirthToOneToy.options, option => option.selected)
                
                .map(option => option.text);

                // return selectedValues
            
            console.log(selectedValues)
        };
        
        
        
        let returnToy = AppContainer.toys.filter(function(e) {
            return e
        

    });
    //currently an empty array returned
    console.log(returnToy);
        
        // toyLi.innerText = selectedValues;
        // // const showToy = document.createTextNode("Coffee");
        // toyOl.appendChild(toyLi);
    
    //     // when select toy button is clicked, toys content will be displayed on page 

   
}
    // renderSelectedToy(){
    
    getToys(){
        fetch(this.toysEndPoint)
        .then(response => response.json())
        .then(toys => {
        //   // Use this data inside of `json` to do DOM manipulation
            console.log(toys);
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

    //POST request
    createFormHandler(e) {
        console.log("in create form handler")
        e.preventDefault()
        // console.log(e);
        //grab all the value of the form inputs
        const titleInput = document.querySelector("#input-title").value
        const descriptionInput = document.querySelector("#input-description").value
        const priceInput = parseFloat(document.querySelector("#input-price").value)
        const urlInput = document.querySelector("#input-url").value
        const categoryId = parseInt(document.querySelector("#categories").value)
        postFetch(titleInput, descriptionInput, priceInput, urlInput, categoryId)
    }
    
    postFetch(title, description, price, url, toy_category_id) {
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
}