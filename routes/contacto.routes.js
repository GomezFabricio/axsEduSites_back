import express from 'express';
import { getContactos, createContacto, deleteContacto } from '../controllers/contacto.controller.js';

const router = express.Router();

router.get('/', getContactos);
router.post('/', createContacto);
router.delete('/:id', deleteContacto);

export default router;