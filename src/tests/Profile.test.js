import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rwr/renderWithRouter';
import App from '../App';

const email = 'travis@scott.com';

describe('testa o componente Profile com o e-mail salvo no localStorage', () => {
  beforeAll(() => localStorage.setItem('user', JSON.stringify({ email })));

  beforeEach(() => {
    renderWithRouter(<App />, ['/profile']);
  });

  it('testa se o e-mail é renderizado', () => {
    expect(screen.getByText(email)).toBeDefined();
  });

  it('testa se a aplicação é redirecionada para /done-recipes', () => {
    userEvent.click(screen.getByRole('button', { name: 'Done Recipes' }));

    expect(screen.getByRole('button', { name: 'All' })).toBeDefined();
  });

  it('testa se a aplicação é redirecionada para /favorite-recipes', () => {
    userEvent.click(screen.getByRole('button', { name: 'Favorite Recipes' }));

    expect(screen.getByText('Favorite Recipes')).toBeDefined();
  });

  it('testa se a aplicação é redirecionada para / e o localStorage é limpo', () => {
    userEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDefined();
    expect(localStorage.getItem('user')).toBeNull();
  });
});

describe('testa o componente Profile sem o e-mail salvo no localStorage', () => {
  it('testa se o e-mail não é renderizado caso ele não tenha sido salvo no localStorage', () => {
    renderWithRouter(<App />, ['/profile']);

    expect(screen.queryByText(email)).toBeNull();
  });
});
