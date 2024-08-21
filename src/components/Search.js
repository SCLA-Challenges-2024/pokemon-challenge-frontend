import React, { useState } from "react";
import './Search.css';

export default function Search() {
    const [searchPokemonName, setSearchPokemonName] = useState("");
    const [pokemonType, setPokemonType] = useState("");
    const [pokemonImage, setPokemonImage] = useState("");

    function handleChange(e) {
        setSearchPokemonName(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost:8000/get-pokemon-by-name/${searchPokemonName}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
        }
        const responseData = await response.json();
        console.log(responseData);
        setPokemonType(responseData.types[0].type.name);
        setPokemonImage(responseData.sprites.front_default);
    }

    return (
        <div className="container">
            <form method="post" onSubmit={handleSubmit}>
                <input onChange={handleChange}></input>
                <button type="submit">Search</button>
            </form>
            <p>{pokemonType}</p>
            {pokemonImage && <img src={pokemonImage} alt="Pokemon" /> }
        </div>
    )
}