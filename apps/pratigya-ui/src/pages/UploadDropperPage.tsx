import React, { useState } from 'react';

interface UploadDropperPageProps {
  onTriggerUpload: () => void;
  onSelectSampleCase: (caseName: string, caseText: string) => void;
  uploadedFilesList: string[];
  isProcessing?: boolean;
}

export const UploadDropperPage: React.FC<UploadDropperPageProps> = ({
  onTriggerUpload,
  onSelectSampleCase,
  uploadedFilesList,
  isProcessing = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const SAMPLE_CASES = [
    {
      name: 'StarHealth_Appendectomy_Dispute.pdf',
      label: '📄 Star Health: Appendectomy Rejection (₹54,000)',
      text: `PATIENT: Rameshwar Patil (46/M) | POLICY: STAR-HLT-2024-884920 | HOSPITAL: Shivam Hospital, Nagpur
PROCEDURE: Laparoscopic Appendectomy (K35.80) | BILLED: Rs. 68,000 | DENIED: Rs. 54,000
REASON: Active Line of Treatment Disputed. Non-emergent; manageable via OPD oral antibiotics.
VITALS: WBC 16,800/mcL, Ultrasound: Acute inflamed appendix with wall thickness 8.2mm, localized peritonitis.`
    },
    {
      name: 'CareHealth_Cholecystectomy_PED.pdf',
      label: '📄 Care Health: Cholecystectomy PED Rejection (₹84,000)',
      text: `PATIENT: Sunita Devi Sharma (52/F) | POLICY: CARE-IND-99281-2023 | HOSPITAL: Shivam Hospital, Nagpur
PROCEDURE: Laparoscopic Cholecystectomy (K80.20) | BILLED: Rs. 92,000 | DENIED: Rs. 84,000
REASON: Repudiated under Clause 4.1: Pre-Existing Disease within 24-month waiting period without prior medical records.
VITALS: First acute biliary colic episode on 2026-08-09. USG confirmed mobile 12mm calculus without chronic wall fibrosis.`
    },
    {
      name: 'MediAssist_Dengue_PlateletCrash.pdf',
      label: '📄 Medi Assist: Dengue Inpatient Disallowance (₹42,000)',
      text: `PATIENT: Vikramaditya Rao (34/M) | POLICY: MA-CORP-HDFC-0091 | HOSPITAL: Shivam Hospital, Nagpur
PROCEDURE: Inpatient Dengue Thrombocytopenia IV Resuscitation (A90) | BILLED: Rs. 48,500 | DENIED: Rs. 42,000
REASON: Hospitalization not justified. Vital signs stable, manageable via oral hydration at home.
VITALS: NS1 Antigen Positive. Platelet count crashed to 38,000/mcL (<50,000 threshold), acute hemorrhagic risk.`
    },
    {
      name: 'HDFCERGO_TitaniumKnee_Proportionate.pdf',
      label: '📄 HDFC ERGO: Knee Implant Proportionate Cut (₹1,15,000)',
      text: `PATIENT: Pooja Manoj Deshmukh (61/F) | POLICY: HDFC-ERGO-SR-88491 | HOSPITAL: Shivam Hospital, Nagpur
PROCEDURE: Total Knee Replacement (Right TKR) with Stryker Implant (M17.11) | BILLED: Rs. 2,85,000 | DENIED: Rs. 1,15,000
REASON: Excess room rent proportionate deduction applied across total invoice including titanium implant.
VITALS: Grade IV Osteoarthritis. Stryker Triathlon titanium implant billed strictly at NPPA statutory ceiling price with GST invoice.`
    }
  ];

  return (
    <div className="cream-card" style={{ padding: 32 }}>
      <h2 className="serif-heading" style={{ margin: '0 0 6px 0', fontSize: 22, color: '#0F2038' }}>
        📁 Mixed-Media Denial Intake &amp; Real AI Parsing Desk
      </h2>
      <p style={{ margin: '0 0 24px 0', fontSize: 13, color: '#60646C' }}>
        Upload any real PDF rejection letter, hospital scan, or select a pre-loaded Indian hospital case.
        RocketRide ingests the document, anonymizes patient PHI, runs <strong>Groq LPU 120B</strong> entity extraction, and generates the legal appeal in real time!
      </p>

      {/* Main Drag & Drop Zone */}
      <div
        className="drop-zone"
        onClick={onTriggerUpload}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          onTriggerUpload();
        }}
        style={{
          border: isDragOver ? '2px dashed #E05A1B' : '2px dashed #D5CCC0',
          background: isDragOver ? '#FFF9F5' : '#FAF8F5',
          padding: '40px 24px'
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>📄📁</div>
        <h4 style={{ margin: '0 0 6px 0', fontSize: 18, color: '#0F2038' }}>
          {isProcessing ? '⚡ Groq LPU Reading & Extracting Document...' : 'Click to Browse or Drag & Drop Any Denial PDF / Document'}
        </h4>
        <p style={{ margin: '0 0 18px 0', fontSize: 13, color: '#60646C' }}>
          Supports PDF, Scanned JPG/PNG, JSON, and Medical Discharge Summaries (Max 50 MB)
        </p>
        <button className="btn-luxury-saffron" disabled={isProcessing}>
          {isProcessing ? 'Processing with Groq 120B...' : 'Choose File from Your Computer'}
        </button>
      </div>

      {/* 1-Click Instant Hospital Sample Cases */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#0F2038', textTransform: 'uppercase' }}>
            ⚡ Or Test Instantly with 1-Click Real Indian Hospital Denial Samples:
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          {SAMPLE_CASES.map((sc, idx) => (
            <div
              key={idx}
              className="cream-card"
              onClick={() => onSelectSampleCase(sc.name, sc.text)}
              style={{
                padding: '14px 16px',
                cursor: 'pointer',
                border: '1px solid #E8E2D9',
                background: '#FFFFFF',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0F2038', marginBottom: 4 }}>
                {sc.label}
              </div>
              <div style={{ fontSize: 11, color: '#E05A1B', fontWeight: 600 }}>
                ⚡ Click to Parse &amp; Run 7-Node AI Engine →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded History */}
      {uploadedFilesList.length > 0 && (
        <div style={{ marginTop: 28, padding: 18, background: '#F4EFEB', borderRadius: 12, border: '1px solid #E8E2D9' }}>
          <h5 style={{ margin: '0 0 10px 0', fontSize: 13, color: '#0F2038' }}>
            Recent Documents Ingested &amp; Parsed:
          </h5>
          {uploadedFilesList.map((fn, idx) => (
            <div key={idx} style={{ fontSize: 12, color: '#0E7B6C', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>✓</span>
              <span><strong>{fn}</strong> → Ingested by RocketRide, parsed by Groq LPU, added to Active Claims!</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
