import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';

import { Login, Recipes, Profile, RecipeDetails,
  RecipeInProgress, DoneRecipes, FavoriteRecipes } from './pages';

function App() {
  return (
    <Switch>
      <Route path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />

      <Route path="/foods/:recipeId/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:recipeId/in-progress" component={ RecipeInProgress } />

      <Route path="/foods/:recipeId" component={ RecipeDetails } />
      <Route path="/drinks/:recipeId" component={ RecipeDetails } />

      <Route path="/foods" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />

      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/" component={ Login } />

    </Switch>
  );
}

export default App;
