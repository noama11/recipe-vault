<template>

  <div class="container">
    <h1 class="title">Search Page</h1>
    <form @submit.prevent="fetchRecipes" class="search-form">
      <div>
      <input v-model="searchQuery" type="text" placeholder="Search recipes..." class="search-input">
      <select v-model="selectedCount" class="result-count">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <button type="submit" class="search-button">Search</button>
    </div>
      <div class="sorting-options">
      Sort by:
      <button class="filter-button" @click="sortKey = 'readyInMinutes'">Preparation Time</button>
      <button  class="filter-button" @click="sortKey = 'popularity'">Popularity</button>
    </div>
    </form>

    <RecipePreviewList 
          class="RandomRecipes recipe-preview-list" 
          :recipes="sortedRecipes"
        />
  </div>
  

</template>



<script>
import axios from 'axios';
import RecipePreviewList from '../components/RecipePreviewList.vue';

export default {
  components: {
    RecipePreviewList
  },
  name: 'SearchPage',
  data() {
    return {
      searchQuery: '',
      recipes: [],
      selectedCount: '5',
      sortKey: 'popularity', // Default sorting key
    };
  },
  computed: {
    sortedRecipes() {
      return this.recipes.slice().sort((a, b) => {
        if (this.sortKey === 'popularity') {
          return b.aggregateLikes - a.aggregateLikes;
        }
        return a.readyInMinutes - b.readyInMinutes;
      });
    }
  },
  methods: {
    goToRecipePage(recipeId) {
    this.$router.push({ name: 'RecipeViewPage', params: { recipeId } });
  },
  updateFavorite(recipeId, isFavorite) {
      localStorage.setItem(`favorite_${recipeId}`, JSON.stringify(isFavorite));
    },

fetchRecipes() {
  if (!this.searchQuery) {
    console.log('Search query is empty.');
    return;
  }
  
  const url = `http://localhost:3000/recipes/search?query=${this.searchQuery}&number=${this.selectedCount}`;

  axios.get(url)
    .then(response => {
      this.recipes = response.data.results.map(recipe => ({
        ...recipe,
        readyInMinutes: recipe.readyInMinutes || 'N/A',
        popularity: recipe.aggregateLikes || 'N/A',
        instructions: recipe.instructions || 'No instructions provided.'
      }));

      // Save the last search query in localStorage
      localStorage.setItem('lastSearch', this.searchQuery);
      localStorage.setItem('lastSelectedCount', this.selectedCount);  // Optionally save selected count as well

      console.log(this.recipes); // Logging to check the structure
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
}



  },
  mounted() {
    if (localStorage.getItem('lastSearch')) {
      this.searchQuery = localStorage.getItem('lastSearch');
      this.fetchRecipes();
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1800px;
  /* width: 100%; */
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  padding: 100px;
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  max-height: calc(100vh - 140px); 
  /* z-index: 1000;  */

  position: relative; /* Ensure container is positioned contextually */
}

.search-input {
  width: 60%;
  padding: 8px 15px;
  border: 2px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Sorting Options Styling */
.sorting-options {
  margin: 20px 0;
  font-size: 1rem;
  color: #333;
}

.filter-button {
  padding: 8px 15px;
  margin: 0 10px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer !important;;
  transition: background-color 0.3s, box-shadow 0.3s;
  font-weight: bold;
}

.filter-button:hover {
  background-color: #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.filter-button:active {
  background-color: #53488d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


.result-count {
  width: 100px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
}

.search-button {
  padding: 8px 20px;
  background-color: #3688f4; /* Red color matching the category icons */
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
}

.search-button:hover {
  background-color: #315dad;
}

/* Category tabs styling */
.category-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.category-tab {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  background-color: #f1f1f1;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-tab:hover {
  background-color: #e0e0e0;
}




/* Cards for results */
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  perspective: 1000px; /* Needed for 3D transformations */
}

.recipe-card {
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  transform: translateZ(0); /* GPU acceleration for smoother animations */
  transition: transform 0.3s ease-out;
  cursor: pointer;
}

.recipe-card:hover {
  transform: scale(1.05) rotateZ(-3deg); /* Slight zoom and 3D rotation effect */
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.recipe-image:hover {
  transform: scale(1.1); /* Slightly enlarge the image on hover */
}

.recipe-info {
  padding: 10px;
  text-align: left;
  transition: background-color 0.3s linear;
}

.recipe-info:hover {
  background-color: #eaeaea; /* Light background transition on hover */
}
</style>