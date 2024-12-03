<template>
    <div class="main-container">
      <div class="columns">
        <div class="left-column">
          <h1>My Recipes</h1>
          <RecipePreviewList class="Recipes recipe-preview-list" :recipes="recipes" />
        </div>
      </div>
    </div>
</template>
  
  
  
  
<script>
import axios from "axios";
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
    components: {
        RecipePreviewList
    },
    data() {
        return {
        recipes: [], 
        };
    },
    mounted() {
        this.fetchRecipes();
    },
    methods: {
        async fetchRecipes() {
        try {
            const response = await axios.get('http://localhost:3000/users/myRecipes');
            this.recipes = response.data; // Store response data in recipes
        } catch (error) {
            console.error("Failed to fetch recipes:", error);
        }
        },
    }
};
</script>

  
  <style lang="scss" scoped>

  .main-container {
    min-height: 100vh; /* Ensure it takes at least the full viewport height */
    min-width: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 80px 20px 20px; /* Add top padding to account for navbar height */
    color: #333; /* Default text color for the container */
  }
  
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem); /* Responsive title */
    text-align: center;
    color: #333; /* Text color */
    margin-bottom: 40px;
  }
  

  
  .columns {
  display: flex;
  flex-direction: row;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center vertically */
  gap: 15px;
  width: 100%;
}

  .left-column, .right-column {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
  }
  

  
.Recipes {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px; /* Set a maximum width for the grid */
  margin: 0 auto; /* Center the grid on the page */
}
.recipe-preview-list {
  width: 100%;
  max-width: 800px; /* Adjust the width of each card */
  max-height: 500px;
  margin: 0 15px; /* Add margin between the cards */
}

  </style>