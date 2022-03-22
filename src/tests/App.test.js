import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './support/renderWithRouter';
import App from '../App';

describe(`Testa se o topo da aplicação contém um conjunto fixo de links de 
navegação`, () => {
  it('Testa se o primeiro link possui o texto home', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    expect(linkToHome).toBeDefined();
  });
  it('Testa se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);
    const linkToFavorite = screen.getByRole('link', { name: /About/i });
    expect(linkToFavorite).toBeDefined();
  });
  it('Testa se o terceiro link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkToFavorite).toBeDefined();
  });
});
describe('Testa o redirecionamento das páginas da aplicação', () => {
  it('Testa se é redirecionada para a página inicial, ao clickar no link Home,', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkToHome);
    expect(pathname).toBe('/');
  });
  it('Testa se é redirecionada para a página About, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkToAbout);
    expect(history.location.pathname).toBe('/about');
  });
  it('Testa se ao clicar no link Favorite Pokémons é redirecionada para'
  + 'a página Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    expect(history.location.pathname).toBe('/notfound');
  });
});
