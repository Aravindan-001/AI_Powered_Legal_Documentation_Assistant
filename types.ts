
export enum DocumentType {
  RENTAL = 'Rental Agreement',
  NDA = 'Non-Disclosure Agreement (NDA)',
  EMPLOYMENT = 'Employment Contract',
  AFFIDAVIT = 'Affidavit',
  LEGAL_NOTICE = 'Legal Notice'
}

export enum DocStatus {
  DRAFT = 'Draft',
  FINALIZED = 'Finalized',
  PENDING = 'Pending Review'
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface DocVersion {
  id: string;
  timestamp: string;
  content: string;
  author: string;
}

export interface LegalDocument {
  id: string;
  type: DocumentType;
  title: string;
  content: string;
  createdAt: string;
  status: DocStatus;
  riskLevel: RiskLevel;
  relevantActs: string[];
  versionHistory: DocVersion[];
  metadata: {
    fullName: string;
    address: string;
    city: string;
    duration?: string;
    amount?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
}
