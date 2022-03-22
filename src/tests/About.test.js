import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './support/renderWithRouter';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  it('Testa se contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutHeader = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(aboutHeader).toBeInTheDocument();
  });

  it('Testa se contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParag = screen
      .getByText(/This application simulates a Pokédex, a/i); // Lembrar de usar regex;
    const secondParag = screen
      .getByText(/One can filter Pokémons by type, and see more/i);
    expect(firstParag).toBeInTheDocument();
    expect(secondParag).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toBeInTheDocument();
  });
});
