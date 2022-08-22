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
        <Route path="/profile" component={ Profile } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />

        <Route
          path="/foods"
          render={
            (props) => <Recipes { ...props } type="foods" />
          }
        />
        <Route
          path="/drinks"
          render={
            (props) => <Recipes { ...props } type="drinks" />
          }
        />

        <Route
          path="/drinks/:id-da-receita"
          render={
            (props) => <RecipeDetails { ...props } type="drinks" />
          }
        />
        <Route
          path="/drinks/:id-da-receita"
          render={
            (props) => <RecipeDetails { ...props } type="drinks" />
          }
        />

        <Route
          path="/foods/:id-da-receita/in-progress"
          render={
            (props) => <RecipeInProgress { ...props } type="foods" />
          }
        />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          render={
            (props) => <RecipeInProgress { ...props } type="drinks" />
          }
        />

        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/" component={ Login } />

      </Switch>

    </RecipeProvider>
  );
}

export default App;
