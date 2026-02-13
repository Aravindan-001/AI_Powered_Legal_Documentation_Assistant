
import Document from '../models/Document.js';
import Log from '../models/Log.js';
import { generateDraft } from '../services/aiService.js';

export const generateDocument = async (req, res) => {
  try {
    const result = await generateDraft(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error generating document', error: error.message });
  }
};

export const saveDocument = async (req, res) => {
  try {
    const doc = new Document({
      ...req.body,
      userId: req.user.id
    });
    await doc.save();
    
    await new Log({
      user_id: req.user.id,
      action: 'create',
      doc_id: doc._id,
      details: `Created ${doc.document_type}`
    }).save();

    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const docs = await Document.find(query).sort({ date_created: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    
    if (req.user.role !== 'admin' && doc.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    if (req.user.role !== 'admin' && doc.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updated = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    await new Log({
      user_id: req.user.id,
      action: 'update',
      doc_id: doc._id,
      details: 'Updated document content/status'
    }).save();

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (req.user.role !== 'admin' && doc.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await Document.findByIdAndDelete(req.params.id);
    
    await new Log({
      user_id: req.user.id,
      action: 'delete',
      doc_id: req.params.id,
      details: 'Deleted document'
    }).save();

    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
