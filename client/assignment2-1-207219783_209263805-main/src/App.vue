<template>
  <div id="app" class="backgroundApp">
    <div class="overlay"></div>
    <header id="nav">
      <NavLinks />
      <UserControls />
    </header>
    <router-view />
    <Modal />
    
  </div>
</template>

<script>
import NavLinks from './components/NavLinks.vue'
import UserControls from './components/UserControl.vue'
import Modal from './components/Modal.vue'


export default {
  name: "App",
  components: {
    NavLinks,
    UserControls,
    Modal
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
// @import "@/scss/variables.scss"; // Assume this contains your color, font, etc.

.backgroundApp {
  position: relative; // Ensuring that positioning context is set for the overlay

    background-image: url('./assets/wood.jpg');
    background-size: cover;  /* Cover the entire page */
    background-position: center; /* Center the background image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-attachment: fixed; /* Optional: fixes the background image during scroll */
  // background: linear-gradient(170deg, rgba(226, 220, 240, 0.8), rgba(0, 0, 0, 0.9));
  transition: background 0.3s ease;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2); /* Semi-transparent overlay */
  z-index: 0; /* Positioned under content but above the background */
}
#app {
  font-family: $main-font;
  color: $main-color;
  min-height: 100vh;
}
#nav {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  // background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);

  justify-content: space-between;
  background-color: #ffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

@media (max-width: 768px) {
  #nav {
    flex-direction: column;
    align-items: flex-start;

  }

  .nav-links, .user-controls {
    width: 100%;
    justify-content: center;

  }
}
</style>
