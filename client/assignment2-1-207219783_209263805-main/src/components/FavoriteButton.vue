<template>

    <div>
    <button @click="toggleFavorite" class="btn" :class="{'btn-success': isFavorite}">
    <i class="material-icons">{{ isFavorite ? 'star' : 'star_border' }}</i>
    <span class="like-overlay"></span>
    </button>

    <span class="fav-text" v-if="!isFavorite">Add to your favorite</span>
    <span class="fav-text" v-else>Added to Favorites</span>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'FavoriteButton',
    props: {
      recipeId: {
        type: String,
        required: true
      },
      initiallyFavorited: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isFavorite: this.initiallyFavorited
      };
    },
    methods: {
      async toggleFavorite() {
        if (!this.recipeId) {
          console.error("Recipe ID is undefined.");
          return;
        }
        try {
          if (this.isFavorite) {
            // Remove from favorites
            const response = await axios.delete(`http://localhost:3000/users/favorites?recipeId=${this.recipeId}`, { withCredentials: true });
            this.isFavorite = false;
            localStorage.removeItem(`favorite_${this.recipeId}`);
            this.$emit('favorite-deleted', this.recipeId); // call parent componenet event
            this.$toast.info(response.data.message || "Removed from Favorites", {
              timeout: 5000,
            });
          } else {
            // Add to favorites on the server side
            const response = await axios.post('http://localhost:3000/users/favorites', { recipeId: this.recipeId }, { withCredentials: true });
            this.isFavorite = true;
            localStorage.setItem(`favorite_${this.recipeId}`, JSON.stringify(this.isFavorite));
            this.$emit('update-favorite-status', this.recipeId, true);
            this.$toast.success(response.data.message || "Added to Favorites", {
              timeout: 5000,
            });
          }
        } catch (error) {
          console.error("Error toggling recipe as favorite:", error);
          this.$toast.error("An error occurred while toggling the recipe as favorite.", {
            timeout: 5000,
          });
        }
      },
      loadFavoriteStatus() {
        const storedFavorite = localStorage.getItem(`favorite_${this.recipeId}`);
        if (storedFavorite !== null) {
          this.isFavorite = JSON.parse(storedFavorite);
        }
      }
    },
    created() {
      this.loadFavoriteStatus();
    }
  };
  </script>
  
  <style scoped>


  .btn {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  overflow: hidden;
  
}

.btn-success {
  background-color: #488648; /* A more neutral success color */
  color: white;
}


.fav-text{
  text-align: center; /* Center the text below the button */
  color: #666; /* Optional: set text color */
  padding-left: 20px;
}


.like-overlay {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ff4f8f;
  transform: scale(0);
  transition: transform .4s;
  z-index: 0;
}
  </style>
  