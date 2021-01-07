console.log('in appContainer')

class ToyCategory {
    /*
    new Category{id: 1, name: "Birth to One"}
    */
   constructor(attributes) {
       let whitelist = ["id", "name", "active"]
       whitelist.forEach(attr => this[attr] = attributes[attr])
   }

   /*
   Category.container() returns a reference to this DOM node:
    <section id="categoriesContainer" class="px-4 bg-blue-100 sm:min-h-screen rounded-md shadow">
        <h1 class="text-2xl semibold border-b-4 border-blue">Toy Categories</h1>
        <ul id="toy categories" class="list-none">
        </ul>
    </section>
    */
    static container() {
        return this.c ||= document.querySelector("#toyCategories")
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
            this.collection = toyCategoryArray.map(attrs => new ToyCategory(attrs))
            let renderedToyCategories = this.collection.map(toyCategory => toyCategory.render())
            //spread operator is used here to render separated element instead of rendering an array
            this.container().append(...renderedToyCategories);
            // console.log(this)
            /*we might use this collection again later so we'll return this.collection here 
            to return a promise for that
            */
            return this.collection
            
        })
        
    }
    /*
    ToyCategory.findById(id) => accepts an id as an argument and returns the todoList matching that id.
    */
    static findById(id) {
        return this.collection.find(toyCategory => toyCategory.id == id);
    }
    /* ToyCategory.show() => {
        fetch the /toy_categories/:id route to get the toyCategory and its associated toys
        use the response to create toy instances client side by invoking toy.loadByToyCategory(id, toysAttributes)
        (In the server side, we can serialize our data to only grab the toy_category_id and the toy attributes that's included in the toy_category as well)
    }
    */
    show() {
        console.log('inside show')
        return fetch(`http://localhost:3000/api/v1/toy_categories/${this.id}`, {
            method: 'GET', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }) 
            .then(res => {
                if(res.ok) {
                    return res.json()
                }  else {
                    return res.text().then(error => Promise.reject(error))
                }
            })
            .then(({id, toysAttributes}) => {
                console.log('inside callback')
                Toy.loadByToyCategory(id, toysAttributes)
                this.render();
                // debugger
            })
            .catch(err => {
                return res.text().then(err => Promise.reject(err))
            })

    }
    /*
    ToyCategory.create(formData) will make a fetch request to create a 
    new Toy Category in our database. 
    It will use a sucessful response to create a new Todo List client side and store it in this.collection. 
    It will also call render() on it to create the DOM element we'll suse to represent it in our web page. 
    Finally it will add that DOM node to ToyCategory.container(). 
    It will return a promise for ToyCategory object that was created
    */
    static create(formData) {
        //when sending a post request, it takes in a 2nd argument
        return fetch("http://localhost:3000/api/v1/toy_categories", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            /*when we send info to the server, we don't want to send object, we want to send the string. 
            formData is an object, and JSON.stringify method turns it into the string format in JS object notation and that allow that 
            string to be parse in Ruby when it gt to the server and then use as a hash to create a new Toy Category on the server side.
            Then we convert it into a string again before it send back to the client side.
            */
            body: JSON.stringify({toy_category: formData})
        })
            .then(res => {
                if(res.ok) {
                    return res.json() //returns a promise for body content parsed as JSON
                } else {
                    return res.text().then(errors => Promise.reject(errors)) //return a reject promise so we skip the following then and go to catch 
                }
            })
            .then(toyCategoryAttributes => {
                let toyCategory = new ToyCategory(toyCategoryAttributes);
                this.collection.push(toyCategory);
                this.container().appendChild(toyCategory.render());
                new FlashMessage({type: 'success', message: 'New toy category added successfully'})

                return toyCategory;
                // debugger
            })
            .catch(error => {
                new FlashMessage({type: 'error', message: error});
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
    render(){
        
        // console.log('in render')
        //we use ||= here b/c render will get call more than once
        this.element ||= document.createElement('li');
        this.element.classList.add(..."my-2 px-4 bg-teal-200 grid grid-cols-12 sm:grid-cols-6".split(" "));
        
        this.nameLink ||= document.createElement('a');
        this.nameLink.classList.add(..."py-4 col-span-10 sm:col-span-4 selectToyCategory".split(" "));
        this.nameLink.textContent = this.name;
        this.nameLink.dataset.toyCategoryId = this.id;

        
        this.editLink ||= document.createElement('a');
        this.editLink.classList.add(..."my-4 text-right".split(" "));
        this.editLink.innerHTML = `<i class="fa fa-pencil-alt"></i>`;

        this.deleteLink ||= document.createElement('a');
        this.deleteLink.classList.add(..."my-4 text-right".split(" "));
        this.deleteLink.innerHTML = `<i class="fa fa-trash-alt"></i>`;
    
        this.element.append(this.nameLink, this.editLink, this.deleteLink);
        return this.element;
    }

}


class Toy {
    constructor(attributes) {
        let whitelist = ["id", "title", "description", "price", "url", "toy_category_id"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#toys")
    }

    static collection() {
        return this.col ||= {}
    }
    /* 
    static loadByToyCategory(id, toysAttributes) => {
        create toy instances using toysAttributes 
        call render on each of the instances to build the associated DOM node
        clear out the container() contents
        append the rendered instances to the container
    */
    static loadByToyCategory(id, toysAttributes) {
        
        let toys = toysAttributes.map(toyAttributes => new Toy(toyAttributes));
        this.collection()[id] = toys;
        
        let rendered = toys.map(toy => toy.render())
        this.container().innerHTML = "";
        
        this.container().append(...rendered)
        // debugger
    } 
    /*
    Toy.create(formData) => {
        will make a fetch request using the form data to create a new task instance.
        if the reponse is okay, we'll parse it as JSON and return that 
        we'll use the data we parsed to create a new task instance, store it in collection() render it and add it to DOM at container().
        if the reponse is not OK we'll return a rejected promise for the error and catch it with a callback which will display it in a FlashMessage.
    }
     */
    static create(formData) {
        console.log('in toy create')
        if(!Toy.toy_category_id) {
            return new FlashMessage({type: 'error', message: "Please select a category before adding a new toy"});
        } else {
            formData.toy_category_id = Toy.toy_category_id;
            debugger
        }
        
        console.log(formData);
        // return fetch('http://localhost:3000/api/v1/toys', {
        //     method: 'POST',
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     }, 
        //     body: JSON.stringify( {
        //         toy: formData
        //     })
        // })
        //     .then(res => {
        //         if(res.ok) {
        //             return res.json()
        //         } else {
        //             return res.text().then(err => Promise.reject(error))
        //         }
        //     })
        //     .then(toyData => {
        //         let toy = new Toy(toyData);
        //         debugger
        //         this.collection()[Toy.toy_category_id].push(task);
        //         this.container().append(task.render())
        //     })
        //     .catch(error => {
        //         return new FlashMessage({type: 'error', message: error})
        //     })
        
    }
    /*
    li class="my-2 px-4 bg-green-200 grid grid-cols-12">
          <a span class="py-1 col-span-10">Toy 1</a>
          <a href="#" class="my-1 text-right"><i class="fa fa-pencil-alt"></i></a>
          <a href="#" class="my-1 text-right"><i class="fa fa-trash-alt"></i></a>
    </li>
    */
   render() {
       this.element = document.createElement('li')
       this.element.classList.add(..."my-2 px-4 bg-purple-200 grid grid-cols-12".split(" "));
       
       this.titleSpan ||= document.createElement('span');
       this.titleSpan.classList.add(..."py-2 col-span-10".split(" "));
       this.titleSpan.textContent = this.title

       this.descriptionSpan ||= document.createElement('span');
       this.descriptionSpan.classList.add(..."py-2 col-span-10".split(" "));
       this.descriptionSpan.textContent = this.description

       this.priceSpan ||= document.createElement('span');
       this.priceSpan.classList.add(..."py-2 col-span-10".split(" "));
       this.priceSpan.textContent = `$${this.price}`

       this.urlSpan ||= document.createElement('span');
       this.urlSpan.classList.add(..."py-2 col-span-10".split(" "));
       this.urlSpan.textContent = this.url

       this.editLink ||= document.createElement('a');
       this.editLink.classList.add(..."my-1 text-right".split(" "));
       this.editLink.innerHTML = `<i class="fa fa-pencil-alt"></i>`;

       this.deleteLink ||= document.createElement('a');
       this.deleteLink.classList.add(..."my-1 text-right".split(" "));
       this.deleteLink.innerHTML = `<i class="fa fa-trash-alt"></i>`;
       
       this.element.append(this.titleSpan, this.editLink, this.deleteLink, this.descriptionSpan, this.priceSpan, this.urlSpan)
       return this.element;

   }
}

/*
new Flashmessage({type: 'error, message: 'name is required'})
this will create the flash message and fade it in. It'll also trigger a fade out in 5 sec.
 */
class FlashMessage {
    constructor({type, message}){
        this.message = message;
        //type will be used to determine background color
        //color will be red if it's an error type, blue if it's not
        this.color = type == "error" ? 'bg-red-200' : 'bg-blue-100';
        this.render();
    }
    //when it's a static message it can only be call on the Class itself, not an instance of a class
    static container() {
        return this.c ||= document.querySelector('#flash')
    }
    render() {
        // debugger
        this.toggleMessage();
        //error function here makes sure that when this function gets executed, the context will be the same. So we'll still have access to the message and color. 
        window.setTimeout(() => this.toggleMessage(), 5000);
    }
    toggleMessage() {
        // console.log(this);
        FlashMessage.container().textContent = this.message; 
        FlashMessage.container().classList.toggle(this.color);
        FlashMessage.container().classList.toggle('opacity-0');
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