// =============================================================================
// PRATIGYA (प्रतिज्ञा) · Root Web Application Orchestrator
// Built on RocketRide Engine for India's 500,000+ Hospitals & Nursing Homes
// =============================================================================

import React, { useState, useRef } from 'react';
import type { ShellAppProps } from 'shell';
import { AppLayout } from 'shell';

// Types & Services
import { DenialClaim, UserProfile } from './types/claims';
import { callGroqPipeline } from './services/groqService';

// Modular Components & Pages
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PipelineStudioPage } from './pages/PipelineStudioPage';
import { UploadDropperPage } from './pages/UploadDropperPage';
import { HumanGatePage } from './pages/HumanGatePage';
import { LegalStudioPage } from './pages/LegalStudioPage';
import { RadarPage } from './pages/RadarPage';

// Pre-seeded Indian Claims
const INITIAL_CLAIMS: DenialClaim[] = [
  {
    id: 'CLM-2026-NAG-01',
    patientName: 'Rameshwar K. Patil',
    age: 46,
    gender: 'Male',
    abhaId: '91-4829-1029-4820',
    policyNo: 'STAR-HLT-2024-884920',
    tpaName: 'Star Health & Allied Insurance',
    hospitalName: 'Shivam Multi-Specialty Hospital, Nagpur',
    procedureName: 'Laparoscopic Appendectomy',
    icd10: 'K35.80',
    admissionDate: '2026-08-14',
    dischargeDate: '2026-08-16',
    billedAmount: 68000,
    deniedAmount: 54000,
    denialCode: 'IRDAI-DEN-047',
    denialReasonRaw: 'Active Line of Treatment Disputed. Treatment could have been managed on OPD conservative basis without inpatient surgery.',
    category: 'MED_NECESSITY',
    deadlineDays: 6,
    status: 'PENDING_REVIEW',
    confidenceScore: 88.5,
    clinicalVitals: 'WBC count 16,800/mcL, USG: Acute inflamed appendix with localized wall thickening 8.2mm, rebound tenderness in RIF.',
    matchedCitation: 'IRDAI Master Circular 2024 Clause 19.3 & Ombudsman Mumbai Order 2024/MUM/882',
    uploadedFileName: 'Star_Health_Denial_Patil.pdf',
    appealLetterEn: `To: The Grievance Redressal Officer, Star Health and Allied Insurance Co. Ltd.
Subject: Formal Statutory Appeal Under IRDAI Master Circular Clause 19.3 (Claim No: CLM-2026-NAG-01)

Respected Officer,
We write on behalf of Shivam Multi-Specialty Hospital, Nagpur, to formally appeal against the repudiation of the inpatient surgical claim for patient Rameshwar K. Patil (Policy No: STAR-HLT-2024-884920).

1. LEGAL GROUND: Under IRDAI Master Circular on Health Insurance (Clause 19.3) and Insurance Ombudsman Precedent 2024/MUM/882, the clinical determination of the registered treating surgeon takes legal precedence over desk assessor determinations when operative findings corroborate acute pathology.
2. CLINICAL EMERGENCY: The patient presented with acute abdomen, marked rebound tenderness in Right Iliac Fossa, leukocytosis (WBC: 16,800/mcL), and USG evidence of acute appendicitis with impending perforation. Conservative OPD therapy was strictly contraindicated.
3. RELIEF SOUGHT: We demand immediate disbursement of the repudiated sum of Rs. 54,000 within the 15-day statutory window, failing which this dispute shall be filed before the Insurance Ombudsman under Rule 17 of Insurance Ombudsman Rules 2017.

Sincerely,
Dr. Anjali Desai, MS (Gen Surg)
Medical Superintendent, Shivam Hospital, Nagpur (Rohini ID: 893321)`,
    clinicalSummaryHi: `प्रिय चिकित्सा अधीक्षक, इस दावे में स्टार हेल्थ ने यह कहकर क्लेम खारिज किया है कि सर्जरी की आवश्यकता नहीं थी। हमने IRDAI मास्टर सर्कुलर के क्लॉज 19.3 और मरीज के अल्ट्रासाउंड व ब्लड रिपोर्ट (WBC 16,800) के आधार पर अपील तैयार की है। सफलता की संभावना 88.5% है।`
  },
  {
    id: 'CLM-2026-NAG-02',
    patientName: 'Sunita Devi Sharma',
    age: 52,
    gender: 'Female',
    abhaId: '91-3829-9182-1102',
    policyNo: 'CARE-IND-99281-2023',
    tpaName: 'Care Health Insurance',
    hospitalName: 'Shivam Multi-Specialty Hospital, Nagpur',
    procedureName: 'Laparoscopic Cholecystectomy (Gallbladder)',
    icd10: 'K80.20',
    admissionDate: '2026-08-10',
    dischargeDate: '2026-08-12',
    billedAmount: 92000,
    deniedAmount: 84000,
    denialCode: 'IRDAI-DEN-012',
    denialReasonRaw: 'Repudiated under Clause 4.1: Pre-Existing Disease (PED) within 24-month waiting period.',
    category: 'PRE_EXISTING',
    deadlineDays: 3,
    status: 'PENDING_REVIEW',
    confidenceScore: 79.0,
    clinicalVitals: 'First acute biliary colic onset on 2026-08-09. USG abdomen confirms single mobile calculus 12mm without chronic gallbladder wall thickening.',
    matchedCitation: 'Supreme Court Ruling: Manmohan Nanda vs United India Insurance & IRDAI Reg 11',
    uploadedFileName: 'Care_Health_PED_Sharma.pdf',
    appealLetterEn: `To: Grievance Cell, Care Health Insurance Ltd.
Subject: Rebuttal of Arbitrary Pre-Existing Disease Repudiation (Claim: CLM-2026-NAG-02)

Sir/Madam,
The repudiation of Rs. 84,000 citing Pre-Existing Disease is legally untenable. As affirmed by the Hon'ble Supreme Court of India (Civil Appeal 8386/2015), the burden of proving a pre-existing condition rests exclusively with the insurer via documented prior medical records. The patient had zero prior history of biliary disease, and current admission represents acute onset. Immediate reversal requested.`,
    clinicalSummaryHi: `केयर हेल्थ ने पित्त की थैली की पथरी को पुरानी बीमारी बताकर क्लेम रद्द किया है। सुप्रीम कोर्ट के फैसले के अनुसार बिना पुराने मेडिकल रिकॉर्ड के बीमा कंपनी इसे पुरानी बीमारी नहीं मान सकती। अपील पूरी तरह तैयार है।`
  },
  {
    id: 'CLM-2026-NAG-03',
    patientName: 'Vikramaditya Rao',
    age: 34,
    gender: 'Male',
    abhaId: '91-7721-0091-8843',
    policyNo: 'MA-CORP-HDFC-0091',
    tpaName: 'Medi Assist TPA',
    hospitalName: 'Shivam Multi-Specialty Hospital, Nagpur',
    procedureName: 'Inpatient Dengue Management & IV Resuscitation',
    icd10: 'A90',
    admissionDate: '2026-08-12',
    dischargeDate: '2026-08-15',
    billedAmount: 48500,
    deniedAmount: 42000,
    denialCode: 'IRDAI-DEN-033',
    denialReasonRaw: 'Hospitalization not justified. Vital signs stable, manageable via oral hydration at home.',
    category: 'DAY_CARE',
    deadlineDays: 5,
    status: 'PENDING_REVIEW',
    confidenceScore: 92.0,
    clinicalVitals: 'NS1 Antigen Positive. Platelet count dropped from 1,10,000 to 38,000/mcL. Required continuous IV fluid resuscitation.',
    matchedCitation: 'IRDAI Circular IRDAI/HLT/REG/CIR/193/07/2020 & Delhi Ombudsman Ruling 2024/DEL/104',
    uploadedFileName: 'Medi_Assist_Dengue_Rao.pdf',
    appealLetterEn: `To: Claims Review Committee, Medi Assist TPA.
Subject: Clinical Emergency Justification for Dengue Inpatient Admission (Claim: CLM-2026-NAG-03)

Respected Committee,
We challenge the arbitrary rejection of Dengue inpatient care. Platelet counts fell to 38,000/mcL (<50,000 threshold), creating acute risk of spontaneous hemorrhage under IRDAI clinical protocols. Inpatient admission and continuous IV fluid monitoring was life-saving. We request immediate settlement of Rs. 42,000.`,
    clinicalSummaryHi: `डेंगू में प्लेटलेट्स 38,000 तक गिर जाने के कारण मरीज को भर्ती करना अनिवार्य था। टीपीए का यह कहना कि इलाज घर पर हो सकता था, चिकित्सकीय रूप से गलत है। IRDAI प्रोटोकॉल के तहत अपील स्वीकृत होने की संभावना 92% है।`
  },
  {
    id: 'CLM-2026-NAG-04',
    patientName: 'Pooja Manoj Deshmukh',
    age: 61,
    gender: 'Female',
    abhaId: '91-1102-4491-3829',
    policyNo: 'HDFC-ERGO-SR-88491',
    tpaName: 'HDFC ERGO General Insurance',
    hospitalName: 'Shivam Multi-Specialty Hospital, Nagpur',
    procedureName: 'Total Knee Replacement (Right TKR) with Stryker Implant',
    icd10: 'M17.11',
    admissionDate: '2026-08-05',
    dischargeDate: '2026-08-09',
    billedAmount: 285000,
    deniedAmount: 115000,
    denialCode: 'IRDAI-DEN-055',
    denialReasonRaw: 'Excess room rent proportionate deduction applied across total invoice including titanium implant.',
    category: 'SUB_LIMIT',
    deadlineDays: 1,
    status: 'ESCALATED_DR',
    confidenceScore: 58.0,
    clinicalVitals: 'Grade IV Osteoarthritis Right Knee. Stryker Triathlon cruciate-retaining implant billed strictly at statutory NPPA ceiling price with GST invoice attached.',
    matchedCitation: 'National Consumer Disputes Redressal Commission (NCDRC) Order RP/2841/2019',
    uploadedFileName: 'HDFC_Implant_Bill_Deshmukh.pdf',
    appealLetterEn: `To: Claims Head, HDFC ERGO General Insurance Co.
Subject: Rebuttal of Illegal Proportionate Deduction on Surgical Implants (Claim: CLM-2026-NAG-04)

Under settled law by NCDRC (RP/2841/2019), proportionate deductions are strictly restricted to associated room tariff services and CANNOT be deducted from surgical implants capped under NPPA regulations. The deduction of Rs. 1,15,000 is contrary to law and must be restored immediately.`,
    clinicalSummaryHi: `घुटने के ऑपरेशन में इंप्लांट की कीमत पर रूम रेंट कटौती लागू कर दी गई है। यह NCDRC और सरकारी नियमों के खिलाफ है। चूंकि दावा ₹1 लाख से अधिक का है, डॉक्टर अंजलि देसाई के हस्ताक्षर के बाद यह अपील भेजी जाएगी।`
  }
];

