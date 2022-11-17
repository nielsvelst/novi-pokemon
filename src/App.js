import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from "./components/Pokemon";
import axios from "axios";
import Button from "./components/Button";


function App() {
    // useEffect(()=>{
    //     if(location) {fetchData();}
    // },[location]);
    const [pokemonUri, setPokemonUri] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [pokemonData,setPokemonData] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);


useEffect(()=>{
    async   function fetchPokemon(){
        toggleLoading(true);
        toggleError(false);
        try {
            const response = await axios.get(`${pokemonUri}`);
            setPokemonData(response.data);
        }
        catch (e){
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }
    if(pokemonUri){fetchPokemon();}
},[pokemonUri])

    function nextHandler() {
        setPokemonUri(pokemonData.next);
    }
    function previousHandler() {
    setPokemonUri(pokemonData.previous);
    }


  return (
      <>
          <div className="button-container">
              <Button
                  clickHandler={previousHandler}
                  disabled={!pokemonData.previous}
              >
                  previous
              </Button>
            <Button
                clickHandler={nextHandler}
                disabled={!pokemonData.next}
            >
                next
            </Button>
          </div>
        <div className="pokemon-container">

            {pokemonData.results && pokemonData.results.map((pokemon)=>{
                return(
                    <Pokemon key={pokemon.name} name={pokemon.name}/>
                )
            })}

            {loading && <p>loading...</p>}
            {error && <p>Er is iets mis gegaan bij het ophalen van de data...</p>}
        </div>
      </>
  );
}

export default App;
