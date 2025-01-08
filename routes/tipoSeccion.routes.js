import express from 'express';
import { getTiposSeccion, createTipoSeccion, updateTipoSeccion, deleteTipoSeccion } from '../controllers/tipoSeccion.controller.js';

const router = express.Router();

router.get('/', getTiposSeccion);
router.post('/', createTipoSeccion);
router.put('/:id', updateTipoSeccion);
router.delete('/:id', deleteTipoSeccion);

export default router;