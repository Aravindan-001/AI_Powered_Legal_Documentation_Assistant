
import express from 'express';
import { createRequest, getRequests, updateRequestStatus } from '../controllers/requestController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createRequest);
router.get('/', authenticate, getRequests);
router.put('/:id', authenticate, authorize(['faculty', 'admin']), updateRequestStatus);

export default router;
