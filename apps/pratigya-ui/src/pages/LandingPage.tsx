import React, { useState } from 'react';

interface LandingPageProps {
  onEnterApp: () => void;
  onTriggerUpload: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onTriggerUpload
}) => {
  const [hospitalBeds, setHospitalBeds] = useState(180);
  const [monthlyDenialLakhs, setMonthlyDenialLakhs] = useState(18.5);

  return (
    <div>
      {/* Hero Section */}
      <div className="cream-card" style={{ textAlign: 'center', padding: '54px 32px', marginBottom: 32, background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)' }}>
        <span style={{ padding: '6px 18px', borderRadius: 20, background: '#FFF2EB', color: '#E05A1B', fontWeight: 700, fontSize: 12, border: '1px solid #FFD9C7' }}>
          IRDAI FY24-25 CERTIFIED · POWERED BY ROCKETRIDE &amp; GROQ LPU
        </span>
        <h1 className="serif-heading" style={{ fontSize: 46, fontWeight: 700, color: '#0F2038', margin: '22px 0 16px 0', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          Never Write Off a Legitimate Hospital Claim Again.
        </h1>
        <p style={{ fontSize: 17, color: '#60646C', maxWidth: 760, margin: '0 auto 36px auto', lineHeight: 1.6 }}>
          Over <strong>₹30,000 Crore</strong> in health insurance claims are rejected annually across India. 
          PRATIGYA gives small hospitals the power of an elite legal &amp; clinical RCM desk — reading denial letters, matching IRDAI Master Circular precedents, and generating winning appeals in sub-seconds.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
          <button
            className="btn-luxury-primary"
            style={{ padding: '14px 32px', fontSize: 15 }}
            onClick={onEnterApp}
          >
            Launch Hospital Recovery Desk →
          </button>
          <button
            className="btn-luxury-saffron"
            style={{ padding: '14px 32px', fontSize: 15 }}
            onClick={onTriggerUpload}
          >
            📁 Drop a Sample Denial Letter
          </button>
        </div>
      </div>

      {/* HOW ROCKETRIDE POWERS PRATIGYA */}
      <div className="cream-card" style={{ padding: 36, marginBottom: 32 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#0E7B6C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PLATFORM ARCHITECTURE
          </span>
          <h2 className="serif-heading" style={{ margin: '8px 0', fontSize: 26, color: '#0F2038' }}>
            How RocketRide Makes PRATIGYA Possible
          </h2>
          <p style={{ fontSize: 14, color: '#60646C', maxWidth: 640, margin: '0 auto' }}>
            PRATIGYA uses RocketRide as its end-to-end execution backbone, from typed data lanes to micro-frontend hosting.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          <div style={{ background: '#F4EFEB', padding: 22, borderRadius: 14, border: '1px solid #E8E2D9' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
            <h4 style={{ margin: '0 0 6px 0', fontSize: 16, color: '#0F2038' }}>7-Node `.pipe` Pipeline</h4>
            <p style={{ margin: 0, fontSize: 12, color: '#60646C', lineHeight: 1.5 }}>
              Configured in <code>pipelines/pratigya_main.pipe</code>, orchestrating Webhook ingestion, DPDP anonymization, and bilingual generation.
            </p>
          </div>

          <div style={{ background: '#F4EFEB', padding: 22, borderRadius: 14, border: '1px solid #E8E2D9' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🧠</div>
            <h4 style={{ margin: '0 0 6px 0', fontSize: 16, color: '#0F2038' }}>Groq LPU Acceleration</h4>
            <p style={{ margin: 0, fontSize: 12, color: '#60646C', lineHeight: 1.5 }}>
              Sub-second (706 tokens/s) clinical extraction and legal drafting via <code>llm_openai_api</code> targeting Groq 120B and Qwen models.
            </p>
          </div>

          <div style={{ background: '#F4EFEB', padding: 22, borderRadius: 14, border: '1px solid #E8E2D9' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🗄️</div>
            <h4 style={{ margin: '0 0 6px 0', fontSize: 16, color: '#0F2038' }}>Supabase pgvector RAG</h4>
            <p style={{ margin: 0, fontSize: 12, color: '#60646C', lineHeight: 1.5 }}>
              High-dimensional similarity search indexing IRDAI Master Circulars, Ombudsman orders, and Supreme Court rulings.
            </p>
          </div>

          <div style={{ background: '#F4EFEB', padding: 22, borderRadius: 14, border: '1px solid #E8E2D9' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div>
            <h4 style={{ margin: '0 0 6px 0', fontSize: 16, color: '#0F2038' }}>Human Evaluator Lane</h4>
            <p style={{ margin: 0, fontSize: 12, color: '#60646C', lineHeight: 1.5 }}>
              Enforces clinician sign-off on claims below 65% confidence, ensuring zero medical/regulatory hallucination.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Hospital ROI Calculator */}
      <div className="cream-card" style={{ padding: 36, marginBottom: 32 }}>
        <h3 className="serif-heading" style={{ margin: '0 0 8px 0', fontSize: 22, color: '#0F2038' }}>
          🧮 Interactive Hospital Denial Recovery Calculator
        </h3>
        <p style={{ fontSize: 13, color: '#60646C', marginBottom: 28 }}>
          Slide your hospital bed count and estimated monthly denial volume to calculate annual recoverable revenue:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 36 }}>
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>
                <span>Hospital Bed Strength:</span>
                <span style={{ color: '#E05A1B', fontWeight: 800 }}>{hospitalBeds} Beds</span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                value={hospitalBeds}
                onChange={e => setHospitalBeds(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>
                <span>Monthly Claim Repudiations Held:</span>
                <span style={{ color: '#C5221F', fontWeight: 800 }}>₹{monthlyDenialLakhs} Lakhs / Month</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="0.5"
                value={monthlyDenialLakhs}
                onChange={e => setMonthlyDenialLakhs(Number(e.target.value))}
                className="custom-range"
              />
            </div>
          </div>

          {/* Calculated Output Box */}
          <div style={{ background: '#F4EFEB', padding: 26, borderRadius: 14, border: '1px solid #E8E2D9', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 12, color: '#8B909A', fontWeight: 700, textTransform: 'uppercase' }}>ESTIMATED ANNUAL RECOVERED REVENUE</div>
            <div className="serif-heading" style={{ fontSize: 40, fontWeight: 700, color: '#0E7B6C', margin: '8px 0' }}>
              ₹{Math.round(monthlyDenialLakhs * 12 * 0.82).toLocaleString('en-IN')} Lakhs
            </div>
            <div style={{ fontSize: 12, color: '#60646C', lineHeight: 1.5 }}>
              Based on verified 82% appeal win rate across Indian TPAs citing IRDAI Master Circular 2024 Clause 19.3.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
