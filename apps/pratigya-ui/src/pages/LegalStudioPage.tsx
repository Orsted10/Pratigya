import React from 'react';
import { DenialClaim } from '../types/claims';

interface LegalStudioPageProps {
  selectedClaim: DenialClaim;
}

export const LegalStudioPage: React.FC<LegalStudioPageProps> = ({
  selectedClaim
}) => {
  return (
    <div className="cream-card" style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 className="serif-heading" style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0F2038' }}>
            📜 Bilingual Regulatory Appeal Studio
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#60646C' }}>
            Claim ID: <span style={{ color: '#E05A1B', fontFamily: 'monospace', fontWeight: 700 }}>{selectedClaim.id}</span> · Patient: <strong>{selectedClaim.patientName}</strong> · Disputed: <strong style={{ color: '#C5221F' }}>₹{selectedClaim.deniedAmount.toLocaleString('en-IN')}</strong>
          </p>
        </div>
        <button className="btn-luxury-saffron" onClick={() => alert('Appeal Package Exported as Standardized Hospital PDF with Rohini Registry Watermark!')}>
          📥 Download Formatted PDF
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24 }}>
        {/* English Formal Legal Petition */}
        <div className="cream-card" style={{ padding: 24, background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, borderBottom: '1px solid #E8E2D9', paddingBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#0F2038', textTransform: 'uppercase' }}>
              1. Formal Statutory Appeal to TPA (English)
            </span>
            <span style={{ fontSize: 11, color: '#8B909A' }}>IRDAI Master Circular 2024</span>
          </div>
          <textarea
            rows={16}
            value={selectedClaim.appealLetterEn}
            readOnly
            style={{ width: '100%', background: '#FAF8F5', border: '1px solid #E8E2D9', borderRadius: 8, padding: 14, color: '#1C2024', fontSize: 12, fontFamily: 'monospace', lineHeight: 1.6, resize: 'none' }}
          />
        </div>

        {/* Hindi Clinical Summary */}
        <div className="cream-card" style={{ padding: 24, background: '#FFF9F5', border: '1px solid #FFD9C7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, borderBottom: '1px solid #FFD9C7', paddingBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#E05A1B', textTransform: 'uppercase' }}>
              2. Clinical Summary (हिन्दी / Hindi)
            </span>
            <span style={{ fontSize: 11, color: '#E05A1B', fontWeight: 600 }}>चिकित्सा सारांश</span>
          </div>
          <p style={{ fontSize: 14, color: '#662208', lineHeight: 1.8, background: '#FFFFFF', padding: 16, borderRadius: 8, border: '1px solid #FFE4D6' }}>
            {selectedClaim.clinicalSummaryHi}
          </p>

          <div style={{ marginTop: 20, padding: 16, background: '#FFFFFF', borderRadius: 8, border: '1px solid #E8E2D9' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0F2038', marginBottom: 6 }}>
              Attached Precedent:
            </div>
            <div style={{ fontSize: 12, color: '#0E7B6C', fontWeight: 600 }}>
              {selectedClaim.matchedCitation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
