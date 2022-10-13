import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rwr/renderWithRouter';
import App from '../App';
import mockedCubaLibre from './MOCK/mockedCubaLibre';
import mockedMeals from './MOCK/mockedMeals';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const PATH = '/drinks/11288';

describe('testa o componente DrinkDetails', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn()
        .mockResolvedValue(mockedCubaLibre) })
      .mockResolvedValueOnce({ json: jest.fn()
        .mockResolvedValue(mockedMeals) });
  });

  it('testa se o componente é corretamente renderizado', async () => {
    renderWithRouter(<App />, [PATH]);

    expect(await screen.findByText('Cuba Libre')).toBeDefined();
  });

  it('testa se o link da receita é copiado para o clipboard', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    renderWithRouter(<App />, [PATH]);

    userEvent.click(screen.getByAltText('shareIcon'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });

  it('testa se é possível favoritar e desfavoritar a receita', async () => {
    renderWithRouter(<App />, [PATH]);

    userEvent.click(screen.getByAltText('favoriteIcon'));

    expect(screen.getByAltText('favoriteIcon')).toHaveAttribute('src', blackHeartIcon);

    userEvent.click(screen.getByAltText('favoriteIcon'));

    expect(screen.getByAltText('favoriteIcon')).toHaveAttribute('src', whiteHeartIcon);
  });

  it('testa se a receita aparece favoritada caso tenha sido salva no localStorage', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(JSON.stringify([{ id: '11288' }]));

    renderWithRouter(<App />, [PATH]);

    expect(screen.getByAltText('favoriteIcon')).toHaveAttribute('src', blackHeartIcon);
  });
});
