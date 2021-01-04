console.log('in appContainer')

class Category {
    /*
    new Category{id: 1, name: "Birth to One"}
    */
   constructor(attributes) {
       let whitelist = ["id", "name", "active"]
       whitelist.forEach(attr => this[attr] = attributes[attr])
   }

   /*
   Category.list() returns a reference to this DOM node:
   <ul id="lists" class="list-none"
   </ul>
    */

    static toyCategory() {
        return this.c ||= document.querySelector("#categories")
    }

    /*
    Category.all() will return a promise for all of the category objects that 
    we get from fetching to /categories. This collection will be stored locally 
    in Category.collection so we can reference it after the initial call to Category.all()
    */

   static all() {
    // console.log('.all() was called')
    return fetch("http://localhost:3000/api/v1/toy_categories", {
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    /*=> function is used here and the next .then is b/c we're defining function that we want to 
    have the same context as the function static all(). If we console.log(this) inside this function 
    this is reference to Category class
    */
        .then(res => {
            if(res.ok) {
                return res.json() //returns a promise for body content parsed as JSON
            } else {
                return res.text().then(error => Promise.reject(error)) //return a reject promise so we skip the following then and go to catch 
            }
    })
        .then(toyCategoryArray => {
            /*we want to store the new collection that we created inside the class variable this.collection
            so we can access/call it later */
            this.collection = toyCategoryArray.map(attrs => new Toy_Category(attrs))
            // console.log(this)
            // debugger
        })
    }

    /*
    toyCategory.render() will create an li element and assign it to this.element. 
    It will then fill the element with contents looking like below html:
    <li class="my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6">
          <a href="#" class="py-4 col-span-10 sm:col-span-4">Category 1</a>
          <a href="#" class="my-4 text-right"><i class="fa fa-pencil-alt"></i></a>
          <a href="#" class="my-4 text-right"><i class="fa fa-trash-alt"></i></a>
        </li>
    */
    render() {
        //we use ||= here b/c render will get call more than once
        this.element ||= document.createElement('li');
        this.element.class = "my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6"
        
        this.nameLink ||= document.createElement('a');
        this.nameLink.class = "py-4 col-span-10 sm:col-span-4";
        this.nameLink.textContent = this.name;

        this.editLink ||= document.createElement('a');
        this.editLink.class = "my-4 text-right";
        this.editLink.innerHTML = `<i class="fa fa-pencil-alt"></i>`;

        this.deleteLink ||= document.createElement('a');
        this.deleteLink.class = "my-4 text-right";
        this.deleteLink.innerHTML = `<i class="fa fa-trash-alt"></i>`;

        this.element.append(this.nameLink, this.editLink, this.deleteLink);

        return this.element;


    }
}

class Toys {
    constructor(attributes) {
        let whitelist = ["id", "title", "description", "price", "url"]
        whiltelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#toys")
    }
}





//----------------------------------------------------------------
// console.log('in appContainer')
// class AppContainer {
//     static toys = [];
//     toyCategories = [];
//     toysEndPoint = "http://localhost:3000/api/v1/toys";
//     // randomToy = [];
    
    
//     bindEventListeners() { 
//         const button = document.getElementById("get selected toys button");
//         document.addEventListener("", this.getToys());
//          button.addEventListener('click', this.getSelectedToys());
        
//         const createToyFormButton = document.querySelector("#create-toy-form");
//         createToyFormButton.addEventListener("submit", this.createFormHandler);
//     };

//     //add html to append getToysLessThan
//     getToysLessThan() {
//         console.log('get toy less than...')
//         let toysLessThanThirtyDollar = AppContainer.toys.filter(function (e) {
//             return e.price < 30;
//         });

//     }

//     getSelectedToys() {
//         // debugger
//         // const toys = [];
//         // const selectedToy = new GetSelectedToy(toys);
//         console.log('display selected toy')
//         const getSelectedToyButton = document.getElementById('get selected toys button');
//         const selectBirthToOneToy = document.getElementById('birth to one');
            
//         getSelectedToyButton.onclick = (e) => { 
//             console.log(e)
//             e.preventDefault();
//             const selectedValues = [].filter
            
//                 .call(selectBirthToOneToy.options, option => option.selected)
                
//                 .map(option => option.text);

//                 // return selectedValues
            
//             console.log(selectedValues)
//         };
        
        
        
//         let returnToy = AppContainer.toys.filter(function(e) {
//             return e
        

//     });
//     //currently an empty array returned
//     console.log(returnToy);
        
//         // toyLi.innerText = selectedValues;
//         // // const showToy = document.createTextNode("Coffee");
//         // toyOl.appendChild(toyLi);
    
//     //     // when select toy button is clicked, toys content will be displayed on page 

   
// }
//     // renderSelectedToy(){
    
//     getToys(){
//         fetch(this.toysEndPoint)
//         .then(response => response.json())
//         .then(toys => {
//         //   // Use this data inside of `json` to do DOM manipulation
//             console.log(toys);
//             toys.data.forEach(toy => {
//               let newToy = new Toy(toy, toy.attributes)
//               //when console.log(AppContainer.toys) here, we see that objects are adding to the array
//             //   document.querySelector('#toy-container').innerHTML +=newToy.renderToys();
//             });
//             this.renderToys();
            
//           })
//           .catch(err => console.log(err))
//           //when we console.log(AppContainer.toys) here, the array is empty
          
//     }
    
//     renderToys(){
//         const birthToOneSelect = document.getElementById('birth to one');
//         const learningAndSchoolSelect = document.getElementById('learning and school');
//         const puzzleSelect = document.getElementById('puzzle');
//         AppContainer.toys.forEach(toy => {
//             // console.log(toy)
            
//             const option = document.createElement('option');
//             option.innerText = toy.title;
//             // console.log(option.innerText)
//             //where we append will be conditional based on what category it belongs to
//             // ul.appendChild(li);
//             switch(toy.toy_category.name) {
//                 case "Birth to One": 
//                     birthToOneSelect.appendChild(option); 
                    
//                     break;
//                 case "Learning and School":
//                     learningAndSchoolSelect.appendChild(option);
//                     // console.log(toy)
//                     break;
//                 case "Puzzle":
//                     puzzleSelect.appendChild(option);
//                     break;
//             }

//         })    
//     };

//     //POST request
//     createFormHandler(e) {
//         console.log("in create form handler")
//         e.preventDefault()
//         // console.log(e);
//         //grab all the value of the form inputs
//         const titleInput = document.querySelector("#input-title").value
//         const descriptionInput = document.querySelector("#input-description").value
//         const priceInput = parseFloat(document.querySelector("#input-price").value)
//         const urlInput = document.querySelector("#input-url").value
//         const categoryId = parseInt(document.querySelector("#categories").value)
//         postFetch(titleInput, descriptionInput, priceInput, urlInput, categoryId)
//     }
    
//     postFetch(title, description, price, url, toy_category_id) {
//         //build toy object outside of fetch
//         const bodyData = {title, description, price, url, toy_category_id}
//         fetch(toysEndPoint,{
//         method: 'POST', 
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(bodyData)
        
//     })
//     .then(response => response.json())
//     .then(toy => { 
//         console.log(toy);
//         const toyData = toy.data
//         let newToy = new Toy(toyData, toyData.attributes)
//         document.querySelector('#toy-container').innerHTML +=
//         newToy.renderToys()
        
//     })
//     //catch the error when one input is empty, 
//     //but the error doesn't show on the browser, why? 
//     .catch(err => console.log(err))
//     // debugger
//     }
// }