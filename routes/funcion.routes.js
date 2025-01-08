import express from 'express';
import { getFunciones, createFuncion, updateFuncion, deleteFuncion } from '../controllers/funcion.controller.js';

const router = express.Router();

router.get('/', getFunciones);
router.post('/', createFuncion);
router.put('/:id', updateFuncion);
router.delete('/:id', deleteFuncion);

export default router;