<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="recipeModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"><b>New Recipe</b></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveChanges">
            <div class="form-group">
              <label for="recipient-title">Recipe's Name:</label>
              <input type="text" class="form-control" id="recipient-title" v-model="recipeDetails.title" required>

              <label for="recipient-image">Image URL:</label>
              <input type="text" class="form-control" id="recipient-image" v-model="recipeDetails.image" required>

              <label for="recipient-readyInMinutes">Preparation Time (minutes):</label>
              <input type="number" class="form-control" id="recipient-readyInMinutes" v-model="recipeDetails.readyInMinutes" min="1" required>

            
              <label for="recipient-instructions">Instructions:</label>
              <div v-for="(instruction, index) in recipeDetails.instructions" :key="index" class="instruction-row">
                <input type="text" v-model="recipeDetails.instructions[index]" placeholder="Instruction step" class="form-control" required>
                <button type="button" @click="removeInstruction(index)" v-if="recipeDetails.instructions.length > 1">-</button>
              </div>
              <button type="button" @click="addInstruction" class="btn-info add-button">+ Add more instruction</button>

              <label>Ingredients:</label>
              <div class="ingredient-list">
                <div class="ingredient-row" v-for="(ingredient, index) in recipeDetails.ingredients" :key="index">
                  <input type="text" v-model="ingredient.name" placeholder="Ingredient name" required>
                  <input type="text" v-model="ingredient.amount" placeholder="Amount">
                  <button type="button" @click="removeIngredient(index)" v-if="recipeDetails.ingredients.length > 1">-</button>
                </div>
                <button type="button" @click="addIngredient" class=" btn-info add-button">+ add more ingredient</button>
              </div>

              <label for="recipient-servings">Amount of Servings:</label>
              <input type="number" class="form-control" id="recipient-servings" v-model="recipeDetails.servings" min="1" required>

              <div class="check-group">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" v-model="recipeDetails.vegetarian"> Vegetarian
                </label>
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" v-model="recipeDetails.vegan"> Vegan
                </label>
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" v-model="recipeDetails.glutenFree"> Gluten Free
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" ref="Close" data-dismiss="modal" @click="closeModal">Close</button>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      recipeDetails: {
        title: '',
        image: '',
        readyInMinutes: 0,
        ingredients: [{ name: '', amount: '' }],
        instructions: [''],
        servings: 1,
        vegetarian: false,
        vegan: false,
        glutenFree: false
      }
    };
  },
  methods: {
    saveChanges() {
      // Check if all required fields are filled
      if (!this.allFieldsValid()) {
        alert("Please ensure all required fields are filled.");
        return;
      }
      // Post the recipe details to the server
      axios.post('http://localhost:3000/users/myRecipes', this.recipeDetails)
        .then(response => {
          alert("Recipe saved successfully!");
          this.closeModal(); // Close the modal on success
        })
        .catch(error => {
          alert(`Failed to save the recipe: ${error.message}`);
          console.error("Error:", error);
        });
    },
    // Validate all required fields
    allFieldsValid() {
      return this.recipeDetails.title && this.recipeDetails.image && this.recipeDetails.readyInMinutes && this.recipeDetails.instructions.every(i => i) && this.recipeDetails.servings && this.recipeDetails.ingredients.every(i => i.name && i.amount);
    },
    // Reset recipe details and close the modal
    closeModal() {
      this.recipeDetails = {
        title: '', image: '', readyInMinutes: 0, ingredients: [{ name: '', amount: '' }],
        instructions: [''], servings: 1, vegetarian: false, vegan: false, glutenFree: false
      };
      this.$refs.Close.click();
    },
    addInstruction() {
      this.recipeDetails.instructions.push('');
    },
    // Remove an instruction field
    removeInstruction(index) {
      if (this.recipeDetails.instructions.length > 1) {
        this.recipeDetails.instructions.splice(index, 1);
      }
    },
    addIngredient() {
      this.recipeDetails.ingredients.push({ name: '', amount: '' });
    },
    
    // Remove an ingredient field
    removeIngredient(index) {
      if (this.recipeDetails.ingredients.length > 1) {
        this.recipeDetails.ingredients.splice(index, 1);
      }
    }
  }
};
</script>

<style>
.check-group {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
}
</style>
