document.addEventListener('click', function(e) {
    console.dir(e.target)
})

document.addEventListener('DOMContentLoaded', function(e) {
     ToyCategory.all();
})

document.addEventListener('submit', function(e) {
    let target = e.target;
    if(target.matches('#newToyCategory')){
        //the form doesn't have an action attribute, so it will refresh
        //what does preventDefault do to a form?
        e.preventDefault();
        // console.log('submitted newToyCategory')
        let formData = {}
        target.querySelectorAll('input').forEach(function(input) {
            formData[input.name] = input.value;
        })
        ToyCategory.create(formData);
        
    }
  
}) 