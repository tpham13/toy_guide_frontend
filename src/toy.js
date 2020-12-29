console.log("in toy js")
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
         this.toy_category = toyAttributes.toy_category
        Toy.all.push(this);
        
    }
    renderToys(){
        //if there's issue, it's due to innerhtml. 
        //this is a string
        //use createlement then append to the div then render append div to the toy container. this way we can add eventlistener direxctly to the button
        // debugger
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
          
      }
    
}
Toy.all = [];