//console log to make sure toy.js is loaded or can be read
console.log("in toy js");
//to get the list of toy, we need to send in the toy params from the back-end in here
//the params key name has to look exactly like the back end
// const toyParams = {title, description, price, url, toy_category_id}

class Toy {  
     constructor(toy, toyAttributes) {
         this.id = toy.id 
         this.title = toyAttributes.title
         this.description = toyAttributes.description
         this.price = toyAttributes.price
         this.url = toyAttributes.url
        Toy.all.push(this);
        debugger
    }

}
Toy.all = [];