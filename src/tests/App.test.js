import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rwr/renderWithRouter';
// import categoryMOCK from './MOCK/categoryMOCK.json';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = '1234567';
const INVALID_EMAIL = 'test';
const INVALID_PASSWORD = '123456';
const EMAIL_IMPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const PROFILE_TOP_BTN = 'profile-top-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const IGREDIENTS_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const ALL_CATEGORY_FILTER = 'All-category-filter';
const MEALS_BOTTOM_BTN = 'meals-bottom-btn';
const DRINKS_BOTTOM_BTN = 'drinks-bottom-btn';

// beforeEach(() => {
//   global.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve(categoryMOCK),
//   }));
// });

const renderTestId = (testid) => {
  const getTestId = screen.getByTestId(testid);
  expect(getTestId).toBeInTheDocument();
};

describe('1 - Testes a página de Login', () => {
  test('Testa se a página de Login é renderizada na rota "/"', () => {
    const { history } = renderWithRouter(<App />);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Testa se os elementos com data-testid são renderizados na tela de login', () => {
    render(<App />);
    const loginTestIds = [
      EMAIL_IMPUT,
      PASSWORD_INPUT,
      LOGIN_SUBMIT_BTN,
    ];

    loginTestIds.map((e) => renderTestId(e));
  });

  test('Testa a validação e o redirecionamento do do botão ao inserir email e senha na página de login', () => {
    render(<App />);
    const inputEmail = screen.getByTestId(EMAIL_IMPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(LOGIN_SUBMIT_BTN);

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

describe('2 - Testa a página Meals', () => {
  test('Testa se a aplicação faz uma requisição a API', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  });

  test('Testa se os elementos com data-testid são renderizados na tela de Meals', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();

    const mealsTestIds = [
      PROFILE_TOP_BTN,
      ALL_CATEGORY_FILTER,
      // 'Beef-category-filter',
      // 'Breakfast-category-filter',
      // 'Chicken-category-filter',
      // 'Dessert-category-filter',
      // 'Goat-category-filter',
      MEALS_BOTTOM_BTN,
      DRINKS_BOTTOM_BTN,
    ];

    await waitFor(
      () => mealsTestIds.map((e) => renderTestId(e)),
      { timeout: 3000 },
    );

    const searchButtonIds = [
      SEARCH_INPUT,
      IGREDIENTS_SEARCH_RADIO,
      NAME_SEARCH_RADIO,
      FIRST_LETTER_SEARCH_RADIO,
      EXEC_SEARCH_BTN,
    ];

    userEvent.click(searchButton);

    searchButtonIds.map((e) => renderTestId(e));

    userEvent.click(searchButton);
  });

  test('Testa se ao pesquisar pelo igrediente Sal, receitas que contém sal é renderizadas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Salt');
    userEvent.click(screen.getByTestId(IGREDIENTS_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(global.fetch).toHaveBeenCalled();
  });

  test('Testa se ao clicar no profile-icon, o usuário é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const profileIcon = screen.getByTestId(PROFILE_TOP_BTN);
    userEvent.click(profileIcon);

    const profileTitle = screen.getByTestId('page-title');
    expect(profileTitle).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão meals a página é redirecionada para /meals', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    userEvent.click(screen.getByTestId(MEALS_BOTTOM_BTN));

    expect(history.location.pathname).toBe('/meals');
  });

  test('Testa se ao clicar no botão drinks a página é redirecionada para /drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals)
        .mockResolvedValue(drinks),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const drinkBtn = screen.getByTestId(DRINKS_BOTTOM_BTN);
    expect(drinkBtn).toBeInTheDocument();

    userEvent.click(drinkBtn);

    await waitFor(
      () => expect(history.location.pathname).toBe('/drinks'),
      { timeout: 3000 },
    );
  });
});

// describe('Testando Header', () => {
//   test('Testando o SearchBar', () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/meals');

//     const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(searchIcon);
//     const searchInput = screen.getByTestId(SEARCH_INPUT);
//     userEvent.type(searchInput, 's');
//     const firstLetterSearchButton = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
//     userEvent.click(firstLetterSearchButton);
//     const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
//     userEvent.click(searchButton);

//     const firstRecipe = screen.getByTestId('0-card-img');
//     expect(firstRecipe).toBeInTheDocument();
//   });
// });
