import pokemonlogo from './/assets/pokemonlogo.png'
import React, { useEffect, useState } from 'react'
import PokemonCard from './components/PokemonCard'
import axios from 'axios';
import NextAndPreviousButtons from './components/NextAndPreviousButtons';
import './App.css';

const App = () => {
  const url = 'https://pokeapi.co/api/v2/pokemon/';

  const [allPokemons, setAllPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(url);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAllPokemons() {

      setLoading(true);

      try {

        const res = await axios.get(currentPageUrl);
        const data = res.data;
        // console.log(res)
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
        // console.log(data.previous);

        function createPokemonObject(results) {
          results.map(async pokemon => {
            const res = await axios.get(url + `${pokemon.name}`);
            const data = res.data;
            setAllPokemons(currentList => [...currentList, data]);
          });


        }
        createPokemonObject(data.results);

      } catch (e) {
        console.error(e);
      }
      setLoading(false);

    }
    getAllPokemons();
  }, [currentPageUrl]);

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <div className="header">
      <img
        alt="logo"
        src={pokemonlogo}
        className="pokemonlogo"
      />
      <h1>Pokemon</h1>
      <div className="pokemon-all-cards">
        <NextAndPreviousButtons
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        />
        <div className="pokemon-cards">
          {allPokemons.map((poke, index) =>
            <PokemonCard
              key={index}
              weight={poke.weight}
              move={poke.moves.length}
              name={poke.name}
              image={poke.sprites.front_default}
              abilities={poke.abilities.length > 0 ? poke.abilities.map((ability, i) => { return <p key={i}>{ability.ability.name}</p> }) : null}
            />)}
        </div>
      </div>
    </div>
  );
}

export default App;
