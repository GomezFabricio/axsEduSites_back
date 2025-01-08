import express from 'express';
import { getAuditorias, createAuditoria, getAuditoriaById } from '../controllers/auditoria.controller.js';

const router = express.Router();

router.get('/', getAuditorias);
router.post('/', createAuditoria);
router.get('/:id', getAuditoriaById);

export default router;