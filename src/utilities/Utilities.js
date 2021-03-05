// Get recipe by name
export async function getDrinksByName(drinkName) {
    // Search by name
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
    // Returns a json respone
    const cocktails = await apiResponse.json();
    
    
    const lesDrinks = cocktails.drinks;
    console.log('les drinks dans getDrinksByname: ', cocktails.drinks);

    return lesDrinks;
}

// Get recipes by ingredient
export async function getDrinksByIngredient(ingredient) {
    // Search by Ingredient
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    // Wait for response then return JSON
    const cocktails = await apiResponse.json();

    return {
         cocktails
    }
}

// get single recipe 
export async function getSingleRecipe(id) {
    // Search by Ingredient
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    // Wait for response then return JSON
    const recipe = await apiResponse.json();

    return {
         recipe
    }
}

// Retrieves all the Categories from the REST API
export async function getCategories() {
    const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    // Wait for response and return JSON
    const categories = await apiResponse.json();

    return {
         categories
    }
}

// Get Drinks By Category
export async function getDrinksByCategory( category ) {
    // Search by Category
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    // Wait for response then return JSON
    const cocktails = await apiResponse.json();

    return {
         cocktails
    }
}

// Get alcohol or non alcohol drinks
export async function getDrinksByAlcohol( term ) {
    // Search by Category
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
    // Wait for response then return JSON
    const cocktails = await apiResponse.json();

    return {
         cocktails
    }
}