import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockedFavoriteRecipes } from './MOCK/mockedParse';
import renderWithRouter from './rwr/renderWithRouter';
import App from '../App';

const favoriteRecipesRoute = '/favorite-recipes';

describe('testa o componente FavoriteRecipes possuíndo duas receitas favoritadas', () => {
  beforeEach(() => jest
    .spyOn(Storage.prototype, 'getItem')
    .mockReturnValue(JSON.stringify(mockedFavoriteRecipes)));

  it('testa se renderiza as duas receitas', () => {
    renderWithRouter(<App />, [favoriteRecipesRoute]);

    userEvent.click(screen.getByRole('button', { name: 'All' }));

    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('testa se renderiza apenas a bebida', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    renderWithRouter(<App />, [favoriteRecipesRoute]);

    userEvent.click(screen.getByRole('button', { name: 'Drinks' }));

    expect(screen.getByAltText('155 Belmont')).toBeDefined();
    expect(screen.queryByAltText('Chakchouka')).toBeNull();

    userEvent.click(screen.getByAltText('shareIcon'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });

  it('testa se renderiza apenas a comida e é possível desfavoritá-la', () => {
    renderWithRouter(<App />, [favoriteRecipesRoute]);

    userEvent.click(screen.getByRole('button', { name: 'Meals' }));

    expect(screen.getByAltText('Chakchouka')).toBeDefined();
    expect(screen.queryByAltText('155 Belmont')).toBeNull();

    userEvent.click(screen.getByAltText('blackHeartIcon'));

    waitFor(() => expect(screen.queryByAltText('Chakchouka')).toBeNull());
  });
});

describe('testa o componente FavoriteRecipes não possuíndo nenhuma receita favoritada', () => {
  it('testa se não renderiza nenhuma receita', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    renderWithRouter(<App />, [favoriteRecipesRoute]);

    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
