import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rwr/renderWithRouter';
import App from '../App';
import mockedCarbonara from './MOCK/mockedCarbonara';
import mockedCubaLibre from './MOCK/mockedCubaLibre';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const DRINK_PATH = '/drinks/11288/in-progress';
const MEAL_PATH = '/meals/52982/in-progress';

describe('testa o componente RecipeInProgress', () => {
  it('testa se é possível marcar e desmarcar um ingrediente', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn()
        .mockResolvedValue(mockedCarbonara) });

    renderWithRouter(<App />, [MEAL_PATH]);

    userEvent.click(await screen.findByLabelText('Bacon'));
    userEvent.click(await screen.findByLabelText('Black Pepper'));

    expect(screen.getByLabelText('Bacon')).toBeChecked();

    userEvent.click(screen.getByLabelText('Bacon'));

    expect(screen.getByLabelText('Bacon')).not.toBeChecked();
  });

  it(
    `testa se o botão de "Finish Recipe" só habilita após todos os ingredientes 
    estarem marcados e a aplicação é redirecionada ao clicar no botão`,
    async () => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValue({ json: jest.fn()
          .mockResolvedValue(mockedCubaLibre) });

      const { history } = renderWithRouter(<App />, [DRINK_PATH]);

      userEvent.click(await screen.findByLabelText('Light rum'));
      userEvent.click(await screen.findByLabelText('Light rum'));
      userEvent.click(await screen.findByLabelText('Light rum'));
      userEvent.click(await screen.findByLabelText('Lime'));
      userEvent.click(await screen.findByLabelText('Coca-Cola'));

      expect(screen.getByRole('button', { name: 'Finish Recipe' })).toBeEnabled();

      userEvent.click(screen.getByRole('button', { name: 'Finish Recipe' }));

      expect(history.location.pathname).toBe('/done-recipes');
    },
  );

  it('testa se o link da receita é copiado para o clipboard', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn()
        .mockResolvedValue(mockedCarbonara) });

    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    renderWithRouter(<App />, [MEAL_PATH]);

    userEvent.click(screen.getByAltText('shareIcon'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });

  it('testa se é possível favoritar e desfavoritar a receita', () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn()
        .mockResolvedValue(mockedCarbonara) });

    renderWithRouter(<App />, [MEAL_PATH]);

    userEvent.click(screen.getByAltText('favoriteIcon'));

    expect(screen.getByAltText('favoriteIcon')).toHaveAttribute('src', blackHeartIcon);

    userEvent.click(screen.getByAltText('favoriteIcon'));

    expect(screen.getByAltText('favoriteIcon')).toHaveAttribute('src', whiteHeartIcon);
  });
});
