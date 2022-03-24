import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './support/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste o componente "Pokemon.js"', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const pkmName = screen.getByTestId('pokemon-name');
    expect(pkmName).toBeDefined();
    expect(pkmName).toHaveTextContent(/Pikachu/i);

    const pkmType = screen.getByTestId('pokemon-type');
    expect(pkmType).toBeDefined();
    expect(pkmType).toHaveTextContent(/Electric/i);

    const pkmWeight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pkmWeight).toBeDefined();

    const pkmImage = screen.getByRole('img', { name: /Pikachu Sprite/i });
    expect(pkmImage).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pkmImage).toHaveProperty('alt', 'Pikachu sprite');
    expect(pkmImage).toBeDefined();
  });
  it('Testa se o card contém um link de navegação com URL específica', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const linkUrl = screen.getByRole('link', { name: /more details/i });
    expect(linkUrl).toBeDefined();
    expect(linkUrl).toHaveAttribute('href', '/pokemons/25');
  });
  it('Testa o redirecionamento para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const linkUrl = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkUrl);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favoriteIcon = screen.getByRole('img', { name: /pikachu is marked/i });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
