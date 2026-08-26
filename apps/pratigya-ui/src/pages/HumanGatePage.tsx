import React from 'react';
import { DenialClaim } from '../types/claims';

interface HumanGatePageProps {
  claims: DenialClaim[];
  onSignAndApprove: (id: string) => void;
  onMarkRecovered: (id: string) => void;
  onSelectClaim: (c: DenialClaim) => void;
}

export const HumanGatePage: React.FC<HumanGatePageProps> = ({
  claims,
  onSignAndApprove,
  onMarkRecovered,
  onSelectClaim
}) => {
  return (
    <div className="cream-card" style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 className="serif-heading" style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0F2038' }}>
            🛡️ The Non-Negotiable Human Safety Gate (Node 6)
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#60646C' }}>
            Dual-routing logic: Routine claims (&gt;=65%) enable 1-Click Billing Approval. High-risk/value claims (&lt;65% or &gt;₹2L) mandate Dr. Anjali Desai review.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ padding: '6px 12px', borderRadius: 8, background: '#EBF8F5', color: '#0E7B6C', fontSize: 12, fontWeight: 700 }}>
            3 Routine Claims
          </span>
          <span style={{ padding: '6px 12px', borderRadius: 8, background: '#FDF2F2', color: '#C5221F', fontSize: 12, fontWeight: 700 }}>
            1 Doctor Escalation
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {claims.map(c => (
          <div
            key={c.id}
            style={{
              background: c.confidenceScore >= 65 ? '#FAFDFC' : '#FFFAF9',
              border: `1px solid ${c.confidenceScore >= 65 ? '#C1E8DF' : '#F6C9C7'}`,
              borderRadius: 14,
              padding: 22,
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h4 className="serif-heading" style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0F2038' }}>{c.patientName}</h4>
                <span style={{ fontSize: 12, color: '#E05A1B', fontFamily: 'monospace', fontWeight: 600 }}>{c.id} · {c.tpaName}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#C5221F' }}>₹{c.deniedAmount.toLocaleString('en-IN')}</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.confidenceScore >= 65 ? '#0E7B6C' : '#C5221F' }}>
                  Confidence: {c.confidenceScore}%
                </span>
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#444A54', marginBottom: 10, background: '#F4EFEB', padding: 12, borderRadius: 8 }}>
              <strong>TPA Rejection Ground:</strong> {c.denialReasonRaw}
            </div>

            <div style={{ fontSize: 12, color: '#0F2038', marginBottom: 16 }}>
              <strong>IRDAI Precedent Matched:</strong> <span style={{ color: '#0E7B6C', fontWeight: 600 }}>{c.matchedCitation}</span>
            </div>

            {c.doctorSignedBy && (
              <div style={{ marginBottom: 14, padding: 8, background: '#EBF8F5', borderRadius: 6, fontSize: 11, color: '#0E7B6C' }}>
                ✓ Signed &amp; Approved by <strong>{c.doctorSignedBy}</strong> at {c.doctorSignedAt}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {c.status === 'APPROVED' ? (
                <button className="btn-luxury-primary" style={{ background: '#0E7B6C' }} onClick={() => onMarkRecovered(c.id)}>
                  ✓ Mark Claim as Recovered (Funds Received)
                </button>
              ) : c.confidenceScore >= 65 ? (
                <button className="btn-luxury-primary" onClick={() => onSignAndApprove(c.id)}>
                  ⚡ 1-Click Approve &amp; Issue Appeal
                </button>
              ) : (
                <button className="btn-luxury-saffron" onClick={() => onSignAndApprove(c.id)}>
                  ✍️ Dr. Anjali Desai Clinical Review &amp; Sign
                </button>
              )}

              <button
                className="btn-luxury-secondary"
                onClick={() => onSelectClaim(c)}
              >
                Inspect Appeal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
