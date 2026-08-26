import React from 'react';

export const RadarPage: React.FC = () => {
  return (
    <div className="cream-card" style={{ padding: 28 }}>
      <h2 className="serif-heading" style={{ margin: '0 0 6px 0', fontSize: 22, fontWeight: 700, color: '#0F2038' }}>
        📡 Hospital Pattern Radar · Compound Network Memory
      </h2>
      <p style={{ margin: '0 0 24px 0', fontSize: 13, color: '#60646C' }}>
        Every appeal outcome feeds back into the hospital's local engine, detecting unwritten TPA denial patterns and warning admission clerks before claims are submitted.
      </p>

      <div style={{ display: 'grid', gap: 16 }}>
        {[
          {
            tpa: 'Star Health · Knee Arthroscopy & Day Care Surgeries',
            risk: '67% Denial Risk on Active Line of Treatment',
            action: 'Action for Admission Desk: Attach pre-operative MRI scan and surgeon inflammatory note at initial pre-auth.',
            stat: 'Reversal rate improved to 88% after citing IRDAI Circular Clause 19.3.'
          },
          {
            tpa: 'Medi Assist TPA · Dengue Thrombocytopenia Inpatients',
            risk: '74% Rejection as "OPD Manageable"',
            action: 'Action for Admission Desk: Ensure daily serial platelet count chart & IV fluid sheet are timestamped on day 1.',
            stat: '100% of appeals won by citing Delhi Ombudsman Ruling 2024/DEL/104.'
          },
          {
            tpa: 'HDFC ERGO · Total Knee & Hip Replacements',
            risk: 'Arbitrary Proportionate Room Rent Deductions',
            action: 'Action for Billing Desk: Invoice surgical implants on separate statutory GST invoice under NPPA ceiling caps.',
            stat: 'Recovered ₹4.2 Lakhs in disallowed deductions via NCDRC Order RP/2841/2019.'
          }
        ].map((r, idx) => (
          <div key={idx} className="cream-card" style={{ padding: 20, background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
              <span className="serif-heading" style={{ fontWeight: 700, fontSize: 16, color: '#0F2038' }}>{r.tpa}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#C5221F', padding: '3px 10px', borderRadius: 6, background: '#FDF2F2' }}>{r.risk}</span>
            </div>
            <div style={{ fontSize: 13, color: '#E05A1B', fontWeight: 600, marginBottom: 6 }}>
              {r.action}
            </div>
            <div style={{ fontSize: 12, color: '#0E7B6C', fontWeight: 600 }}>
              ✓ {r.stat}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
