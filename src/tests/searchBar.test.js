import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from '../helpers/RenderWithRouter';

import RecipeProvider from '../contex/RecipeProvider';
import App from '../App';

describe("Testa funcionalidade do componente de busca do header", () => {
    it('Testa se barra de busca é renderizada', () => {
        const { history } = renderWithRouter(
            <RecipeProvider>
                <App />
            </RecipeProvider>
        );
        history.push('/foods');
        const openSearchBtn = screen.getByTestId('search-top-btn');
        userEvent.click(openSearchBtn);
        const searchBar = screen.getByTestId('search-input');
        expect(searchBar).toBeInTheDocument();
    });
    it('Testa busca por nome', async () => {
        const { history } = renderWithRouter(
            <RecipeProvider>
                <App />
            </RecipeProvider>
        );
        history.push('/foods');
        const openSearchBtn = screen.getByTestId('search-top-btn');
        userEvent.click(openSearchBtn);
        const searchBar = screen.getByTestId('search-input');
        const searchBtn = screen.getByTestId('exec-search-btn');
        userEvent.type(searchBar, 'cake');
        userEvent.click(searchBtn);
        // await waitFor(() => {
          const card = await screen.findByText(/pancakes/i);
          expect(card).toBeInTheDocument();
        // });
    })
})