# SELECT TOY CATEGORY AND RENDER TOYS FOR THAT CATEGORY: 
## What event do we need to handle?
Click event on the 'a' tag for selecting a toy category. 
## what is the target element of that event? 
the 'nameLink of the toyCategory we're trying to select. We need to add a class to recognize the nameLink
## what info do we need to access to when the event happens?
we need to access the toy_category_id
## How and where do we ensure access to said information when the event occurs? 
we're going to need a data attribute on the target element so we can identify the id from the click. 
## Which model method(s) are we involking when this event happens?
ToyCategory.findById => toyCategory instance matching the id passed as an argument 
ToyCategory.show() => {
    -fetch the /toy_categories/:id route to get the toyCategory and its associated toyCategories
    -use the response to create toyCategory instances client side by invoking toy.- loadByToyCategory(id, toysAttributes)
    (In the server side, we can serialize our data to only grab the toy_category_id and the toy attributes that's included in the toy_category as well)
    
}
Toy.loadByToyCategoryId(id, toysAttributes) => {
    -uses tasksAttributes to create toy instances with those attributes
    -store those toy instances in Toy.collection 
    call render on each to generate 'li' elements we'll use to display the toys 
    append the toys to the Toy.container() 
}

## If we need to invoke an instance method, how do we access the approprriate instance? 
We use ToyCategory.findById(id) to find the toyCategory

## Inside the model method, If we're sending a fetch request, how should our client side data change in response? 

## If something goes wrong on the server side, how do we handle the error client side? 

## Once the client side data has changed in response, how is the DOM affected? Are we inerting, removing or updating existing nodes?
## If inserting, where are we doing so? If removing, how do we identify the node(s) to be removed? If updating, how do we find the approprriate node and how do we update 