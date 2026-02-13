
import { DocumentType, RiskLevel } from '../types';
import { generateLegalDocument } from './gemini';

const API_BASE_URL = '/api';

// Simulation of user context - in real app these come from auth state
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    'Content-Type': 'application/json',
    'x-user-id': user.id || 'anonymous_id',
    'x-user-role': user.role || 'student'
  };
};

const mapDoc = (doc: any) => ({
  ...doc,
  id: doc._id || doc.id,
});

export const api = {
  // Documents
  generateDocument: async (params: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-document`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(params),
      });
      if (!response.ok) throw new Error('Backend failed');
      return await response.json();
    } catch (error) {
      console.warn("Falling back to frontend AI.");
      const result = await generateLegalDocument({
        type: params.documentType,
        fullName: params.fullName,
        address: params.address,
        city: params.cityState,
        duration: params.duration,
        amount: params.amount,
        customClauses: params.additionalClauses
      });
      return {
        content: result.content,
        riskLevel: result.risk,
        relevantActs: result.acts
      };
    }
  },

  saveDocument: async (docData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/save-document`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(docData),
      });
      const saved = await response.json();
      return mapDoc(saved);
    } catch (error) {
      const localDocs = JSON.parse(localStorage.getItem('legal_docs') || '[]');
      const newDoc = { ...docData, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
      localStorage.setItem('legal_docs', JSON.stringify([newDoc, ...localDocs]));
      return newDoc;
    }
  },

  fetchDocuments: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents`, { headers: getAuthHeaders() });
      const docs = await response.json();
      return docs.map(mapDoc);
    } catch (error) {
      return JSON.parse(localStorage.getItem('legal_docs') || '[]');
    }
  },

  // Requests
  createRequest: async (requestData: any) => {
    const response = await fetch(`${API_BASE_URL}/requests`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestData),
    });
    return response.json();
  },

  fetchRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/requests`, { headers: getAuthHeaders() });
    return response.json();
  },

  // Logs
  fetchLogs: async () => {
    const response = await fetch(`${API_BASE_URL}/logs`, { headers: getAuthHeaders() });
    return response.json();
  }
};
