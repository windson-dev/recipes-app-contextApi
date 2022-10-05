import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockedDoneRecipes } from './MOCK/mockedParse';
import renderWithRouter from './rwr/renderWithRouter';
import App from '../App';

const doneRecipesRoute = '/done-recipes';
const drinkName = '155 Belmont';
const mealName = 'Chakchouka';

describe('testa o componente DoneRecipes possuíndo duas receitas finalizadas', () => {
  beforeEach(() => jest
    .spyOn(Storage.prototype, 'getItem')
    .mockReturnValue(JSON.stringify(mockedDoneRecipes)));

  it('testa se renderiza as duas receitas', () => {
    renderWithRouter(<App />, [doneRecipesRoute]);

    userEvent.click(screen.getByRole('button', { name: 'All' }));

    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('testa se renderiza apenas a bebida e o link da receita é copiado', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    renderWithRouter(<App />, [doneRecipesRoute]);

    userEvent.click(screen.getByRole('button', { name: 'Drinks' }));

    expect(screen.getByAltText(drinkName)).toBeDefined();
    expect(screen.queryByAltText(mealName)).toBeNull();

    userEvent.click(screen.getByAltText('shareIcon'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });

  it('testa se renderiza apenas a comida e o link da receita é copiado', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    renderWithRouter(<App />, [doneRecipesRoute]);

    userEvent.click(screen.getByRole('button', { name: 'Meals' }));

    expect(screen.getByAltText(mealName)).toBeDefined();
    expect(screen.queryByAltText(drinkName)).toBeNull();

    userEvent.click(screen.getByAltText('shareIcon'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });
});

describe('testa o componente DoneRecipes não possuíndo nenhuma receita finalizada', () => {
  it('testa se não renderiza nenhuma receita', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    renderWithRouter(<App />, [doneRecipesRoute]);

    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
