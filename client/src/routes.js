import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },

  {
    path: '/recipes/recipeId/:recipeId',
    name: 'RecipeViewPage',
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: '/familyRecipes',
    name: 'familyRecipes',
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/users/myRecipes",
    name: "myRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: '/users/favorites',
    name: 'favorites',
    component: () => import("./pages/FavoriteRecipesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;