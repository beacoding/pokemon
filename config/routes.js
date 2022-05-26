import indexRouter from '../routes/index';
import boxRouter from '../routes/box';
import partyRouter from '../routes/party';

export const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
export const POKEMON_API_SPECIES_BASE_URL = "https://pokeapi.co/api/v2/pokemon-species"

module.exports = (app) => {
    app.use('/', indexRouter);
    app.use('/box', boxRouter);
    app.use('/party', partyRouter);
    // !-- Do not remove this line --! //
};
