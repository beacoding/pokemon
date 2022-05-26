import express from 'express';
var router = express.Router();
import { getPokemon, addPokemon, createBox } from '../controllers/box.js';
/* GET home page. */
router.get('/:id', getPokemon);
router.post('/:id/pokemon', addPokemon);
router.post('/', createBox);

export default router;
