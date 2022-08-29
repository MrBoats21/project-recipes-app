import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe('Testa a cobertura da tela receitas em progresso',()=> {
    it('Testa se os botões estão presentes na tela receitas em progresso(foods)', async () => {
     const { history } = renderWithRouter(<App />);
     history.push('/foods/52929/in-progress')


     await waitFor(() => {
        const img = screen.getByTestId('recipe-photo')
        expect(img).toBeInTheDocument()
        const favorite = screen.getByTestId('favorite-btn')
        const share = screen.getByTestId('share-btn')
        const checkboxes = screen.getAllByRole('checkbox')
   
        expect(favorite).toBeInTheDocument()
        expect(share).toBeInTheDocument()
        expect(checkboxes).toHaveLength(9)
        userEvent.click(share)
    }) 
    })

    it('Testa se os botões estão presentes na tela receitas em progresso(drinks)', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks/15997/in-progress')

        await waitFor(() => {
           const img = screen.getByTestId('recipe-photo')
           expect(img).toBeInTheDocument()
           const favorite = screen.getByTestId('favorite-btn')
           const share = screen.getByTestId('share-btn')
           const checkboxes = screen.getAllByRole('checkbox')
      
           expect(favorite).toBeInTheDocument()
           expect(share).toBeInTheDocument()
           expect(checkboxes).toHaveLength(3)
       }) 
    })

    it('Testa as checkboxes', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks/15997/in-progress')

        await waitFor(() => {
           const checkboxes = screen.getAllByRole('checkbox')
           userEvent.click(checkboxes[0])
      
           expect(checkboxes[0].checked).toEqual(true)
           userEvent.click(checkboxes[0])
       }) 
    })
    it('Testa botão de finalizar receita', async () => {
        const { history } = renderWithRouter(<App />);
        const { location: { pathname } } = history;

        history.push('/drinks/15997/in-progress')
        const btn = screen.getByTestId('finish-recipe-btn')
        userEvent.click(btn)
        expect(pathname).toEqual('done-recipes')
    })
  })