import express from 'express';
var router = express.Router();
import { getIndex } from '../controllers/index.js';
/* GET home page. */
router.get('/', getIndex);

export default router;
