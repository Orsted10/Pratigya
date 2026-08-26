import React, { useState } from 'react';

interface PipelineStudioPageProps {
  isExecuting: boolean;
  activeNode: number;
  logs: string[];
  onTriggerExecution: (customText?: string) => void;
}

export const PipelineStudioPage: React.FC<PipelineStudioPageProps> = ({
  isExecuting,
  activeNode,
  logs,
  onTriggerExecution
}) => {
  const [customText, setCustomText] = useState('');

  return (
    <div>
      <div className="cream-card" style={{ padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 className="serif-heading" style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0F2038' }}>
              ⚡ 7-Node Autonomous RocketRide Pipeline Studio
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#60646C' }}>
              Active target: <span style={{ color: '#E05A1B', fontFamily: 'monospace', fontWeight: 600 }}>pipelines/pratigya_main.pipe</span> via Groq LPU
            </p>
          </div>
          <button
            className="btn-luxury-saffron"
            disabled={isExecuting}
            onClick={() => onTriggerExecution(customText)}
          >
            {isExecuting ? 'Processing 7 Nodes...' : '🚀 Trigger Real Groq Pipeline Run'}
          </button>
        </div>
      </div>

      {/* 7 Visual Nodes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { n: 1, name: 'Dropper & Ingestion', tag: 'Data Intake', desc: 'Ingests raw PDFs & bills' },
          { n: 2, name: 'OCR & Extractor', tag: 'Groq 120B', desc: 'Extracts ABHA, ICD-10 & Rs.' },
          { n: 3, name: 'Taxonomy Classifier', tag: 'IRDAI 2024', desc: 'Maps against statutory codes' },
          { n: 4, name: 'Precedent RAG', tag: 'Supabase pgvector', desc: 'Queries Ombudsman rulings' },
          { n: 5, name: 'Appeal Writer', tag: 'Groq qwen3.8', desc: 'Drafts English + Hindi summary' },
          { n: 6, name: 'Human Safety Gate', tag: 'Dual Evaluator', desc: 'Routes <65% to Dr. / >=65% 1-Click' },
          { n: 7, name: 'Dispatch & Sync', tag: 'Supabase DB', desc: 'Updates hospital pattern radar' }
        ].map(node => {
          const isCur = activeNode === node.n;
          const isD = activeNode > node.n;
          return (
            <div
              key={node.n}
              className="cream-card"
              style={{
                padding: 16,
                borderTop: `4px solid ${isCur ? '#E05A1B' : isD ? '#0E7B6C' : '#D5CCC0'}`,
                background: isCur ? '#FFF8F4' : isD ? '#F4FBF9' : '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: isCur ? '#E05A1B' : isD ? '#0E7B6C' : '#E8E2D9', color: isCur || isD ? '#FFF' : '#60646C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
                  {isD ? '✓' : node.n}
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: isCur ? '#E05A1B' : '#8B909A' }}>{node.tag}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F2038', marginBottom: 4 }}>{node.name}</div>
              <div style={{ fontSize: 11, color: '#60646C', lineHeight: 1.3 }}>{node.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Simulator Inputs & Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="cream-card" style={{ padding: 24 }}>
          <h4 className="serif-heading" style={{ margin: '0 0 12px 0', fontSize: 16, color: '#0F2038' }}>
            📥 Mixed-Media Intake Simulator
          </h4>
          <textarea
            rows={7}
            placeholder="Type or paste any TPA denial letter, doctor discharge summary, or claim repudiation text..."
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #D5CCC0', background: '#FAF8F5', fontSize: 12, fontFamily: 'monospace', outline: 'none' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
            <span style={{ fontSize: 11, color: '#8B909A' }}>Auto-anonymizes PHI per DPDP Act</span>
            <button
              className="btn-luxury-secondary"
              onClick={() => setCustomText(`CLAIM NO: STAR-DEN-8820\nPATIENT: Rameshwar Patil (46/M)\nDIAGNOSIS: Acute Appendicitis (ICD K35.80)\nDENIED AMOUNT: Rs. 54,000\nREASON: Active line of treatment disputed. Conservative treatment possible.`)}
            >
              Load Sample Rejection
            </button>
          </div>
        </div>

        <div className="cream-card" style={{ padding: 24 }}>
          <h4 className="serif-heading" style={{ margin: '0 0 12px 0', fontSize: 16, color: '#0E7B6C' }}>
            🖥️ Live RocketRide Engine Execution Stream
          </h4>
          <div style={{ height: 180, overflowY: 'auto', background: '#0F2038', color: '#7DD3FC', padding: 16, borderRadius: 10, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.6 }}>
            {logs.length === 0 ? (
              <span style={{ color: '#94A3B8' }}>// Engine standing by. Click "Trigger Real Groq Pipeline Run" above.</span>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} style={{ marginBottom: 4 }}>{log}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