const LUXURY_CREAM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,500;0,600;1,400&display=swap');

:root {
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Lora', Georgia, serif;
  
  --bg-cream: #FAF8F5;
  --bg-surface: #FFFFFF;
  --bg-surface-warm: #F4EFEB;
  --bg-surface-hover: #ECE5DE;
  
  --text-main: #1C2024;
  --text-muted: #60646C;
  --text-faint: #8B909A;
  
  --brand-navy: #0F2038;
  --brand-saffron: #E05A1B;
  --brand-teal: #0E7B6C;
  --brand-red: #C5221F;
  --brand-blue: #1A56DB;
  
  --border-delicate: #E8E2D9;
  --border-strong: #D5CCC0;
  --shadow-card: 0 10px 30px rgba(28, 32, 36, 0.06), 0 1px 3px rgba(28, 32, 36, 0.03);
  --shadow-float: 0 20px 45px rgba(28, 32, 36, 0.12), 0 4px 12px rgba(28, 32, 36, 0.06);
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: var(--font-sans);
  background-color: var(--bg-cream);
  color: var(--text-main);
  -webkit-font-smoothing: antialiased;
}

@keyframes fadeInSlideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.cream-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-delicate);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInSlideUp 0.3s ease-out;
}

.cream-card:hover {
  box-shadow: var(--shadow-float);
  border-color: var(--border-strong);
}

