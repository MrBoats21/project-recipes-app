import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';

import { Login, Recipes, Profile, RecipeDetails,
  RecipeInProgress, DoneRecipes, FavoriteRecipes } from './pages';
import RecipeProvider from './contex/RecipeProvider';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route path="/recipes" component={ Recipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/recipeDetails" component={ RecipeDetails } />
        <Route path="/recipeInProgress" component={ RecipeInProgress } />
        <Route path="/DoneRecipes" component={ DoneRecipes } />
        <Route path="/FavoriteRecipes" component={ FavoriteRecipes } />
        <Route path="/" component={ Login } />

      </Switch>

    </RecipeProvider>
  );
}

export default App;
