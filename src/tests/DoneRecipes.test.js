import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockedParse from './MOCK/mockedParse';
import DoneRecipes from '../components/DoneRecipes';

describe('testa o componente DoneRecipes possuíndo duas receitas finalizadas', () => {
  beforeEach(() => jest
    .spyOn(Storage.prototype, 'getItem')
    .mockReturnValue(JSON.stringify(mockedParse)));

  it('testa se renderiza as duas receitas', () => {
    render(<DoneRecipes />);

    userEvent.click(screen.getByRole('button', { name: 'All' }));

    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('testa se renderiza apenas a bebida', () => {
    render(<DoneRecipes />);

    userEvent.click(screen.getByRole('button', { name: 'Drinks' }));

    expect(screen.getByAltText('155 Belmont')).toBeDefined();
    expect(screen.queryByAltText('Chakchouka')).toBeNull();
  });

  it('testa se renderiza apenas a comida', () => {
    render(<DoneRecipes />);

    userEvent.click(screen.getByRole('button', { name: 'Meals' }));

    expect(screen.getByAltText('Chakchouka')).toBeDefined();
    expect(screen.queryByAltText('155 Belmont')).toBeNull();
  });
});

describe('testa o componente DoneRecipes não possuíndo nenhuma receita finalizada', () => {
  it('testa se não renderiza nenhuma receita', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(<DoneRecipes />);

    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
