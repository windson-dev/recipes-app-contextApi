import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rwr/renderWithRouter';
import App from '../App';
import mockedMeals from './MOCK/mockedMeals';
import mockedDesserts from './MOCK/mockedDesserts';

const mockedCategories = {
  meals: [
    {
      strCategory: 'Beef',
    },
    {
      strCategory: 'Breakfast',
    },
    {
      strCategory: 'Chicken',
    },
    {
      strCategory: 'Dessert',
    },
    {
      strCategory: 'Goat',
    },
  ],
};

describe('testa o componente Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn()
        .mockResolvedValue(mockedMeals) })
      .mockResolvedValueOnce({ json: jest.fn()
        .mockResolvedValue(mockedCategories) })
      .mockResolvedValueOnce({ json: jest.fn()
        .mockResolvedValue(mockedDesserts) });
  });

  it('testa se renderiza as receitas corretas', async () => {
    renderWithRouter(<App />, ['/meals']);

    userEvent.click(await screen.findByRole('button', { name: /all/i }));

    expect(await screen.findByAltText('Corba')).toBeDefined();

    userEvent.click(await screen.findByRole('button', { name: /dessert/i }));

    expect(await screen.findByAltText('Apam balik')).toBeDefined();
  });
});
