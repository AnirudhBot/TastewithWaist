
const searchClick = document.querySelector(".search-icon");
const searchBar = document.querySelector(".search-bar");
let recipeImg = document.querySelector(".recipe-img");
let recipeName = document.querySelector(".recipe-name");
let recipeResult = document.querySelector(".recipe-result");
let recipeDisplay = document.querySelector(".recipe-info-popup");


// fetching and displaying recipe list as per user search

searchClick.addEventListener( "click" , (e) => {
    e.preventDefault();
    const searchInput = searchBar.value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then( res => res.json())
    .then( data => {
        let html = "";
        if(data.meals && searchInput != ''){
        data.meals.forEach( i => {
                html += `<div class="recipe-items" data-id="${i.idMeal}">
                                <div class="recipe-img">
                                    <img src="${i.strMealThumb}">
                                </div>
                                <div class="recipe-name">
                                    <h2 class="recipe-name-text">${i.strMeal}</h2>
                                </div>
                                <div class="recipe-btn">
                                    <a class="get-recipe-btn btn btn-dark" href="#popup">Get Recipe</a>        
                                </div>
                        </div>`
      
            });
        }
        else
          alert('No such recipe found');

        recipeResult.innerHTML = html;
       
    })
})

searchBar.addEventListener("keyup", e => {
    e.preventDefault();
    if(e.keyCode == 13) {
        searchClick.click();
    }
})


// Recipe Modal popup for user-selected recipe

recipeResult.addEventListener( "click", (e) => {
    e.preventDefault();
    if(e.target.classList.contains('get-recipe-btn')) {
        let recipeItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeItem.dataset.id}`)
        .then(res => res.json())
        .then(data => {
            if(data.meals) {
                let recipe = data.meals[0];
                let htmlRecipe = ""; 
                htmlRecipe = `<div class="recipe-info-header">
                                        <i class="recipe-close far fa-window-close"></i>   
                                        <h2>${recipe.strMeal}</h2>
                              </div>
                              <div class="recipe-info">
                                        ${recipe.strInstructions}
                              </div>
                              <div class="recipe-info-image">
                                        <img src="${recipe.strMealThumb}">
                              </div>` 

                recipeDisplay.innerHTML = htmlRecipe;
                recipeDisplay.style.display = "block"; 

                let recipeClose = recipeDisplay.firstElementChild.children[0];
                recipeClose.addEventListener( "click", (e) => {
                    e.preventDefault();
                    recipeDisplay.style.display = "none";
                })
            }
        });

    }
});


// Modal closes if user clicks outside it

window.addEventListener( "mouseup", (e) => {
    if(e.target != recipeDisplay && e.target.parentElement != recipeDisplay && e.target.parentElement.parentElement != recipeDisplay) {
        recipeDisplay.style.display = "none";
    }
})



  