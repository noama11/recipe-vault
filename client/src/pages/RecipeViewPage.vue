<template>
  <div class="container d-flex justify-content-center" v-if="recipe"> 
    <div class="card">
      <div class="card-header recipe-header text-center">
        <h1 class="card-title">{{ recipe.title }}</h1>
        <b>Recipe ID: {{ $route.params.recipeId }}</b>
      </div>

      <div class="card-body recipe-body">
        <img :src="recipe.image || '/path-to-default-image.jpg'" class="center" />
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><b>Ready in {{ recipe.readyInMinutes }} minutes ⏱️</b></div>
              <div><b>Likes: {{ recipe.aggregateLikes }} likes ❤️</b></div>
              <p v-if="recipe.vegan" class="badge badge-success">Vegan 🌿</p>
              <p v-if="recipe.vegetarian" class="badge badge-warning">Vegetarian 🥕</p>
              <p v-if="recipe.glutenFree" class="badge badge-info">Gluten-Free 🚫</p>
            </div>
            <b>Ingredients:  ({{ recipe.servings }} servings)</b>
            <ul>
              <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index">
                {{ ingredient.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <b>Instructions:</b>
            <ol v-if="recipe.instructions && recipe.instructions.length > 0">
              <li v-for="(step, index) in recipe.instructions" :key="index" v-html="step"></li>
            </ol>
            <p v-else>No instructions available for this recipe.</p>

          </div>
        </div>
        <div class="button-container">
          <FavoriteButton :recipeId="$route.params.recipeId.toString()"></FavoriteButton>
          
        </div>
        <div class="backb">
          <BackButton/>          
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import FavoriteButton from '@/components/FavoriteButton.vue';
import axios from 'axios';
import BackButton from '../components/BackButton.vue';

export default {
  name: 'RecipeViewPage',
  components: {
    FavoriteButton,
    BackButton
  },
  data() {
    return {
      recipe: null,
    };
  },
  async mounted() {
      try {
        let response;
        response = await axios.get(`http://localhost:3000/recipes/recipeId/${this.$route.params.recipeId}`);
        
        if (response && response.data) {
          this.recipe = {
            ...response.data,
            instructions: response.data.instructions 
              ? response.data.instructions.split(',')  
              : Array.isArray(response.data.analyzedInstructions) && response.data.analyzedInstructions.length > 0
              ? response.data.analyzedInstructions.map(instruction => instruction.steps.map(step => step.step)).flat()
              : []
          };
            await this.addLastViewRecipe(this.$route.params.recipeId);
          
        } else {
          this.error = "Failed to load recipe details.";
          this.$router.replace("/NotFound");
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
  }, 
  methods:{
    async addLastViewRecipe(recipeId) {
      try {
        if (!localStorage.username || localStorage.username === 'null' || localStorage.username === 'undefined') {
          console.error('User not logged in.');
          return;
        }

        const response = await axios.post('http://localhost:3000/users/lastViewed', {
          user_id: localStorage.username,
          recipeId: recipeId,
        });
        if (response.data.status !== 200) {
          console.error('Error saving recipe to the database:', response.data.message);
        }
      } catch (error) {
        console.error('Error saving recipe to the database:', error);
      }
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 130px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 20px;
  width: 70%;

}
.backb{
  margin-left: 500px;
}

.card-title {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  padding: 15px;
}
.card-img-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  height: auto;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
/* Button Container Styling */
.button-container {
  display: flex;
  align-items: center; /* Vertically centers the buttons */
  width: 100%;
  margin-top: 10px; /* Add some spacing above the buttons */
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  padding: 13px 18px; 
  font-size: 1.25rem; 
}
</style>
