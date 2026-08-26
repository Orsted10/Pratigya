import React, { useState } from 'react';
import { DenialClaim } from '../types/claims';

interface DashboardPageProps {
  claims: DenialClaim[];
  totalHeld: number;
  totalRecovered: number;
  projectedRecovery: number;
  onSelectClaim: (c: DenialClaim) => void;
  onTriggerUpload: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  claims,
  totalHeld,
  totalRecovered,
  projectedRecovery,
  onSelectClaim,
  onTriggerUpload
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClaims = claims.filter(c => 
    c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tpaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* 4 Top Stat Hero Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 28 }}>
        <div className="cream-card" style={{ padding: '22px 26px', borderLeft: '4px solid #C5221F' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8B909A', textTransform: 'uppercase' }}>TOTAL REVENUE HELD IN DENIALS</div>
          <div className="serif-heading" style={{ fontSize: 32, fontWeight: 700, color: '#C5221F', margin: '6px 0 2px 0' }}>
            ₹{totalHeld.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: '#60646C' }}>{claims.length} active claims across TPAs</div>
        </div>

        <div className="cream-card" style={{ padding: '22px 26px', borderLeft: '4px solid #0E7B6C' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8B909A', textTransform: 'uppercase' }}>PROJECTED RECOVERY (82% WIN RATE)</div>
          <div className="serif-heading" style={{ fontSize: 32, fontWeight: 700, color: '#0E7B6C', margin: '6px 0 2px 0' }}>
            ₹{projectedRecovery.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: '#0E7B6C', fontWeight: 600 }}>✓ +₹{totalRecovered.toLocaleString('en-IN')} recovered</div>
        </div>

        <div className="cream-card" style={{ padding: '22px 26px', borderLeft: '4px solid #E05A1B' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8B909A', textTransform: 'uppercase' }}>14-DAY STATUTORY URGENCY</div>
          <div className="serif-heading" style={{ fontSize: 32, fontWeight: 700, color: '#E05A1B', margin: '6px 0 2px 0' }}>
            6 Claims
          </div>
          <div style={{ fontSize: 12, color: '#E05A1B', fontWeight: 600 }}>⚠️ Action required in &lt;5 days</div>
        </div>

        <div className="cream-card" style={{ padding: '22px 26px', borderLeft: '4px solid #0F2038' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8B909A', textTransform: 'uppercase' }}>GROQ LPU COMPUTE SPEED</div>
          <div className="serif-heading" style={{ fontSize: 32, fontWeight: 700, color: '#0F2038', margin: '6px 0 2px 0' }}>
            706 <span style={{ fontSize: 18, fontFamily: 'sans-serif' }}>tokens/s</span>
          </div>
          <div style={{ fontSize: 12, color: '#60646C' }}>Avg 0.28s / appeal (₹0.18 compute)</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="cream-card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h3 className="serif-heading" style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0F2038' }}>
              Active Denial Claims &amp; Statutory Deadlines
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#60646C' }}>
              Auto-prioritized by IRDAI appeal expiry window and recoverability score
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search patient or TPA..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #D5CCC0', fontSize: 12, outline: 'none', background: '#FFF' }}
            />
            <button
              className="btn-luxury-saffron"
              style={{ padding: '8px 16px', fontSize: 12 }}
              onClick={onTriggerUpload}
            >
              + Upload Denial
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E8E2D9', color: '#60646C', textAlign: 'left' }}>
                <th style={{ padding: '12px 14px' }}>CLAIM ID</th>
                <th style={{ padding: '12px 14px' }}>PATIENT &amp; ABHA</th>
                <th style={{ padding: '12px 14px' }}>TPA / INSURER</th>
                <th style={{ padding: '12px 14px' }}>PROCEDURE</th>
                <th style={{ padding: '12px 14px' }}>DENIED AMOUNT</th>
                <th style={{ padding: '12px 14px' }}>DEADLINE</th>
                <th style={{ padding: '12px 14px' }}>CONFIDENCE</th>
                <th style={{ padding: '12px 14px' }}>STATUS</th>
                <th style={{ padding: '12px 14px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #F0EAE1' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#0F2038', fontFamily: 'monospace' }}>{c.id}</td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ fontWeight: 600 }}>{c.patientName}</div>
                    <div style={{ fontSize: 11, color: '#8B909A' }}>{c.abhaId}</div>
                  </td>
                  <td style={{ padding: '14px' }}>{c.tpaName}</td>
                  <td style={{ padding: '14px' }}>
                    <div>{c.procedureName}</div>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: '#F4EFEB', color: '#60646C' }}>{c.icd10}</span>
                  </td>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#C5221F' }}>
                    ₹{c.deniedAmount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px', fontWeight: 600, color: c.deadlineDays <= 2 ? '#C5221F' : '#E05A1B' }}>
                    {c.deadlineDays} Days Left
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 45, height: 6, borderRadius: 3, background: '#E8E2D9', overflow: 'hidden' }}>
                        <div style={{ width: `${c.confidenceScore}%`, height: '100%', background: c.confidenceScore >= 65 ? '#0E7B6C' : '#C5221F' }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: c.confidenceScore >= 65 ? '#0E7B6C' : '#C5221F' }}>{c.confidenceScore}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    {c.status === 'APPROVED' && <span style={{ padding: '4px 10px', borderRadius: 6, background: '#EBF8F5', color: '#0E7B6C', fontSize: 11, fontWeight: 700 }}>Approved ✓</span>}
                    {c.status === 'PENDING_REVIEW' && <span style={{ padding: '4px 10px', borderRadius: 6, background: '#FFF2EB', color: '#E05A1B', fontSize: 11, fontWeight: 700 }}>Gate Review</span>}
                    {c.status === 'ESCALATED_DR' && <span style={{ padding: '4px 10px', borderRadius: 6, background: '#FDF2F2', color: '#C5221F', fontSize: 11, fontWeight: 700 }}>Doctor Sign-off</span>}
                    {c.status === 'RECOVERED' && <span style={{ padding: '4px 10px', borderRadius: 6, background: '#EBF4FE', color: '#1A56DB', fontSize: 11, fontWeight: 700 }}>Recovered ₹</span>}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <button
                      className="btn-luxury-secondary"
                      style={{ padding: '6px 12px', fontSize: 11 }}
                      onClick={() => onSelectClaim(c)}
                    >
                      View Appeal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
