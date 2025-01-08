import express from 'express';
import { getSecciones, createSeccion, updateSeccion, deleteSeccion } from '../controllers/seccion.controller.js';

const router = express.Router();

router.get('/', getSecciones);
router.post('/', createSeccion);
router.put('/:id', updateSeccion);
router.delete('/:id', deleteSeccion);

export default router;