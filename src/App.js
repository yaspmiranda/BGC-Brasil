import React from "react";
import { useEffect, useState } from "react";
import { getPokemonData, getPokemons } from "./api";
import "./App.css";
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import Searchbar from "./components/Searchbar";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


function App() {

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const itensPerPage = 500
  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);

      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage))

    } catch (error) {
      console.log("fetchPokemons error: ", error);
      
    }
  
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  return (
    <Authenticator>
      {({ signOut, user}) => (
        <div>
          <Navbar />
          <Searchbar />
          <Pokedex pokemons={pokemons} loading={loading} page={page} setPage={setPage}totalPages={totalPages}/>
          <button onClick={signOut}>Sair</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
