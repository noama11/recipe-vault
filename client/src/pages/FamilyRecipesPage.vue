<template>
  <div class="main-container"><br><br><br>
    <h1 class="display-2 text-center mt-4">Family Recipes</h1>

    <div class="columns">
      <div class="left-column">
        <h2>Mom's Pizza</h2>
      </div>
      <div class="middle-column">
        <h2>Grandmother's Ravioli</h2>
      </div>
      <div class="right-column">
        <h2>Grandfather's Pasta</h2>
      </div>
    </div>


    <div class="d-flex justify-content-center align-items-center">
      <div class="card" v-for="card in cards" :key="card.id"
        @mouseover="handleMouseover(card)"
        @Mouseleave="handleMouseleave(card)">

        <div class="image-box">
          <img :src="card.imageUrl" />
        </div>

        <div class="content" v-show="card.hovered">
          <p class="description-text">
            <b><u>Who prepares:</u></b> {{ card.whose }}<br>
            <b><u>When:</u></b> {{ card.time }}<br>
            <b><u>Ingredients:</u></b> {{ card.ingredients }}<br>
            <b><u>preparation method:</u></b> {{ card.prep }}
          </p>
        </div>
      </div>
    </div>
    

  </div>
  
</template>

<script>
import BackButton from '../components/BackButton.vue';
export default {
  components: {
    BackButton
  },
  data() {
    return {
      cards: [
        { id: 1, title: 'Ford Mustang', whose: 'Mom', time: 'holiday', ingredients: 'tomato sauce, cheese, basil, dough',prep: 'Roll out pizza dough, spread with tomato sauce, add toppings like cheese and pepperoni, then bake in a hot oven until crust is crispy.',imageUrl: require('@/assets/pizza.jpg'), hovered: false },
        { id: 2, title: 'Another Title', whose: 'Grandmother', time: 'weekend',ingredients: 'ravioli, cheese, oregano, milk',prep: 'Prepare pasta dough, roll it thin, place dollops of filling (usually ricotta and spinach) at intervals, cover with another layer of dough, seal edges, then boil until pasta is tender.',imageUrl: require('@/assets/ravioli.jpg'), hovered: false },
        { id: 3, title: 'Yet another title', whose: 'Grandfather', time: 'daily',ingredients: 'pasta, cheese, onion, parmesan',prep: 'Cook pasta in boiling water until al dente, then toss with sauce made from tomatoes, garlic, olive oil, and herbs until coated and serve hot.',imageUrl: require('@/assets/pasta.jpg'), hovered: false },
      ],
    };
  },
  methods: {
    handleMouseover(card) {
      card.hovered = true;
    },
    handleMouseleave(card) {
      card.hovered = false;
    },
  },
};
</script>

<style scoped>
.columns {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  padding-left: 300px;
  padding-right: 300px;
  padding-top: 50px;
}

.card{
    width: 500px;
    aspect-ratio: 1 / 0.7;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
    margin: 10px; 

}
.card .image-box{
    width: 100%;
    height: 100%;
    border-radius: inherit;
}
.card .image-box img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 90%;
    border-radius: inherit;
    transition: 0.5s ease-in-out;
}
.card::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 2px solid white;
    border-radius: inherit;
    opacity: 0;
    transition: 0.4s ease-in-out;
}
.card:hover img {
    filter: grayscale(1) brightness(0.4);
}
.card:hover::after {
    opacity: 1;
    inset: 20px;
}
.content {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white; /* Adjust text color for better readability */
    padding: 10px; /* Add padding for better spacing */
    border-radius: 8px; /* Match border radius */
    opacity: 0; /* Start hidden */
    transition: opacity 0.4s ease-in-out;
}
.description-text {
  font-size: 1.3em; 
  line-height: 1.5; 
  text-align: left; 
}

.card:hover .content {
  opacity: 1; /* Show on hover */
}
</style>