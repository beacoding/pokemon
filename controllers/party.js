import axios from 'axios';
import { POKEMON_API_BASE_URL, POKEMON_API_SPECIES_BASE_URL } from '../config/routes';

export const PARTY = "party";
const MAXIMUM_PARTY_SIZE = 6;

export const getPokemon = (req, res, next) => {
  res.json(global.party);
}


export const addPokemon = async (req, res, next) => {
  const { pokeId } = req.body;

  try {
    if (getPartySize() >= MAXIMUM_PARTY_SIZE) {
      throw new Error("Maximum party size of 6 has been reached. Please move a pokemon to a box.");
    }

    const currentBoxIdOfPokemon = global.pokemon[pokeId];
    let pokemon;

    if (currentBoxIdOfPokemon) {
      // fetch instance of pokemon
      pokemon = global.boxes[currentBoxIdOfPokemon][pokeId];
      // Set location of pokemon to party
      global.pokemon[pokeId] = PARTY;
      // Delete from boxes
      delete global.boxes[currentBoxIdOfPokemon][pokeId];
      // Add pokemon to party
    }

    if (!pokemon) {
      // fetch from api
      const { data: pokemonData } = await axios.get(`${POKEMON_API_BASE_URL}/${pokeId}`);
      const { data: pokemonSpeciesData } = await axios.get(`${POKEMON_API_SPECIES_BASE_URL}/${pokeId}`);
      const data = {
        ...pokemonData,
        ...pokemonSpeciesData,
      }
      pokemon = structurePokemon(data);
    }

    global.party[pokeId] = pokemon;
    res.json(pokemon);
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const getPartySize = () => {
  console.log(Object.keys(global.party))
  return Object.keys(global.party).length;
}

export const structurePokemon = (data) => {
  const { id, name, height, weight, base_happiness } = data;
  return {
    pokeId: id, 
    name,
    height,
    weight,
    base_happiness,
  }
}
