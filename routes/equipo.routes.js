import express from 'express';
import { getEquipo, createEquipo, updateEquipo, deleteEquipo } from '../controllers/equipo.controller.js';

const router = express.Router();

router.get('/', getEquipo);
router.post('/', createEquipo);
router.put('/:id', updateEquipo);
router.delete('/:id', deleteEquipo);

export default router;