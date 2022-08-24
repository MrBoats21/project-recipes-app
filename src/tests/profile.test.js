import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';
import { Profile } from '../pages';
import App from '../App';

describe('Testa a cobertura da tela de perfil',()=> {
    it('Testa se os botões estão presentes na tela de perfil', () => {
     const { history } = renderWithRouter(<App />);
      const emailInput = screen.getByTestId('email-input')
      const senha = screen.getByTestId('password-input')
      const login = screen.getByTestId('login-submit-btn')

      userEvent.type(emailInput, 'teste@gmail.com')
      userEvent.type(senha, '1234567')
      userEvent.click(login)

      history.push('/Profile')
     
      const email = screen.getByTestId('profile-email')
      const doneRecipesBtn = screen.getByTestId('profile-done-btn')
      const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn')
      const logOut = screen.getByTestId('profile-logout-btn')

      expect(logOut).toBeInTheDocument()
      expect(email).toBeInTheDocument()
      expect(doneRecipesBtn).toBeInTheDocument()
      expect(favoriteRecipesBtn).toBeInTheDocument()
    })
    it('Testa botão de receitas feitas', async () => {
        const { history } = renderWithRouter(<App />);
        const { location: { pathname } } = history;

        const emailInput = screen.getByTestId('email-input')
        const senha = screen.getByTestId('password-input')
        const login = screen.getByTestId('login-submit-btn')

        userEvent.type(emailInput, 'teste@gmail.com')
        userEvent.type(senha, '1234567')
        userEvent.click(login)

        history.push('/Profile')

        const button = screen.getByTestId('profile-done-btn')
   
        userEvent.click(button)
        expect(history.location.pathname).toBe('/done-recipes');
    })

    it('Testa botão de receitas favoritas', async () => {
        const { history } = renderWithRouter(<App />);
        const { location: { pathname } } = history;

        const emailInput = screen.getByTestId('email-input')
        const senha = screen.getByTestId('password-input')
        const login = screen.getByTestId('login-submit-btn')

        userEvent.type(emailInput, 'teste@gmail.com')
        userEvent.type(senha, '1234567')
        userEvent.click(login)

        history.push('/Profile')

        const button = screen.getByTestId('profile-favorite-btn')
   
        userEvent.click(button)
        expect(history.location.pathname).toBe('/favorite-recipes');
    })

    it('Testa botão de receitas feitas', async () => {
        const { history } = renderWithRouter(<App />);
        const { location: { pathname } } = history;

        const emailInput = screen.getByTestId('email-input')
        const senha = screen.getByTestId('password-input')
        const login = screen.getByTestId('login-submit-btn')

        userEvent.type(emailInput, 'teste@gmail.com')
        userEvent.type(senha, '1234567')
        userEvent.click(login)

        history.push('/Profile')

        const button = screen.getByTestId('profile-done-btn')
   
        userEvent.click(button)
        expect(history.location.pathname).toBe('/done-recipes');
    })

    it('Testa botão de logOut', async () => {
        const { history } = renderWithRouter(<App />);
        const { location: { pathname } } = history;

        const emailInput = screen.getByTestId('email-input')
        const senha = screen.getByTestId('password-input')
        const login = screen.getByTestId('login-submit-btn')

        userEvent.type(emailInput, 'teste@gmail.com')
        userEvent.type(senha, '1234567')
        userEvent.click(login)

        history.push('/Profile')

        const button = screen.getByTestId('profile-logout-btn')
   
        userEvent.click(button)
        expect(pathname).toBe('/');
    })
  })