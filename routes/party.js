import express from 'express';
var router = express.Router();
import { getPokemon, addPokemon } from '../controllers/party.js';

router.get('/', getPokemon);
router.post('/pokemon', addPokemon);


export default router;