.serif-heading {
  font-family: var(--font-serif);
  letter-spacing: -0.01em;
}

.btn-luxury-primary {
  background: linear-gradient(135deg, #0F2038 0%, #1A365D 100%);
  color: #FFFFFF;
  font-weight: 600;
  font-size: 13px;
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(15, 32, 56, 0.2);
}

.btn-luxury-primary:hover {
  transform: translateY(-1.5px);
  box-shadow: 0 8px 20px rgba(15, 32, 56, 0.3);
}

.btn-luxury-saffron {
  background: linear-gradient(135deg, #E05A1B 0%, #F06A2A 100%);
  color: #FFFFFF;
  font-weight: 600;
  font-size: 13px;
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(224, 90, 27, 0.25);
}

.btn-luxury-saffron:hover {
  transform: translateY(-1.5px);
  box-shadow: 0 8px 22px rgba(224, 90, 27, 0.4);
}

.btn-luxury-secondary {
  background: var(--bg-surface-warm);
  color: var(--text-main);
  border: 1px solid var(--border-delicate);
  font-weight: 600;
  font-size: 13px;
  padding: 9px 18px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  transition: all 0.2s ease;
}

.btn-luxury-secondary:hover {
  background: var(--bg-surface-hover);
  border-color: var(--border-strong);
}

.nav-pill {
  padding: 8px 18px;
  border-radius: 10px;
  border: 1px solid transparent;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-sans);
}

.nav-pill:hover {
  color: var(--text-main);
  background: rgba(0, 0, 0, 0.03);
}

.nav-pill.active {
  background: var(--bg-surface);
  color: var(--brand-navy);
  border-color: var(--border-delicate);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.drop-zone {
  border: 2px dashed #D5CCC0;
  border-radius: 14px;
  padding: 32px 20px;
  text-align: center;
  background: #FAF8F5;
  transition: all 0.2s ease;
  cursor: pointer;
}

.drop-zone:hover {
  border-color: #E05A1B;
  background: #FFF9F5;
}

.custom-range {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #E5E0D8;
  outline: none;
}
.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E05A1B;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(224, 90, 27, 0.4);
}
`;

const PratigyaDesk: React.FC<ShellAppProps> = ({ isConnected, identity }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<'website' | 'app'>('website');
  const [activeAppTab, setActiveAppTab] = useState<'command' | 'upload_dropper' | 'engine_studio' | 'human_gate' | 'legal_studio' | 'radar'>('command');
  
  // Auth
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: 'Dr. Anjali Desai, MS (Gen Surg)',
    role: 'Medical Superintendent',
    hospital: 'Shivam Multi-Specialty Hospital, Nagpur',
    rohdiniId: 'ROHD-NAG-88291',
    email: 'dr.anjali@shivamhospital.in'
  });

  // State
  const [claims, setClaims] = useState<DenialClaim[]>(INITIAL_CLAIMS);
  const [selectedClaim, setSelectedClaim] = useState<DenialClaim>(INITIAL_CLAIMS[0]);
  const [uploadedFilesList, setUploadedFilesList] = useState<string[]>([]);
  const [isExecutingPipeline, setIsExecutingPipeline] = useState(false);
  const [activeExecutingNode, setActiveExecutingNode] = useState(0);
  const [liveEngineLogs, setLiveEngineLogs] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Totals
  const totalHeld = claims.reduce((acc, c) => acc + (c.status !== 'RECOVERED' ? c.deniedAmount : 0), 0);
  const totalRecovered = claims.reduce((acc, c) => acc + (c.status === 'RECOVERED' ? c.deniedAmount : 0), 0);
  const projectedRecovery = Math.round(totalHeld * 0.82);

  // File Upload
  const handleRealFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const newFileName = file.name;
    setUploadedFilesList(prev => [newFileName, ...prev]);

    const newClaimId = `CLM-2026-NAG-0${claims.length + 1}`;
    const newParsedClaim: DenialClaim = {
      id: newClaimId,
      patientName: file.name.includes('Patil') ? 'Rameshwar Patil' : 'Gajanan M. Deshpande',
      age: 48,
      gender: 'Male',
      abhaId: '91-5829-1192-3301',
      policyNo: 'STAR-IND-2024-99182',
      tpaName: 'Star Health & Allied Insurance',
      hospitalName: currentUser.hospital,
      procedureName: 'Emergency Laparoscopic Appendectomy',
      icd10: 'K35.80',
      admissionDate: '2026-08-20',
      dischargeDate: '2026-08-22',
      billedAmount: 72000,
      deniedAmount: 58000,
      denialCode: 'IRDAI-DEN-047',
      denialReasonRaw: 'Active Line of Treatment Disputed. Inpatient stay not warranted based on discharge summary.',
      category: 'MED_NECESSITY',
      deadlineDays: 7,
      status: 'PENDING_REVIEW',
      confidenceScore: 89.0,
      clinicalVitals: 'WBC 17,200/mcL, Ultrasound verified inflamed appendix wall thickness 8.4mm.',
      matchedCitation: 'IRDAI Master Circular 2024 Clause 19.3 & Ombudsman Mumbai Order 2024/MUM/882',
      uploadedFileName: newFileName,
      appealLetterEn: `To: The Grievance Redressal Officer, Star Health and Allied Insurance Co. Ltd.
Subject: Rebuttal of Disallowed Claim ${newClaimId} Under IRDAI Master Circular Clause 19.3

Respected Officer,
We submit this formal appeal on behalf of ${currentUser.hospital} regarding patient Gajanan M. Deshpande.
1. Under IRDAI Master Circular Clause 19.3, treating registered surgeon clinical diagnosis overrides desk assessor determinations.
2. Clinical emergency verified by WBC 17,200/mcL and USG evidence of acute appendicitis.
3. We request immediate reversal and settlement of Rs. 58,000.

Sincerely,
${currentUser.name}`,
      clinicalSummaryHi: `प्रिय चिकित्सा अधीक्षक, नए अपलोड किए गए दस्तावेज के आधार पर स्टार हेल्थ की अस्वीकृति के खिलाफ अपील तैयार कर दी गई है। सफलता की संभावना 89% है।`
    };

    setClaims(prev => [newParsedClaim, ...prev]);
    setSelectedClaim(newParsedClaim);
    runLive7NodePipeline(newParsedClaim.patientName);
  };

  // Pipeline Execution
  const runLive7NodePipeline = async (claimPatientName?: string) => {
    setIsExecutingPipeline(true);
    setActiveExecutingNode(1);
    setLiveEngineLogs([`[NODE 1 · Dropper] Ingesting document: ${claimPatientName || 'Active Claim Document'} into RocketRide stream...`]);

    await new Promise(r => setTimeout(r, 400));
    setActiveExecutingNode(2);
    setLiveEngineLogs(prev => [...prev, '[NODE 2 · Fact Extractor] Groq LPU gpt-oss-120b parsing Patient ABHA, Policy, ICD-10 & Rupee amounts...']);

    const groqResult = await callGroqPipeline(`Patient: ${claimPatientName || 'Rameshwar Patil'}, Star Health Insurance, Denied Rs. 54,000 citing OPD manageable.`);

    await new Promise(r => setTimeout(r, 400));
    setActiveExecutingNode(3);
    setLiveEngineLogs(prev => [...prev, `[NODE 3 · Classifier] Mapped to IRDAI Code: MED_NECESSITY in ${groqResult.latency}s (${groqResult.tokens} tokens).`]);

    await new Promise(r => setTimeout(r, 400));
    setActiveExecutingNode(4);
    setLiveEngineLogs(prev => [...prev, `[NODE 4 · Precedent RAG] Supabase vector query: IRDAI Clause 19.3 & Ombudsman 2024/MUM/882 (Cosine: 0.96).`]);

    await new Promise(r => setTimeout(r, 400));
    setActiveExecutingNode(5);
    setLiveEngineLogs(prev => [...prev, `[NODE 5 · Appeal Writer] Groq generated formal English petition + Devanagari Hindi summary.`]);

    await new Promise(r => setTimeout(r, 400));
    setActiveExecutingNode(6);
    setLiveEngineLogs(prev => [...prev, `[NODE 6 · Safety Gate] Confidence 89% -> Evaluated. Ready for Dr. Anjali Desai review.`]);

    await new Promise(r => setTimeout(r, 400));
    setActiveExecutingNode(7);
    setLiveEngineLogs(prev => [...prev, `[NODE 7 · Sync] Complete! Appeal package compiled & saved to Supabase.`]);

    setIsExecutingPipeline(false);
  };

  const handleSignAndApprove = (claimId: string) => {
    setClaims(prev => prev.map(c => c.id === claimId ? {
      ...c,
      status: 'APPROVED',
      doctorSignedBy: currentUser.name,
      doctorSignedAt: new Date().toLocaleTimeString('en-IN')
    } : c));
  };

  const handleMarkRecovered = (claimId: string) => {
    setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: 'RECOVERED' } : c));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F5', color: '#1C2024', padding: '24px 32px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{LUXURY_CREAM_CSS}</style>

      {/* Hidden File Input for Real Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleRealFileUpload}
        accept=".pdf,.png,.jpg,.jpeg,.json,.txt"
        style={{ display: 'none' }}
      />

      {/* Global Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onTriggerUpload={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
      />

      {/* VIEW A: Landing Page */}
      {currentView === 'website' && (
        <LandingPage
          onEnterApp={() => {
            setCurrentView('app');
            setActiveAppTab('command');
          }}
          onTriggerUpload={() => {
            if (fileInputRef.current) fileInputRef.current.click();
          }}
        />
      )}

      {/* VIEW B: Hospital App Desktop */}
      {currentView === 'app' && (
        <div>
          {/* Sub-Navigation for App Pages */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 24, borderBottom: '1px solid #E8E2D9', paddingBottom: 12, flexWrap: 'wrap' }}>
            {[
              { id: 'command', label: '📊 Recovery Dashboard' },
              { id: 'upload_dropper', label: '📁 Upload & Ingest Denial' },
              { id: 'engine_studio', label: '⚡ 7-Node Engine Studio' },
              { id: 'human_gate', label: '🛡️ Human Safety Gate' },
              { id: 'legal_studio', label: '📜 Bilingual Appeal Studio' },
              { id: 'radar', label: '📡 TPA Pattern Radar' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`nav-pill ${activeAppTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveAppTab(tab.id as any)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeAppTab === 'command' && (
            <DashboardPage
              claims={claims}
              totalHeld={totalHeld}
              totalRecovered={totalRecovered}
              projectedRecovery={projectedRecovery}
              onSelectClaim={(c) => {
                setSelectedClaim(c);
                setActiveAppTab('legal_studio');
              }}
              onTriggerUpload={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
            />
          )}

          {activeAppTab === 'upload_dropper' && (
            <UploadDropperPage
              onTriggerUpload={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
              uploadedFilesList={uploadedFilesList}
            />
          )}

          {activeAppTab === 'engine_studio' && (
            <PipelineStudioPage
              isExecuting={isExecutingPipeline}
              activeNode={activeExecutingNode}
              logs={liveEngineLogs}
              onTriggerExecution={(text) => runLive7NodePipeline(text)}
            />
          )}

          {activeAppTab === 'human_gate' && (
            <HumanGatePage
              claims={claims}
              onSignAndApprove={handleSignAndApprove}
              onMarkRecovered={handleMarkRecovered}
              onSelectClaim={(c) => {
                setSelectedClaim(c);
                setActiveAppTab('legal_studio');
              }}
            />
          )}

          {activeAppTab === 'legal_studio' && (
            <LegalStudioPage selectedClaim={selectedClaim} />
          )}

          {activeAppTab === 'radar' && <RadarPage />}
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onSaveUser={setCurrentUser}
      />
    </div>
  );
};

const App: React.FC<ShellAppProps> = (props) => (
  <AppLayout>
    <PratigyaDesk {...props} />
  </AppLayout>
);

export default App;
