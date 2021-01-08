console.log('in toyCategory')

class ToyCategory {
    /*
    new Category{id: 1, name: "Birth to One"}
    */
   constructor(attributes) {
    //    console.log(attributes)
       this.id = attributes.id
       this.name = attributes.name
   }
   /*
   Category.container() returns a reference to this DOM node:
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
            
            this.collection = toyCategoryArray.map(attrs => new ToyCategory(attrs));
            // console.log(this.collection)
            this.collection.sort(function(a, b){
                let nameA=a.name, nameB=b.name;
                if (nameA < nameB) //sort string ascending
                 return -1;
                if (nameA > nameB)
                 return 1;
                return 0; //default return value (no sorting)
               });
           
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
        // double == here will return a string 
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
                //this is now the object that show() just called on
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
                let toyCategory = new ToyCategory(toyCategoryAttributes.data.attributes);
                this.collection.push(toyCategory);
                this.container().appendChild(toyCategory.render());
                new FlashMessage({type: 'success', message: 'New toy category added successfully'})

                return toyCategory;
            })
            .catch(error => {
                new FlashMessage({type: 'error', message: error});
            })
    }

    /*
    toyCategory.render() will create an li element and assign it to this.element. 
    It will then fill the element with contents looking like below html:
    */
    render(){
        //we use ||= here b/c render will get call more than once
        this.element ||= document.createElement('li');
        this.element.classList.add(..."my-2 px-4 bg-teal-200 grid grid-cols-12 sm:grid-cols-6".split(" "));
        
        this.nameLink ||= document.createElement('a');
        this.nameLink.classList.add(..."py-4 col-span-10 sm:col-span-4 selectToyCategory".split(" "));
        this.nameLink.textContent = this.name;
        /* dataset is adding a data attribute (data-toy-category-id) to the nameLink 'a' tag 
        and store the toyCategory id (is the value of data-toy-category-id) this html tag*/ 
        
        this.nameLink.dataset.toyCategoryId = this.id;

        // this.editLink ||= document.createElement('a');
        // this.editLink.classList.add(..."my-4 text-right".split(" "));
        // this.editLink.innerHTML = `<i class="fa fa-pencil-alt"></i>`;

        // this.deleteLink ||= document.createElement('a');
        // this.deleteLink.classList.add(..."my-4 text-right".split(" "));
        // this.deleteLink.innerHTML = `<i class="fa fa-trash-alt"></i>`;
    
        this.element.append(this.nameLink);
        return this.element;
    }

}