
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ROADMAP = 'ROADMAP',
  PLAN_504 = 'PLAN_504',
  SCREENING = 'SCREENING',
  SSI_SSDI = 'SSI_SSDI',
  CIVIL_RIGHTS = 'CIVIL_RIGHTS',
  LEGAL_CHAT = 'LEGAL_CHAT',
  COMPLIANCE = 'COMPLIANCE',
  MEDICAL_RECORDS = 'MEDICAL_RECORDS',
  LEA_DIRECTORY = 'LEA_DIRECTORY'
}

export enum PlanStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED'
}

export interface Accommodation {
  id: string;
  category: 'Executive Function' | 'Attention' | 'Working Memory' | 'Impulse Control' | 'Stress Management' | 'Technology' | 'Other';
  title: string;
  description: string;
}

export interface GeneticData {
  id: string;
  tokenizedId: string; // GINA compliant token
  locus: 'COMT' | 'SLC6A2' | 'BDNF' | 'DAT1' | 'DRD4';
  genotype: string;
  phenotype: string;
  legalSignificance: string;
}

export interface NeuroImagingData {
  id: string;
  type: 'fMRI' | 'sMRI' | 'PET';
  findings: string;
  activationMagnitude?: string;
  clinicalInterpretation: string;
}

export interface EvidenceMatrixEntry {
  biologicalFinding: string;
  functionalImpact: string;
  legalArgument: string;
  statutoryRelevance: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  disability: string;
  leaId: string;
}

export interface Plan504 {
  id: string;
  studentId: string;
  planNumber: string;
  status: PlanStatus;
  accommodations: Accommodation[];
  effectiveDate: string;
  expirationDate: string;
  version: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success' | 'error';
  timestamp: string;
  isRead: boolean;
  linkTo?: AppView;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entityType: string;
  details: string;
  ipAddress: string;
}
