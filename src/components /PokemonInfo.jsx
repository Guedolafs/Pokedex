import React, { useEffect, useState } from 'react';
import './PokemonInfo.css';

function PokemonInfo() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        setTotalPages(Math.ceil(data.count / itemsPerPage));
        setPokemonList(data.results);
      } catch (error) {
        console.log('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [itemsPerPage]);

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching Pokémon details:', error);
    }
  };

  useEffect(() => {
    if (pokemonList.length === 0) {
      return;
    }

    const fetchDetails = async () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = currentPage * itemsPerPage;
      const pokemonSubset = pokemonList.slice(startIndex, endIndex);

      const details = await Promise.all(
        pokemonSubset.map((pokemon) => fetchPokemonDetails(pokemon.url))
      );

      setPokemonList((prevList) =>
        prevList.map((pokemon, index) => ({
          ...pokemon,
          details: details[index],
        }))
      );
    };

    fetchDetails();
  }, [currentPage, itemsPerPage, pokemonList]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="pokemon-info">
      {pokemonList.length > 0 ? (
        <div className="pokemon-info">
          {pokemonList.map((pokemon, index) => (
            <div key={index} className="pokemon-card">
              <h2>{pokemon.name}</h2>
              {pokemon.details ? (
                <React.Fragment>
                  <p>ID: {pokemon.details.id}</p>
                  <p>Base Experience: {pokemon.details.base_experience}</p>
                  <p>Height: {pokemon.details.height}</p>
                  <p>Order: {pokemon.details.order}</p>
                  <p>Weight: {pokemon.details.weight}</p>
                </React.Fragment>
              ) : (
                <p>Loading Pokémon details...</p>
              )}
              {pokemon.details && (
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.details.id}.png`}
                  alt={pokemon.name}
                />
              )}
            </div>
          ))}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage <= 1}>
              Prev Page
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
              Next Page
            </button>
          </div>
        </div>
      ) : (
        <p>Loading Pokémon data...</p>
      )}
    </div>
  );
}

export default PokemonInfo;
