import express from 'express';
import { createLead, getLeads, getLeadById, updateLead, deleteLead, searchLeads } from '../controllers/leadController.js';

const router = express.Router();

router.post('/create', createLead);
router.get('/', getLeads);
router.get('/search', searchLeads);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;
