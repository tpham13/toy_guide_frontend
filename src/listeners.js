document.addEventListener('click', function(e) {
    console.dir(e.target)
})

document.addEventListener('DOMContentLoaded', function(e) {
     ToyCategory.all();
})

document.addEventListener('click', function(e) {
    //target will be the anchor tag ->nameLink: selectToyCategory which is an attribute of the toyCategory
    let target = e.target;

    if(target.matches(".selectToyCategory")) {
        //to assigning data attribute in JS, you need to use 'dataset' property
        // console.log('selectToyCategory', target.dataset.toyCategoryId)
        let toyCategory = ToyCategory.findById(target.dataset.toyCategoryId)
        toyCategory.show()
    }
})
document.addEventListener('submit', function(e) {
    
    let target = e.target;
    if(target.matches('#newToyCategory')){
        //the form doesn't have an action attribute, so it will refresh
        //what does preventDefault do to a form?
        e.preventDefault();
        // console.log('submitted newToyCategory')
        let formData = {}
        //the target of the event is always going to be the form that we submitted
        target.querySelectorAll('input').forEach(function(input) {
            formData[input.name] = input.value;
        })
        
        ToyCategory.create(formData)
        //b/c create return a promise, we can chain on a call back here to reset the form after submission 
            .then(() => {
                target.querySelectorAll('input').forEach(function(input) {
                    input.value = "";
                })
            });
        } else if(target.matches('#newToyForm')) {
        e.preventDefault();
        let formData = {};
        target.querySelectorAll('input').forEach(function(input) {
            formData[input.title] = input.value;
            formData[input.description] = input.value
            // formData[input.price] = parseFloat(input.value)
            // formData[input.url] = input.value
         // const titleInput = document.querySelector("#input-title").value
//         const descriptionInput = document.querySelector("#input-description").value
//         const priceInput = parseFloat(document.querySelector("#input-price").value)
//         const urlInput = document.querySelector("#input-url").value
//         const categoryId = parseInt(document.querySelector("#categories").value)
        });
        Toy.create(formData)
        // b/c create return a promise, we can change on a call back here to reset the form after submission 
            .then(() => {
                target.querySelectorAll('input').forEach(function(input) {
                    input.value = "";
                })
            });
        }
})


