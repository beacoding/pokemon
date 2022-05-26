import axios from "axios";
import { POKEMON_API_BASE_URL, POKEMON_API_SPECIES_BASE_URL } from '../config/routes';
import { structurePokemon } from "./party";

const MAXIMUM_BOX_SIZE = 30;

export const getPokemon = (req, res, next) => {
  const { id } = req.params;
  if (id in global.boxes) {
    res.json(global.boxes[req.params.id.toString()]);
  } else {
    res.status(400).send("Box does not exist")
  }
}

export const addPokemon = async (req, res, next) => {
  const { pokeId } = req.body;
  const { id: boxId } = req.params;
  try {
    if (!(boxId in global.boxes)) {
      throw new Error('Box does not exist');
    }

    if (getBoxSize(boxId) > MAXIMUM_BOX_SIZE) {
      throw new Error(`Box ${boxId} has reached maximum number of pokemon. Please move a pokemon to another box.`)
    }



    const currentBoxIdOfPokemon = global.pokemon[pokeId];
    const isInParty = !!global.party[pokeId];

    let pokemon;

    if (isInParty) {
      // fetch pokemon instance
      pokemon = global.party[pokeId];
      // Set location of pokemon to new box
      global.pokemon[pokeId] = boxId;
      // Remove pokemon from party
      delete global.party[pokeId];
    } else if (currentBoxIdOfPokemon) {
      // fetch pokemon instance
      pokemon = global.boxes[currentBoxIdOfPokemon][pokeId];
      // Set location of pokemon to new box
      global.pokemon[pokeId] = boxId;
      // Remove pokemon from current box
      delete global.boxes[currentBoxIdOfPokemon][pokeId];
    }

    if (!pokemon) {
      // Fetch from API
      const { data: pokemonData } = await axios.get(`${POKEMON_API_BASE_URL}/${pokeId}`);
      const { data: pokemonSpeciesData } = await axios.get(`${POKEMON_API_SPECIES_BASE_URL}/${pokeId}`);
      const data = {
        ...pokemonData,
        ...pokemonSpeciesData,
      }

      pokemon = structurePokemon(data);
    }

    if (boxId in global.boxes) {
      global.boxes[boxId][pokeId] = pokemon;
      global.pokemon[pokeId] = boxId;
      res.status(201).json(global.boxes[boxId]);
    }
  } catch (e) {
    res.status(400).send(e.message);
    return;
  }
}

export const createBox = (req, res, next) => {
  global.boxes[getBoxId()] = {};
  res.sendStatus(201)
}

export const getBoxId = () => {
  return Object.keys(global.boxes).length;
}


const getBoxSize = (id) => {
  return Object.keys(global.boxes[id]).length;
}
