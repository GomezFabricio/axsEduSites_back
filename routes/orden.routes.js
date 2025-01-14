import express from 'express';
import { getOrden, createOrden, updateOrden, deleteOrden } from '../controllers/orden.controller.js';

const router = express.Router();

router.get('/', getOrden);
router.post('/', createOrden);
router.put('/:id', updateOrden);
router.delete('/:id', deleteOrden);

export default router;