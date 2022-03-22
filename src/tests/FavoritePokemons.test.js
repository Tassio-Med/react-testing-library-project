import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './support/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente "FavoritePokemons.js" />', () => {
  it('Testa se a mensagem No favorite pokemon found se é exibido na tela,'
  + ' se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const msgNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(msgNotFound).toBeInTheDocument();
  });
  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetails);

    const favCheckbox = screen.getByRole('checkbox');
    userEvent.click(favCheckbox);

    const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favLink);

    const favPokemon = screen.getByTestId('pokemon-name');
    expect(favPokemon).toBeDefined();
  });
});
