import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/RenderWithRouter';
import userEvent from '@testing-library/user-event'

import App from '../App';

describe('Testes com componente footer', () => {

	it('Testa de footer é renderizado', async() => {
		const { history } = renderWithRouter(<App />, '/foods')
		history.push('/foods');
	
		await waitFor(() => {
			const drinks = screen.getByTestId('drinks-bottom-btn');
			expect(drinks).toBeInTheDocument();
		});
  })

 it('Testa se botão "dinks" renderiza a página de drinks', async() => {
		const { history } = renderWithRouter(<App />)
		history.push('/foods');
	
		await waitFor(() => {
			const drinks = screen.getByTestId('drinks-bottom-btn');
			userEvent.click(drinks);
		});

		const { location: { pathname } } = history;
		expect(pathname).toBe('/drinks');
  })
	
	it('Testa se botão "foods" renderiza a página de foods', async() => {
		const { history } = renderWithRouter(<App />)
		history.push('/drinks');
	
		await waitFor(() => {
			const foods = screen.getByTestId('food-bottom-btn');
			userEvent.click(foods);
		});

		const { location: { pathname } } = history;
		expect(pathname).toBe('/foods');
  })

})