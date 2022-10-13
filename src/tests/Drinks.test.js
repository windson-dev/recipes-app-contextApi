import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rwr/renderWithRouter';
import App from '../App';
import mockedDrinks from './MOCK/mockedDrinks';
import mockedShakes from './MOCK/mockedShakes';

const mockedCategories = {
  drinks: [
    {
      strCategory: 'Ordinary Drink',
    },
    {
      strCategory: 'Cocktail',
    },
    {
      strCategory: 'Shake',
    },
    {
      strCategory: 'Other/Unknown',
    },
    {
      strCategory: 'Cocoa',
    },
  ],
};

describe('testa o componente Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn()
        .mockResolvedValue(mockedDrinks) })
      .mockResolvedValueOnce({ json: jest.fn()
        .mockResolvedValue(mockedCategories) })
      .mockResolvedValueOnce({ json: jest.fn()
        .mockResolvedValue(mockedShakes) });
  });

  it('testa se renderiza as receitas corretas', async () => {
    renderWithRouter(<App />, ['/drinks']);

    userEvent.click(await screen.findByRole('button', { name: /all/i }));

    expect(await screen.findByAltText('GG')).toBeDefined();

    userEvent.click(await screen.findByRole('button', { name: /shake/i }));

    expect(await screen.findByAltText('151 Florida Bushwacker')).toBeDefined();
  });
});
