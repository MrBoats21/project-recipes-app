import React from "react";
import { screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from '../App';
import RecipeProvider from "../contex/RecipeProvider";

import renderWithRouter from '../helpers/RenderWithRouter';

import {getInitialRecipes, getCategories, getByCategorie } from '../api';
import * as api from '../api';

import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import beefMeals from '../../cypress/mocks/beefMeals';


jest.mock('../api');

describe('Teste da página de receitas', () => {
    it('Testa se receita são rederizadas na págima de comidas', async () => {
        api.getInitialRecipes.mockResolvedValue({
            json: () => (Promise.resolve(meals))
        })
        api.getCategories.mockResolvedValue({
            json: () => (Promise.resolve(mealCategories))
        })

       const { history } =  renderWithRouter(
        <RecipeProvider>
            <App />   
        </RecipeProvider>
       )
       history.push('/foods');
    //    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
       for( let i = 0; i < 12; i += 1){
        const img = await screen.findByTestId(`${i}-card-img`);
        const name = await screen.findByTestId(`${i}-card-name`);
        expect(img).toBeInTheDocument();
        expect(name).toBeInTheDocument();
       }
       
    })
    it('Testa se receita são rederizadas na págima de bebidas', async () => {
        api.getInitialRecipes.mockResolvedValue({
            json: () => (Promise.resolve(meals))
        })
        api.getCategories.mockResolvedValue({
            json: () => (Promise.resolve(drinkCategories))
        })
        const { history } =  renderWithRouter(
         <RecipeProvider>
             <App />   
         </RecipeProvider>
        )
        history.push('/drinks');
        await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
        for( let i = 0; i < 12; i += 1){
         const img = await screen.findByTestId(`${i}-card-img`);
         const name = await screen.findByTestId(`${i}-card-name`);
         const footer = await screen.findByTestId('drinks-bottom-btn');
         expect(img).toBeInTheDocument();
         expect(name).toBeInTheDocument();
         expect(footer).toBeInTheDocument();
        }
        
     })
    
    it('Testa filtro na págima de comidas', async () => {
        api.getInitialRecipes.mockResolvedValue({
            json: () => (Promise.resolve(meals))
        })
        api.getCategories.mockResolvedValue({
            json: () => (Promise.resolve(mealCategories))
        })
        api.getByCategorie.mockResolvedValue({
            json: () => (Promise.resolve(beefMeals))
        })
     const { history } =  renderWithRouter(
      <RecipeProvider>
         <App />   
      </RecipeProvider>
     )
     history.push('/foods');

      const beef = await screen.findByTestId('Beef-category-filter');
      userEvent.click(beef);

      const beefMeal = await screen.findByText(/beef and mustard pie/i)

      expect(beefMeal).toBeInTheDocument();

      userEvent.click(beefMeal);

      expect(history.location.pathname).toBe('/foods/52874')

 
    })
    it('Testa filtro na págima de bebidas', async () => {
        const { history } =  renderWithRouter(
         <RecipeProvider>
            <App />   
         </RecipeProvider>
        )
        history.push('/drinks');
   
        const ordinary = await screen.findByTestId('Ordinary Drink-category-filter');
        userEvent.click(ordinary);
   
        const ordinaryDrink = await screen.findByText(/3-Mile Long Island Iced Tea/i)
   
        await waitFor(() => {
            expect(ordinaryDrink).toBeInTheDocument();

        })
    
       })
    
       it('Testa se título do header é alterado conforme a rota', async () => {
        const { history } =  renderWithRouter(
         <RecipeProvider>
            <App />   
         </RecipeProvider>
        )
        history.push('/drinks');
   
       await waitFor(() => {
        const drinks = screen.getByText(/drinks/i);
        expect(drinks).toBeInTheDocument();
       })

       history.push('/foods');

       await waitFor(() => {
           const foods = screen.getByText(/foods/i);
           expect(foods).toBeInTheDocument();
       
       })
    
       })
})