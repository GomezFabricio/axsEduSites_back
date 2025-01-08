import express from 'express';
import { getTrabajosRealizados, createTrabajoRealizado, updateTrabajoRealizado, deleteTrabajoRealizado } from '../controllers/trabajoRealizado.controller.js';

const router = express.Router();

router.get('/', getTrabajosRealizados);
router.post('/', createTrabajoRealizado);
router.put('/:id', updateTrabajoRealizado);
router.delete('/:id', deleteTrabajoRealizado);

export default router;