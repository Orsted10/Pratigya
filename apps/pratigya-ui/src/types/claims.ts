export interface DenialClaim {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  abhaId: string;
  policyNo: string;
  tpaName: string;
  hospitalName: string;
  procedureName: string;
  icd10: string;
  admissionDate: string;
  dischargeDate: string;
  billedAmount: number;
  deniedAmount: number;
  denialCode: string;
  denialReasonRaw: string;
  category: 'MED_NECESSITY' | 'PRE_EXISTING' | 'DAY_CARE' | 'SUB_LIMIT';
  deadlineDays: number;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'ESCALATED_DR' | 'RECOVERED';
  confidenceScore: number;
  clinicalVitals: string;
  matchedCitation: string;
  appealLetterEn: string;
  clinicalSummaryHi: string;
  doctorSignedBy?: string;
  doctorSignedAt?: string;
  uploadedFileName?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  hospital: string;
  rohdiniId: string;
  email: string;
}

export interface PipelineNode {
  n: number;
  name: string;
  tag: string;
  desc: string;
}
