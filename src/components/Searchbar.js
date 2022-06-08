import React from "react";
import { useState } from "react";
import { searchPokemon } from "../api";

const Searchbar = () => {
    const [search, setSearch] = useState("ola")
    const [pokemon, setPokemon] = useState()
    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }

    const onButtonClickHandler = () => {
        onSearchHandler(search)
    }

    const onSearchHandler = async (pokemon) =>{
        const result = await searchPokemon(pokemon)
        setPokemon(result)
      }

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Buscar pokemon" onChange={onChangeHandler} />
            </div>
            <div className="searchbar-btn">
                <button onClick={onButtonClickHandler}>
                    Buscar
                </button>
            </div>
            {pokemon ? (
                <div className="searchbar-poke">
                    <div className="searchbar-poke-image">
                        <img alt={pokemon.name} src={pokemon.sprites.front_default} className="pokemon-image"/>
                    </div>
                    <h3> {pokemon.name} </h3>
                    <div> #{pokemon.id} </div>
                    <div className="searchbar-poke-type">
                    {pokemon.types.map((type, index) => {
                        return (
                            <div key={index} className="searchbar-type-text">{type.type.name}</div>
                        )
                    })}
                </div>
                </div>
            ) : null}
        </div>
    )
}

export default Searchbar;