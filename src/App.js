import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState('');

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon'); // Fetch first 151 Pokémon
      const pokeData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: details.data.name,
            image: details.data.sprites.front_default,
            id: details.data.id,
          };
        })
      );
      setPokemons(pokeData);
      setFilteredPokemons(pokeData);
    };

    fetchData();
  }, []);

  // Search functionality
  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div className="app">
    <h1>POKEMON</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
