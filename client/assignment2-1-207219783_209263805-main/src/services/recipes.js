// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import axios  from "axios";

export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  const totalRecipes = recipe_preview.length;

  // for(let i = 0; i < amount; i++){
  //   recipes.push(recipe_preview);
  // }
  for (let i = 0; i < amount; i++) {
    // const randomIndex = Math.floor(Math.random() * totalRecipes);
    recipes.push(recipe_preview[i]);
  }

  return { data: { recipes: recipes } };
}

// export function mockGetRecipeFullDetails(recipeId) {
//   return { data: { recipe: recipe_full_view } };
// }
export function mockGetRecipeFullDetails(recipeId) {
  return axios.get(`http://localhost:3000/recipes/recipeId/${recipeId}`)  // Update the base URL as needed
  .then(response => {
    const recipeDetails = response.data;
    console.log('Recipe details fetched successfully:', recipeDetails);
    return recipeDetails;
  })
  .catch(error => {
    this.error = "Failed to fetch recipe details: " + error.message;
    console.error(this.error);
    return null;
  });
}
