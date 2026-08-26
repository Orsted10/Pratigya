import React, { useState } from 'react';
import { DenialClaim } from '../types/claims';

interface DashboardPageProps {
  claims: DenialClaim[];
  totalHeld: number;
  totalRecovered: number;
  projectedRecovery: number;
  onSelectClaim: (claim: DenialClaim) => void;
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
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTpaFilter, setSelectedTpaFilter] = useState('ALL');

  const filteredClaims = claims.filter(c => {
    const matchesSearch = c.patientName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          c.tpaName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          c.procedureName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesTpa = selectedTpaFilter === 'ALL' || c.tpaName.includes(selectedTpaFilter);
    return matchesSearch && matchesTpa;
  });

  return (
    <div>
      {/* Top 4 Executive KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Card 1: Total Revenue Held */}
        <div
          className="cream-card"
          style={{
            padding: 24,
            borderLeft: '4px solid #C5221F',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDFD 100%)'
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: '#8E95A2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            TOTAL REVENUE HELD IN DENIALS
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#C5221F', margin: '8px 0 4px 0', letterSpacing: '-0.02em' }}>
            ₹{totalHeld.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: '#575E6A', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>{claims.length} active claims across TPAs</span>
          </div>
        </div>

        {/* Card 2: Projected Recovery */}
        <div
          className="cream-card"
          style={{
            padding: 24,
            borderLeft: '4px solid #0E7B6C',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FCFB 100%)'
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: '#8E95A2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            PROJECTED RECOVERY (82% WIN RATE)
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#0E7B6C', margin: '8px 0 4px 0', letterSpacing: '-0.02em' }}>
            ₹{projectedRecovery.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: '#0E7B6C', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>✓ +₹{totalRecovered.toLocaleString('en-IN')} recovered</span>
          </div>
        </div>

        {/* Card 3: Statutory Urgency */}
        <div
          className="cream-card"
          style={{
            padding: 24,
            borderLeft: '4px solid #E05A1B',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDFB 100%)'
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: '#8E95A2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            14-DAY STATUTORY URGENCY
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#E05A1B', margin: '8px 0 4px 0', letterSpacing: '-0.02em' }}>
            {claims.filter(c => c.deadlineDays <= 5).length} Claims
          </div>
          <div style={{ fontSize: 12, color: '#E05A1B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>⚠️ Action required in &lt;5 days</span>
          </div>
        </div>

        {/* Card 4: Groq Compute Speed */}
        <div
          className="cream-card"
          style={{
            padding: 24,
            borderLeft: '4px solid #0B192C',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)'
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: '#8E95A2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            GROQ LPU COMPUTE SPEED
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#0B192C', margin: '8px 0 4px 0', letterSpacing: '-0.02em' }}>
            706 <span style={{ fontSize: 18, color: '#575E6A', fontWeight: 600 }}>tokens/s</span>
          </div>
          <div style={{ fontSize: 12, color: '#575E6A' }}>
            Avg 0.28s / appeal (₹0.18 compute)
          </div>
        </div>
      </div>

      {/* Main Claims Table Card */}
      <div className="cream-card" style={{ padding: 28, background: '#FFFFFF' }}>
        {/* Table Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h3 className="serif-heading" style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0B192C' }}>
              Active Denial Claims &amp; Statutory Deadlines
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#575E6A' }}>
              Auto-prioritized by IRDAI appeal expiry window and recoverability score
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search patient, procedure, or TPA..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              style={{
                padding: '9px 16px',
                borderRadius: 10,
                border: '1px solid #D5CCC0',
                background: '#FAF8F5',
                fontSize: 12,
                outline: 'none',
                width: 240,
                fontFamily: 'inherit'
              }}
            />

            {/* Quick Upload */}
            <button className="btn-luxury-saffron" onClick={onTriggerUpload} style={{ padding: '9px 18px', fontSize: 12 }}>
              + Upload Denial
            </button>
          </div>
        </div>

        {/* Claims Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EAE4DC', fontSize: 11, fontWeight: 800, color: '#8E95A2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 14px' }}>CLAIM ID</th>
                <th style={{ padding: '12px 14px' }}>PATIENT &amp; ABHA</th>
                <th style={{ padding: '12px 14px' }}>TPA / INSURER</th>
                <th style={{ padding: '12px 14px' }}>PROCEDURE</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>DENIED AMOUNT</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>DEADLINE</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>CONFIDENCE</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>STATUS</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim, idx) => {
                const isUrgent = claim.deadlineDays <= 3;
                const isHighConf = claim.confidenceScore >= 75;
                return (
                  <tr
                    key={claim.id}
                    style={{
                      borderBottom: '1px solid #F4EFEB',
                      transition: 'background 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAF8F5'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    onClick={() => onSelectClaim(claim)}
                  >
                    <td style={{ padding: '16px 14px', fontWeight: 700, color: '#0B192C', fontFamily: 'monospace', fontSize: 12 }}>
                      {claim.id}
                    </td>
                    <td style={{ padding: '16px 14px' }}>
                      <div style={{ fontWeight: 700, color: '#0B192C', fontSize: 13 }}>{claim.patientName}</div>
                      <div style={{ fontSize: 11, color: '#8E95A2', fontFamily: 'monospace' }}>{claim.abhaId}</div>
                    </td>
                    <td style={{ padding: '16px 14px', fontSize: 13, color: '#575E6A', fontWeight: 500 }}>
                      {claim.tpaName}
                    </td>
                    <td style={{ padding: '16px 14px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0B192C' }}>{claim.procedureName}</div>
                      <span style={{ fontSize: 10, padding: '2px 6px', background: '#F4EFEB', borderRadius: 4, color: '#575E6A', fontFamily: 'monospace' }}>
                        {claim.icd10}
                      </span>
                    </td>
                    <td style={{ padding: '16px 14px', textAlign: 'right', fontWeight: 800, color: '#C5221F', fontSize: 14 }}>
                      ₹{claim.deniedAmount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '16px 14px', textAlign: 'center' }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: isUrgent ? '#C5221F' : '#E05A1B',
                          background: isUrgent ? 'rgba(197, 34, 31, 0.08)' : 'rgba(224, 90, 27, 0.08)',
                          padding: '4px 10px',
                          borderRadius: 20
                        }}
                      >
                        {claim.deadlineDays} Days Left
                      </span>
                    </td>
                    <td style={{ padding: '16px 14px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <div style={{ width: 44, height: 6, background: '#EAE4DC', borderRadius: 3, overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${claim.confidenceScore}%`,
                              height: '100%',
                              background: isHighConf ? '#0E7B6C' : '#E05A1B'
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: isHighConf ? '#0E7B6C' : '#E05A1B' }}>
                          {claim.confidenceScore}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 14px', textAlign: 'center' }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: 20,
                          background: claim.status === 'APPROVED' ? 'rgba(14, 123, 108, 0.1)' : claim.status === 'ESCALATED_DR' ? 'rgba(197, 34, 31, 0.1)' : 'rgba(224, 90, 27, 0.1)',
                          color: claim.status === 'APPROVED' ? '#0E7B6C' : claim.status === 'ESCALATED_DR' ? '#C5221F' : '#E05A1B'
                        }}
                      >
                        {claim.status === 'APPROVED' ? '✓ Approved' : claim.status === 'ESCALATED_DR' ? 'Doctor Sign-off' : 'Gate Review'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 14px', textAlign: 'right' }}>
                      <button
                        className="btn-luxury-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectClaim(claim);
                        }}
                        style={{ padding: '6px 12px', fontSize: 11 }}
                      >
                        View Appeal
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
