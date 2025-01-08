import express from 'express';
import { getServicios, createServicio, updateServicio, deleteServicio } from '../controllers/servicio.controller.js';

const router = express.Router();

router.get('/', getServicios);
router.post('/', createServicio);
router.put('/:id', updateServicio);
router.delete('/:id', deleteServicio);

export default router;