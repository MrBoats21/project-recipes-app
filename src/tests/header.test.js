import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';
import Header from '../componets/Header'

describe('Verifica a cobertura do componente Header',()=> {
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

  });
