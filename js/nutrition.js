let searchQuery = document.querySelector(".search-bar");
let searchIcon = document.querySelector(".search-icon");
let nutritionResult = document.querySelector(".nutrition-result");


// Fetch and display nutritional data for user inputted meal

searchIcon.addEventListener( "click", () => {
    let searchValue = searchQuery.value ;
    console.log(searchValue);
    if(searchValue != false) {
        searchValue = searchValue.replace(" ", "%20");
        fetch(`https://api.edamam.com/api/nutrition-data?app_id=0ae7c4e8&app_key=f1dd039acb04ab641f23e1b03a37ed45&nutrition-type=cooking&ingr=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            if(data.calories !=0) {
            let html = "";
            html += `<table class="nutrition-table">
                        <tr class="nutrition-rows">
                            <th colspan="2">Net Calories  :  ${data.calories}</th>
                        </tr>
                        <tr class="nutrition-rows blank-row">
                           
                        </tr>
                        <tr class="nutrition-rows">
                            <td>Carbs  :</td>
                            <td>  ${data.totalNutrients.CHOCDF.quantity.toFixed(2)} ${data.totalNutrients.CHOCDF.unit} </td>
                        </tr>
                        <tr class="nutrition-rows">
                            <td>Protein  :</td>
                            <td>  ${data.totalNutrients.PROCNT.quantity.toFixed(2)} ${data.totalNutrients.CHOCDF.unit}    </td>
                        </tr>
                        <tr class="nutrition-rows">
                            <td>Fat  :</td>
                            <td>  ${data.totalNutrients.FAT.quantity.toFixed(2)} ${data.totalNutrients.CHOCDF.unit}    </td>
                        </tr>
                    </table>`

            nutritionResult.innerHTML = html;
            }
            else alert('Sorry! No data found');
        })    
    }
    else alert('Enter some input');

})