import express from 'express';
import { getPageContent, createPageContent, updatePageContent, deletePageContent } from '../controllers/pageContent.controller.js';

const router = express.Router();

router.get('/', getPageContent);
router.post('/', createPageContent);
router.put('/:id', updatePageContent);
router.delete('/:id', deletePageContent);

export default router;