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
        Toy.toy_category_id = id;
        let toys = toysAttributes.map(toyAttributes => new Toy(toyAttributes));
        this.collection()[id] = toys;
        console.log(this.collection()[id])
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
            return Promise.reject().catch(() => new FlashMessage({type: 'error', message: "Please select a category before adding a new toy"}));
        } else {
            //add a key:value pairs to the formData object of the toy_category_id exist
            //Toy.toy_category_id is from the loadByToyCategory method
            formData.toy_category_id = Toy.toy_category_id;
            // debugger
        }
        
        console.log(formData);
        return fetch('http://localhost:3000/api/v1/toys', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify( {
                toy: formData
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json()
                } else {
                    return res.text().then(err => Promise.reject(error))
                }
            })
            .then(toyData => {
                let toy = new Toy(toyData);
                // debugger
                this.collection()[Toy.toy_category_id].push(toy);
                this.container().append(toy.render())
                return toy;
            })
            .catch(error => {
                return new FlashMessage({type: 'error', message: error})
            })
        
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
       this.editLink.innerHTML = `<i class="p-4 fa fa-pencil-alt"></i>`;

       this.deleteLink ||= document.createElement('a');
       this.deleteLink.classList.add(..."my-1 text-right".split(" "));
       this.deleteLink.innerHTML = `<i class="p-4  fa fa-trash-alt"></i>`;
       
       this.element.append(this.titleSpan, this.editLink, this.deleteLink, this.descriptionSpan, this.priceSpan, this.urlSpan)
       return this.element;

   }
}