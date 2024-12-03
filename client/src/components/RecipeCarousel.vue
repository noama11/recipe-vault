<template>
  <!-- RecipesGrid Component: Dynamically displays recipes in a grid layout.
    It uses a responsive grid system to adapt the number of columns based on the number of recipes, up to a maximum of five columns. Each recipe is represented by a RecipePreview component. -->

  <div :style="{ display: 'grid', gridTemplateColumns: gridTemplateColumns, gap: '20px', margin: '20px' }" class="recipes-grid">
    <div v-for="(recipe, index) in recipes" :key="recipe.recipe_id" class="recipe-item">
      <RecipePreview :card="recipe" :isMyRecipe="isMyRecipe" />
    </div>
  </div>
</template>

<script>
import RecipePreview from '@/components/RecipePreview.vue';

export default {
  name: 'RecipesGrid',
  components: {
    RecipePreview
  },
  props: {
    recipes: {
      type: Array,
      required: true
    },
    isMyRecipe: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    gridTemplateColumns() {
      // Compute the number of columns based on items, up to 5
      const numItems = this.recipes.length;
      const columns = Math.min(numItems, 5); // Ensure max 5 columns
      return `repeat(${columns}, 1fr)`;
    }
  }
}
</script>

<style scoped>

</style>




  