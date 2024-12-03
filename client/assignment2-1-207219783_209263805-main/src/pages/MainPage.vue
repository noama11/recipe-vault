<template>
  <div class="main-container">
    <h1><span class="underlined underline-mask">Explore,</span>
      <span class="underlined underline-clip">Create</span>
      <span class="underlined underline-overflow"> & Delicious Recipes</span>
    </h1><br><br>

   
    
    <div class="columns">
      <!-- Left Column: Random Recipes -->
      <div class="left-column">
        <RecipePreviewList class="RandomRecipes recipe-preview-list" :recipes="randomRecipes" title="Random Recipes"/>



        <div class="static">
    <button class="refresh-button" @click="fetchRandomRecipes">
      <span v-show="!showSpinner">Random Recipes</span>
      <!-- SVGs for the button icon -->
      <svg v-show="!showSpinner" viewBox="0 0 22 22" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <line x1="15" y1="16" x2="19" y2="12"></line>
        <line x1="15" y1="8" x2="19" y2="12"></line>
      </svg>
      <!-- Spinner SVG -->
      <svg class="spinner" v-show="showSpinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
      </svg>
    </button>
  </div>

      </div>
      <!-- Right Column: Last Viewed Recipes or Login Prompt -->
      <div class="right-column">
        <div v-if="$root.store.username">

          <div v-if="lastRecipes && lastRecipes.length === 0">
            <p>No recipes viewed recently</p>
          </div>
          <RecipePreviewList v-else :recipes="lastRecipes" title="Last Watched Recipes"/>
        </div>

        <div v-else>
          <router-link to="/login">
            <b-button pill variant="outline-secondary" class="login-button">
              You need to Login to view the last viewed recipes
            </b-button>
          </router-link>

        </div>

        
      </div>
    </div>
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import axios  from "axios";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      randomRecipes: [],
      recipes: [],
      lastRecipes: [],
      showSpinner: false, // Controls the visibility of the spinner

    };
  },
  mounted() {


    this.fetchRandomRecipes();
    if (this.$root.store.username) {
    }
  },
  methods: {
    async fetchRandomRecipes() {
      this.showSpinner = true; // Show spinner
      setTimeout(() => {
        this.showSpinner = false; // Hide spinner after 2 seconds
      }, 2000); // 2000 milliseconds = 2 seconds

      try {
        const response = await axios.get('http://localhost:3000/recipes/random');
        this.randomRecipes = response.data;
        console.log(this.randomRecipes);
      } catch (error) {
        console.error("Failed to fetch random recipes", error);
      }
    },
    async fetchLastViewedRecipes() {
      try {
        const response = await axios.get('http://localhost:3000/users/lastViewed');
        if (response.data && Array.isArray(response.data)) {
          this.lastRecipes = response.data;
        } else {
          console.error('No valid recipes returned');
        }
        console.log(this.lastRecipes);
      } catch (error) {
        console.error("Failed to fetch last viewed recipes", error);
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100vh; /* Ensure it takes at least the full viewport height */
  min-width: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 20px; /* Add top padding to account for navbar height */
  color: #333; /* Default text color for the container */
}


h2{
  color: white;
  font-size: 2rem;
}

.columns {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.left-column, .right-column {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}

.refresh-button, .login-button {
  font-size: 1.25rem;
  padding: 10px 20px;
  text-decoration: none;
  color: white;

  background-color: darkgray;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;

}

.refresh-button:hover {
  transform: scale(1.1); /* Correctly applies scaling */
  transition: transform 0.3s ease; /* Smoothly transitions the transform property */
}
.login-button:hover {
  background-color: #8d0815;

}

.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

h1 {
  font-size: clamp(3rem, 15vmin, 5rem);
  line-height: 1.2;
  white-space: nowrap; /* Prevent text from breaking into multiple lines */
  text-align: center;
  font-family: sans-serif;
  color: hsl(0 0% 98%);
}

.underlined {
  position: relative;
  vertical-align: middle; /* Align text vertically in the middle */
  margin-right: 20px; /* Add space between the underlined words */
}

.underline-mask:after {
  content: '';
  position: absolute;
  top: 95%;
  width: 150%;
  aspect-ratio: 3 / 1;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 50%;
  border: 6px solid hsl(280 80% 50%);
  /* Use a conic gradient mask to hide and show the bits you want */
  --spread: 140deg;
  --start: 290deg;
  mask: conic-gradient(from var(--start), white 0 var(--spread), transparent var(--spread));
}


.underline-overflow {
  display: inline-block;
  /* A little extra padding and overflow hidden   */
  overflow: hidden;
  padding-bottom: clamp(1rem, 2vmin, 2rem);
}
.underline-overflow:after {
  content: '';
  position: absolute;
  top: 90%;
  height: 150%;
  aspect-ratio: 7 / 2;
  left: 50%;
  transform: translate(-50%, -10%);
  border-radius: 50%;
  border: 6px solid hsl(10 80% 50%);
}

.underline-clip:after {
  content: '';
  position: absolute;
  top: 95%;
  width: 150%;
  aspect-ratio: 3 / 1;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 50%;
  border: 6px solid hsl(293, 36%, 76%);
  /* Use a clip-path to hide and show the bits you want */
  clip-path: polygon(0 0, 50% 50%, 100% 0);
}

.refresh-button {
  font-size: 16px;  /* Appropriate text size */
  color: #ffffff;  /* White text for better visibility */
  background-color: #f19ff3;  /* Aqua color, replace with the exact color code you desire */
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.refresh-button:hover {
  background-color: #f19ff3; /* A lighter shade of aqua for hover effect */
  transform: scale(1.1);
}

.refresh-button span, .refresh-button svg {
  transition: all 0.3s ease;
}

.refresh-button:focus, .refresh-button:active {
  outline: none;
  box-shadow: 0 0 10px rgba(102, 177, 241, 0.75);
}

.refresh-button .spinner {
  position: absolute;
  width: 24px;
  height: 24px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;  /* Initially hidden */
  transition: opacity 0.3s ease-in-out;
}

.refresh-button:active .spinner,
.refresh-button:focus .spinner {
  opacity: 1;
  animation: spin 2s linear; /* Spinning animation for 2 seconds */
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.refresh-button .button-text {
  visibility: hidden; /* Hide the text while spinner is active */
}

.refresh-button.show-spinner .button-text {
  visibility: hidden; /* Keep the space for text */
}
.refresh-button {
  min-width: 150px; /* Set an appropriate width */
  min-height: 50px;
}
</style>
