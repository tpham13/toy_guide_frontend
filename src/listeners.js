document.addEventListener('click', function(e) {
    console.dir(e.target)
})

document.addEventListener('DOMContentLoaded', function(e) {
     ToyCategory.all();
})

document.addEventListener('click', function(e) {
    let target = e.target;

    if(target.matches(".selectToyCategory")) {
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
        //b/c create return a promise, we can change on a call back here to reset the form after submission 
            .then(() => {
                target.querySelectorAll('input').forEach(function(input) {
                    input.value = "";
                })
            });

        // debugger
        } else if(target.matches('#newToyForm')) {
        e.preventDefault();
        let formData = {};
        target.querySelectorAll('input').forEach(function(input) {
            formData[input.title] = input.value;
        });
        Toy.create(formData)
        //b/c create return a promise, we can change on a call back here to reset the form after submission 
            // .then(() => {
            //     target.querySelectorAll('input').forEach(function(input) {
            //         input.value = "";
            //     })
            // });
        }
})


