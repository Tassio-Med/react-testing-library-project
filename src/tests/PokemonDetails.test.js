import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './support/renderWithRouter';
import App from '../App';

describe('Testa o componente "PokemonDetails.js"', () => {
  it('Teste se as informações detalhadas do Pokémon '
  + 'selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const btnDetail = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetail);
    const pkmDetail = screen.getByText(/Pikachu details/i);
    expect(pkmDetail).toBeDefined();
    const summ = screen.getByRole('heading', { name: /Summary/i });
    expect(summ).toBeDefined();
    const textDetail = screen
      .getByText(/This intelligent Pokémon roasts hard berries w/i);
    expect(textDetail).toBeDefined();
  });
  it('Testa se existe na página uma seção com os mapas contendo as '
  + 'localizações do pokémon', () => {
    renderWithRouter(<App />);
    const toDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(toDetails);
    const pkmLocal = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(pkmLocal).toBeDefined();
    const localName = screen.getAllByText(/Kanto/i);
    expect(localName.length).toBe(2);
    const locationImage = screen.getAllByRole('img');
    expect(locationImage[2]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationImage[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('link', { name: /More details/i });
    userEvent.click(button);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDefined();
    userEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    const favLabel = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favLabel).toBeDefined();
    userEvent.click(checkbox);
  });
});
