import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [showPokemonData, setShowPokemonData] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
        setError(null);
        setShowPokemonData(true);
      } else {
        setPokemonData(null);
        setError('Pokémon not found');
        setShowPokemonData(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setPokemonData(null);
      setError('Error fetching Pokémon');
      setShowPokemonData(false);
    }
    setSearchTerm('');
  };

  const handleCloseClick = () => {
    setPokemonData(null);
    setError(null);
    setShowPokemonData(false);
  };

  return (
    <nav className="navbar">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Digite o nome do Pokémon"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" type="submit">Pesquisar</button>
      </form>
      {showPokemonData && (
        <div className="campo-busca">
          <button className="close-button" onClick={handleCloseClick}>Fechar</button>
            <div className="pokemon-card">          
              <h2>{pokemonData.name}</h2>
              <p>ID: {pokemonData.id}</p>
              <p>Base Experience: {pokemonData.base_experience}</p>
              <p>Height: {pokemonData.height}</p>
              <p>Order: {pokemonData.order}</p>
              <p>Weight: {pokemonData.weight}</p>
              <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
              alt={pokemonData.name}
            />
            </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </nav>
  );
}

export default Navbar;
