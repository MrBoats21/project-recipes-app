import React, { useReducer } from 'react';
import { findByText, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/RenderWithRouter';
import Header from './componets/Header'

describe('Verifica a cobertura de 45% da tela de Login',()=> {
  it('teste login', async () => {
   renderWithRouter(<App />)
    const email = screen.getByTestId('email-input')
    const senha = screen.getByTestId('password-input')
    const button = screen.getByTestId('login-submit-btn')
    expect(button).toBeDisabled()
    userEvent.type(email, 'gelso02@live.com')
    userEvent.type(senha, '1234567')
    expect(button).toBeEnabled()
    userEvent.click(button)
  })
  it('Verifica o comportamento do botão e da barra de pesquisa', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/foods');

    const SEARCH_BTN = screen.getByTestId('search-top-btn');
    userEvent.click(SEARCH_BTN);

    const SEARCH_BAR = screen.getByTestId('search-input');
    expect(SEARCH_BAR).toBeInTheDocument();

    userEvent.click(SEARCH_BTN);
    expect(SEARCH_BAR).not.toBeInTheDocument();
  });
})