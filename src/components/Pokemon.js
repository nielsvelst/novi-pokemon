import React,{useState, useEffect} from "react";
import axios from "axios";

function Pokemon({name}){
    const [pokemonData, setPokemonData] = useState({});


    useEffect(()=>{
        async   function fetchData(){
            try{
                const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemonData(data);
            }
            catch (e){
                console.error(e);
            }
        }
        fetchData();
    },[name]);
    return(
        <>
                {Object.keys(pokemonData).length > 0 &&
                    <article>
                        <p>Name: {pokemonData.name}</p>
                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name}/>
                        <p>Moves: {pokemonData.moves.length}</p>
                        <p>Weigth: {pokemonData.weight}</p>
                        <p>Abilities:</p>
                        <ul>
                            {pokemonData.abilities.map((ability)=>{
                                return <li key={`${ability.ability.name}-${pokemonData.name}`}>
                                    {ability.ability.name}
                                </li>
                            })}
                        </ul>
                    </article>}
        </>
    );
}

export default Pokemon;