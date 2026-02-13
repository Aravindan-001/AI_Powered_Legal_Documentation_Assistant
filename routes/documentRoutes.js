
import express from 'express';
import { 
  generateDocument, 
  saveDocument, 
  getAllDocuments, 
  getDocumentById,
  updateDocument,
  deleteDocument
} from '../controllers/documentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate-document', authenticate, generateDocument);
router.post('/save-document', authenticate, saveDocument);
router.get('/documents', authenticate, getAllDocuments);
router.get('/document/:id', authenticate, getDocumentById);
router.put('/document/:id', authenticate, updateDocument);
router.delete('/document/:id', authenticate, deleteDocument);

export default router;
