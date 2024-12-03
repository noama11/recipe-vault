<template>
    <!-- Links on the left side in the sidebar -->

    <div class="nav-links">
      <router-link :to="{ name: 'main' }" class="nav-button" active-class="active-link">All Recipes</router-link>
      <router-link :to="{ name: 'about' }" class="nav-button" active-class="active-link">About</router-link>
      <router-link :to="{ name: 'search' }" class="nav-button" active-class="active-link">Search</router-link>

    </div>
  </template>

  <script>
  export default {
    name: "NavLinks"
  };
  </script>
  
  <style scoped lang="scss">
.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
  color: black;
}

.nav-links a.router-link-active, 
.nav-links a.router-link-exact-active, 
.nav-links a.active-link {
  font-weight: bold; /* Bold the active link */
  transform: scale(1.2);
}

.nav-links a {
  font-size: 1.25rem;
  padding: 5px 10px;
  text-decoration: none;
  color: black; 
  transition: color 0.3s, transform 0.3s ease; 
}
.nav-button:hover, .active-nav-button {
  transform: scale(1.1); 
}

  </style>
  