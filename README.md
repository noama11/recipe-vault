# Culinary Compendium 🍳

A full-stack recipe management and discovery platform built with Vue.js and Node.js.

## 📚 Overview

Culinary Compendium is a comprehensive web application that allows users to discover, save, and share recipes. The platform combines a robust backend API with an intuitive frontend interface to provide a seamless cooking and recipe management experience.

## 🌟 Features

- **Recipe Search & Discovery**

  - Advanced search functionality with multiple filters
  - Random recipe suggestions
  - Sort by popularity, preparation time, or dietary restrictions

- **User Management**

  - Secure authentication system
  - Personalized user profiles
  - Session management

- **Recipe Management**
  - Create and store personal recipes
  - Save favorite recipes
  - View recently viewed recipes
  - Detailed recipe information including ingredients and instructions

## 🔧 Technology Stack

### Frontend

- Vue.js
- Axios for API communication
- Vuex for state management
- Vue Router for navigation

### Backend

- Node.js
- Express.js
- MySQL database
- Express Session for authentication
- BCrypt for password hashing

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm or yarn

### Getting Started

1. **Clone the Repository**

```bash
git clone https://github.com/YourUsername/culinary-compendium.git
cd culinary-compendium
```

2. **Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
SPOONACULAR_API_KEY=your_spoonacular_api_key
COOKIE_SECRET=your_cookie_secret
bcrypt_saltRounds=10
```

3. **Frontend Setup**

```bash
cd frontend
npm install
```

4. **Start the Application**

For development:

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run serve
```

The application will be available at:

- Frontend: http://localhost:8080
- Backend: http://localhost:3000

## 📁 Project Structure

```
culinary-compendium/
├── frontend/                # Vue.js frontend application
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── views/         # Page components
│   │   ├── router/        # Vue Router configuration
│   │   └── store/         # Vuex store
│   └── public/            # Static assets
│
├── backend/                # Node.js backend application
│   ├── routes/            # Express routes
│   │   ├── auth.js        # Authentication routes
│   │   ├── recipes.js     # Recipe management
│   │   ├── user.js        # User management
│   │   └── utils/         # Utility functions
│   ├── sql/              # Database scripts
│   └── main.js           # Express app entry point
```

## 🔐 API Endpoints

### Authentication

- `POST /auth/Register` - Register new user
- `POST /auth/Login` - User login
- `POST /auth/Logout` - User logout

### Recipes

- `GET /recipes/search` - Search recipes
- `GET /recipes/random` - Get random recipes
- `GET /recipes/recipeId/:recipeId` - Get recipe details
- `GET /recipes/MyRecipe/:recipeId` - Get user's recipe details

### User Management

- `POST /users/favorites` - Add recipe to favorites
- `DELETE /users/favorites` - Remove from favorites
- `GET /users/favorites` - Get favorite recipes
- `POST /users/myRecipes` - Create new recipe
- `GET /users/myRecipes` - Get user's recipes
- `POST /users/lastViewed` - Track viewed recipes
- `GET /users/lastViewed` - Get recently viewed recipes

## 🙏 Acknowledgments

- Spoonacular API for recipe data
- All contributors and users of the platform
