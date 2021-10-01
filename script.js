const searchButton = document.getElementById('search-button');
const mealList = document.getElementById('recipe');
const mealDetails = document.querySelector('.ingredient-content');
const recipeCloseButton = document.getElementById('recipe-close');
const searchBox = document.getElementById('search-input');



searchButton.addEventListener('click', getMealList);
// Execute a function when the user releases a key on the keyboard
searchBox.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      searchButton.click();
    }
  });
  

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchInputTxt}&app_id=bccbc559&app_key=cc13861ca2f8a0eba915e8f45039a66a`)
    .then(response => response.json())
    .then(data => {
        console.log("recipe list", data)
        let html = "";
        console.log(data.hits.length)
        if(data.hits.length != 0){
            html += '<body>'
            data.hits.forEach(hit => {

                let calories = hit.recipe.calories.toString().split('.')[0]

                html += `
                    <div class = "recipe-card">
                        <div class="recipe-card-body">
                            <div>
                                <img src = "${hit.recipe.image}" class = "recipe-img" alt = "food">
                            </div>
                            <div class = "recipe-name" >
                                <h2>${hit.recipe.label}</h2>
                            </div>
                            <i class="fa fa-clock"> ${hit.recipe.totalTime} mins</i>
                            <i class="fa fa-users"> serves ${hit.recipe.yield}</i>
                            <div class="recipe-calories">
                                <h3>${calories} kcal </h3>
                            </div>
                    
                    `
                 html += `<div class = "recipe-ingredients"><p>`
                 let ingredient_count = 0
                //  hit.recipe.ingredients.forEach(item => {
                //     if(ingredient_count <= 5){

                //         html += `
                //                 ${item.text} &#9679;           
                //             `
                //         ingredient_count++
                //     }
                    
                //  })
                 html += ` </p></div>`
                 let url = hit.recipe.url
                 html += `<button type="button" class="getDirections" onclick="window.location.href='${url}';">Get Recipe!</button>`
                 html += `</div>`
                 
                 html += `</div>`

            });
            html += "</body>"
            mealList.classList.remove('notFound');
        } else{
            html = `<div class="no">Sorry, we didn't find any meal!</div>`
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}