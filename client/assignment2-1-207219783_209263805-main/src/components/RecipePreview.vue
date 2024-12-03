<template>
  <!-- RecipePreview Component: Displays a recipe card with an image, title, and various attributes such as preparation time and dietary tags.
    It includes interactive elements like a clickable image and a favorite button. -->

  <div class="card">
    <img :src="card.image" class="card-img-top clickable-image" @click="navigateToRecipe(card.id || card.recipe_id)">
    <div class="card-body">
      <h5 class="card-title" style="font-weight: bold;">{{ card.title }}</h5>
      <p class="card-text"><small class="text-muted">⏱️ Prep time: {{ card.readyInMinutes }}</small></p>
      <p>❤️ Likes: {{ card.popularity }} </p>
      <p v-if="card.vegan" class="badge badge-success">🌿 Vegan</p>
      <p v-if="card.vegetarian" class="badge badge-warning">🥕 Vegetarian</p>
      <p v-if="card.glutenFree" class="badge badge-info">🚫 Gluten-Free</p>
      <p v-if="viewed" class="badge badge-secondary">👁️ Viewed</p>
    </div>
    <div class="card-footer bg-white">
      <FavoriteButton :recipeId="String(card.id || card.recipe_id)" :initiallyFavorited="isFavorite(card.id)" @update-favorite-status="updateFavorite"></FavoriteButton>
    </div>
  </div>
</template>

<script>
import FavoriteButton from '@/components/FavoriteButton.vue';

export default {
  name: 'RecipePreview',
  components: {
    FavoriteButton
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      viewed: false // Tracks whether the recipe has been viewed
    };
  },
  mounted() {
    // Check local storage to see if the recipe has been viewed and update accordingly

    this.viewed = localStorage.getItem(`viewed_${this.card.id}`) === 'true';
  },
  methods: {
    navigateToRecipe(recipeId) {
      // Method to navigate to the detailed recipe view page -> RecipeViewPage.vue

      if (!recipeId) {
        console.error("recipeId is undefined! Check the source of the recipe object.");
        return;
      }
      this.card.viewed = true;
      localStorage.setItem(`viewed_${recipeId}`, true);
      this.$router.push({ name: 'RecipeViewPage', params: { recipeId: recipeId }})
    },
    isFavorite(recipeId) {
      // Check if the recipe is favorited in local storage
      return JSON.parse(localStorage.getItem(`favorite_${recipeId}`)) || false;
    },
    updateFavorite(recipeId, isFavorite) {
      // Update the favorite status in local storage

      localStorage.setItem(`favorite_${recipeId}`, JSON.stringify(isFavorite));
    }
  }
};
</script>

<style scoped>
.card img {
  max-width: 100%;
  max-height: 100%;
}
.card {
  flex: 1 0 calc(33.33% - 1em);
  margin: 0 0.5em;
  box-shadow: 2px 6px 8px 0 rgba(22, 22, 26, 0.18);
  border: none;
  border-radius: 50px;
  overflow: hidden; 
  height: 32rem;

}
.clickable-image {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}
.clickable-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.card-footer{
   display: flex;
  flex-direction: row;
  padding: 10px; 
} 
</style>