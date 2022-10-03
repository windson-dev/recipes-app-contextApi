import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rwr/renderWithRouter';
import Meals from '../../cypress/mocks/meals';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
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
const SEARCH_IMPUT = 'search-input';
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
  afterEach(() => cleanup());

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
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(Meals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    renderWithRouter(<App />, '/meals');

    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
    const endpoint2 = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    expect(global.fetch).toHaveBeenCalledWith(endpoint2);
  });

  test('Testa a renderização dos itens com test id', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(Meals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    renderWithRouter(<App />, '/meals');
    const profileTopBTN = screen.getByTestId(PROFILE_TOP_BTN);
    expect(profileTopBTN).toBeInTheDocument();
    const searchTopBTN = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchTopBTN).toBeInTheDocument();
    const mealsBottomBTN = screen.getByTestId(MEALS_BOTTOM_BTN);
    expect(mealsBottomBTN).toBeInTheDocument();
    const drinksBottomBTN = screen.getByTestId(DRINKS_BOTTOM_BTN);
    expect(drinksBottomBTN).toBeInTheDocument();

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));

    expect(screen.getByTestId(SEARCH_IMPUT)).toBeInTheDocument();
    expect(screen.getByTestId(IGREDIENTS_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId(EXEC_SEARCH_BTN)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /beef/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /breakfast/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chicken/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /goat/i })).toBeInTheDocument();
  });

  test('Testa se uma pesquisa é executada com sucesso', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(Meals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });
    renderWithRouter(<App />, '/meals');

    // const email = screen.getByTestId(EMAIL_IMPUT);
    // expect(email).toBeInTheDocument();
    // userEvent.type(screen.getByTestId(EMAIL_IMPUT), VALID_EMAIL);
    // userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    // userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.type(screen.getByTestId(SEARCH_IMPUT), 'Salt');
    userEvent.click(screen.getByTestId(IGREDIENTS_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
  });
});
