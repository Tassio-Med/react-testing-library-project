import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './support/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente "FavoritePokemons.js"', () => {
  it('Testa se a página contém um heading h2 com o texto'
  + '"Page requested not found😭"', () => {
    renderWithRouter(<NotFound />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se página mostra uma imagem em formato GIF', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', { name: /Pikachu/i });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
