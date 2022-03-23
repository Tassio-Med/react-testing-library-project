import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './support/renderWithRouter';

describe('Testa o componente "Pokedex.js"', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { level: 2, name: /encountered pokémo/i });
    expect(h2).toBeDefined();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando '
  + 'o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId('next-pokemon');
    expect(nextBtn).toHaveTextContent(/próximo pokémon/i);
    userEvent.click(nextBtn);

    const pkm1 = screen.getByText(/charmander/i);
    expect(pkm1).toBeDefined();
    userEvent.click(nextBtn);

    const pkm2 = screen.getByText(/caterpie/i);
    expect(pkm2).toBeDefined();
    userEvent.click(nextBtn);

    const pkm3 = screen.getByText(/ekans/i);
    expect(pkm3).toBeDefined();
    userEvent.click(nextBtn);
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const eachPkm = screen.getAllByTestId('pokemon-name');
    expect(eachPkm).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterBtn = screen.getByRole('button', { name: /bug/i });
    userEvent.click(filterBtn);
    const fault = screen.getAllByText(/bug/i);
    expect(fault.length).toBe(2);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(resetBtn);
    const namePkm = screen.getByTestId('pokemon-name');
    expect(namePkm).toBeInTheDocument();
    expect(namePkm).toHaveTextContent(/pikachu/i);
  });
});
