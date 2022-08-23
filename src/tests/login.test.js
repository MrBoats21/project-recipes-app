import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';

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
  
  })