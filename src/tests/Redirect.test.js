import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rwr/renderWithRouter';
import App from '../App';

describe('testa o clique dos botões', () => {
  it('testa o botão da página da bebida', () => {
    const { history } = renderWithRouter(<App />, ['/drinks/14752']);

    userEvent.click(screen.getByRole('button', { name: /start recipe/i }));

    expect(history.location.pathname).toBe('/drinks/14752/in-progress');
  });

  it('testa o botão da página da comida', () => {
    const { history } = renderWithRouter(<App />, ['/meals/52982']);

    userEvent.click(screen.getByRole('button', { name: /start recipe/i }));

    expect(history.location.pathname).toBe('/meals/52982/in-progress');
  });

  it('testa se o texto renderizado no botão é "Continue Recipe" caso a receita esteja em andamento', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(JSON.stringify({ drinks: { 14752: [] }, meals: {} }))
      .mockReturnValueOnce(null);

    renderWithRouter(<App />, ['/drinks/14752']);

    expect(screen.getByRole('button', { name: /continue recipe/i })).toBeDefined();

    jest.clearAllMocks();
  });

  it('testa se o texto renderizado no botão é "Continue Recipe" caso a receita esteja em andamento', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(JSON.stringify({ drinks: { }, meals: { 52982: [] } }))
      .mockReturnValueOnce(null);

    renderWithRouter(<App />, ['/meals/52982']);

    expect(screen.getByRole('button', { name: /continue recipe/i })).toBeDefined();

    jest.clearAllMocks();
  });
});
