import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rwr/renderWithRouter';
import categoryMOCK from './MOCK/categoryMOCK.json';
import App from '../App';

const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = '1234567';
const INVALID_EMAIL = 'test';
const INVALID_PASSWORD = '123456';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(categoryMOCK),
  }));
});

describe('Testes da aplicação', () => {
  test('Testa a página de login', () => {
    const { history } = renderWithRouter(<App />);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    const loginButton = screen.getByTestId('login-submit-btn');
    expect(loginButton).toBeInTheDocument();

    userEvent.type(inputEmail, INVALID_EMAIL);
    userEvent.type(inputPassword, INVALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);

    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    const mealsTitle = screen.getByTestId('page-title');
    expect(mealsTitle).toBeInTheDocument();
  });
});

describe('test', () => {
  test('Testa o redirecionamento do botão de perfil e o funcionamento do botão', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(endpoint);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    const igredientsRadioButton = screen.getByTestId('ingredient-search-radio');
    expect(igredientsRadioButton).toBeInTheDocument();
    const nameRadioButton = screen.getByTestId('name-search-radio');
    expect(nameRadioButton).toBeInTheDocument();
    const firstLatterRadioButton = screen.getByTestId('first-letter-search-radio');
    expect(firstLatterRadioButton).toBeInTheDocument();
    const execSearchButton = screen.getByTestId('exec-search-btn');
    expect(execSearchButton).toBeInTheDocument();

    userEvent.click(searchButton);
    userEvent.click(profileIcon);

    const profileTitle = screen.getByTestId('page-title');
    expect(profileTitle).toBeInTheDocument();
  });
});
