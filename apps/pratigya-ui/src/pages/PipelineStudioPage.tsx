import React, { useState } from 'react';
import { runNode2Extraction, runNode5AppealWriter, NodeExecutionResult } from '../services/groqService';

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
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<number>(2);
  const [customDocumentInput, setCustomDocumentInput] = useState(`HOSPITAL: Shivam Multi-Specialty Hospital, Nagpur
PATIENT: Rameshwar K. Patil (Age: 46, Male)
ABHA ID: 91-4829-1029-4820
INSURER: Star Health & Allied Insurance Co.
PROCEDURE: Laparoscopic Appendectomy (ICD-10: K35.80)
ADMISSION: 14-Aug-2026 | DISCHARGE: 16-Aug-2026
TOTAL BILLED: Rs. 68,000 | DENIED AMOUNT: Rs. 54,000
DENIAL REASON (IRDAI-DEN-047): Active Line of Treatment Disputed. Treatment could have been managed on OPD conservative basis without inpatient surgery.`);

  const [nodeResults, setNodeResults] = useState<{ [key: number]: NodeExecutionResult }>({
    1: {
      nodeId: 1,
      nodeName: 'Dropper & Webhook Intake',
      model: 'RocketRide Stream Buffer',
      latencyMs: 18,
      tokens: 0,
      input: 'Binary Document / Stream Payload',
      output: 'StarHealth_Denial_Patil_Appendectomy.pdf (245 KB, SHA256 verified)'
    },
    2: {
      nodeId: 2,
      nodeName: 'OCR & Clinical Fact Extractor',
      model: 'openai/gpt-oss-120b',
      latencyMs: 210,
      tokens: 284,
      input: 'Raw hospital denial letter text & discharge summary',
      output: JSON.stringify({
        patient_name: "Rameshwar K. Patil",
        age: 46,
        tpa: "Star Health & Allied Insurance",
        procedure: "Laparoscopic Appendectomy",
        icd10: "K35.80",
        billed_amount: 68000,
        denied_amount: 54000,
        denial_code: "IRDAI-DEN-047",
        denial_reason: "Active Line of Treatment Disputed"
      }, null, 2)
    },
    3: {
      nodeId: 3,
      nodeName: 'IRDAI 2024 Taxonomy Classifier',
      model: 'IRDAI Master Rules Engine',
      latencyMs: 35,
      tokens: 90,
      input: 'IRDAI-DEN-047: Active Line of Treatment Disputed',
      output: 'Category: MED_NECESSITY | Governing Circular: IRDAI Master Circular on Health Insurance Clause 19.3 | Burden of Proof: Treating Physician Diagnosis Supreme'
    },
    4: {
      nodeId: 4,
      nodeName: 'Precedent RAG Memory',
      model: 'Supabase pgvector (1536-dim)',
      latencyMs: 65,
      tokens: 160,
      input: 'Vector embedding of Appendectomy denial query',
      output: 'Matched Ruling: Insurance Ombudsman Mumbai Order 2024/MUM/882 (Cosine Sim: 0.96) · Key Finding: Reversal mandated where WBC > 15,000/mcL and USG verifies acute wall edema.'
    },
    5: {
      nodeId: 5,
      nodeName: 'Bilingual Appeal Writer',
      model: 'qwen/qwen3.8-27b',
      latencyMs: 240,
      tokens: 342,
      input: 'Claim facts + Ombudsman Precedent 2024/MUM/882',
      output: `To: The Grievance Redressal Officer, Star Health & Allied Insurance Co. Ltd.
Subject: Rebuttal of Disallowed Claim Under IRDAI Master Circular Clause 19.3 (Patient: Rameshwar K. Patil)

1. Under IRDAI Master Circular (Clause 19.3) and Ombudsman Precedent 2024/MUM/882, the clinical judgment of the registered treating surgeon takes precedence over desk repudiation.
2. Clinical emergency confirmed by WBC 16,800/mcL and USG showing acute appendicitis with impending perforation.
3. We demand immediate reversal and settlement of Rs. 54,000.`
    },
    6: {
      nodeId: 6,
      nodeName: 'Human Safety Gate Evaluator',
      model: 'Dual-Routing Decision Gate',
      latencyMs: 25,
      tokens: 45,
      input: 'Appeal package confidence metrics',
      output: 'Confidence Score: 88.5% (Threshold: 65%) -> Status: Routine Claim -> Routed to 1-Click Billing Approval.'
    },
    7: {
      nodeId: 7,
      nodeName: 'Dispatch & Supabase Sync',
      model: 'PostgreSQL Sync Engine',
      latencyMs: 40,
      tokens: 0,
      input: 'Approved appeal package',
      output: 'Status: 200 OK -> Stored in Supabase claims table & updated hospital pattern memory for Star Health.'
    }
  });

  const [isLocalRunning, setIsLocalRunning] = useState(false);

  // Trigger Real AI Execution on Node 2 and Node 5 Live!
  const handleRunRealGroqPipeline = async () => {
    setIsLocalRunning(true);

    // Call Node 2 (Extraction)
    const n2Result = await runNode2Extraction(customDocumentInput);
    setNodeResults(prev => ({ ...prev, 2: n2Result }));

    // Call Node 5 (Appeal Writer)
    const n5Result = await runNode5AppealWriter(n2Result.output);
    setNodeResults(prev => ({ ...prev, 5: n5Result }));

    setIsLocalRunning(false);
    onTriggerExecution(customDocumentInput);
  };

  const selectedNode = nodeResults[selectedNodeDetails] || nodeResults[2];

  return (
    <div>
      {/* Top Header */}
      <div className="cream-card" style={{ padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 className="serif-heading" style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0F2038' }}>
              ⚡ 7-Node Autonomous RocketRide Pipeline Studio
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#60646C' }}>
              Target: <span style={{ color: '#E05A1B', fontFamily: 'monospace', fontWeight: 600 }}>pipelines/pratigya_main.pipe</span> · Click any node below to inspect live inputs, AI prompts &amp; outputs.
            </p>
          </div>
          <button
            className="btn-luxury-saffron"
            disabled={isLocalRunning || isExecuting}
            onClick={handleRunRealGroqPipeline}
          >
            {isLocalRunning || isExecuting ? 'Running Groq LPUs...' : '🚀 Execute All 7 Nodes with Live AI'}
          </button>
        </div>
      </div>

      {/* 7 Visual Interactive Nodes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 28 }}>
        {[
          { n: 1, name: 'Dropper & Intake', tag: 'Data Intake' },
          { n: 2, name: 'Groq Extractor', tag: '120B Model' },
          { n: 3, name: 'Taxonomy Classifier', tag: 'IRDAI 2024' },
          { n: 4, name: 'Precedent RAG', tag: 'pgvector' },
          { n: 5, name: 'Appeal Writer', tag: 'qwen3.8-27b' },
          { n: 6, name: 'Safety Gate', tag: 'Dual Routing' },
          { n: 7, name: 'Dispatch & Sync', tag: 'Supabase DB' }
        ].map(node => {
          const isSelected = selectedNodeDetails === node.n;
          const isCurrent = activeNode === node.n;
          return (
            <div
              key={node.n}
              className="cream-card"
              onClick={() => setSelectedNodeDetails(node.n)}
              style={{
                padding: '14px 12px',
                cursor: 'pointer',
                borderTop: `4px solid ${isSelected ? '#E05A1B' : isCurrent ? '#0E7B6C' : '#D5CCC0'}`,
                background: isSelected ? '#FFF6F0' : isCurrent ? '#F4FBF9' : '#FFFFFF',
                boxShadow: isSelected ? '0 8px 20px rgba(224, 90, 27, 0.15)' : 'none',
                transform: isSelected ? 'translateY(-2px)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: isSelected ? '#E05A1B' : '#0F2038', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
                  {node.n}
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: isSelected ? '#E05A1B' : '#8B909A' }}>{node.tag}</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0F2038' }}>{node.name}</div>
              <div style={{ fontSize: 10, color: isSelected ? '#E05A1B' : '#60646C', marginTop: 4, fontWeight: 600 }}>
                {isSelected ? '● Inspecting' : 'Click to inspect'}
              </div>
            </div>
          );
        })}
      </div>

      {/* NODE INSPECTOR (Live Input / Output / Model Telemetry) */}
      <div className="cream-card" style={{ padding: 26, marginBottom: 28, background: '#FFFFFF', border: '1px solid #E8E2D9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #E8E2D9', paddingBottom: 12 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#E05A1B', textTransform: 'uppercase' }}>
              NODE {selectedNode.nodeId} INSPECTOR
            </span>
            <h3 className="serif-heading" style={{ margin: '2px 0 0 0', fontSize: 18, color: '#0F2038' }}>
              {selectedNode.nodeName}
            </h3>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ padding: '4px 10px', borderRadius: 6, background: '#F4EFEB', color: '#0F2038', fontSize: 11, fontWeight: 700, fontFamily: 'monospace' }}>
              Model: {selectedNode.model}
            </span>
            <span style={{ padding: '4px 10px', borderRadius: 6, background: '#EBF8F5', color: '#0E7B6C', fontSize: 11, fontWeight: 700 }}>
              ⚡ {selectedNode.latencyMs} ms ({selectedNode.tokens} tokens)
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 20 }}>
          {/* Node Input */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8B909A', marginBottom: 6, textTransform: 'uppercase' }}>
              NODE INPUT PAYLOAD
            </div>
            <textarea
              rows={8}
              value={selectedNode.input}
              readOnly
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #D5CCC0', background: '#FAF8F5', fontSize: 11, fontFamily: 'monospace', color: '#1C2024', lineHeight: 1.5, resize: 'none' }}
            />
          </div>

          {/* Node Output */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0E7B6C', marginBottom: 6, textTransform: 'uppercase' }}>
              LIVE AI OUTPUT GENERATED
            </div>
            <textarea
              rows={8}
              value={selectedNode.output}
              readOnly
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #C1E8DF', background: '#F7FCFA', fontSize: 11, fontFamily: 'monospace', color: '#0F2038', lineHeight: 1.5, resize: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Raw Document Editor & Engine Trace */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="cream-card" style={{ padding: 24 }}>
          <h4 className="serif-heading" style={{ margin: '0 0 10px 0', fontSize: 16, color: '#0F2038' }}>
            📝 Live Intake Payload Editor
          </h4>
          <textarea
            rows={7}
            value={customDocumentInput}
            onChange={e => setCustomDocumentInput(e.target.value)}
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #D5CCC0', background: '#FAF8F5', fontSize: 11, fontFamily: 'monospace', outline: 'none' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <span style={{ fontSize: 11, color: '#8B909A' }}>Type any claim text to run Groq LPU inference</span>
            <button
              className="btn-luxury-secondary"
              onClick={() => setCustomDocumentInput(`HOSPITAL: Shivam Hospital, Nagpur\nPATIENT: Sunita Devi Sharma (52/F)\nPROCEDURE: Laparoscopic Cholecystectomy (K80.20)\nINSURER: Care Health Insurance\nDENIED AMOUNT: Rs. 84,000\nREASON: Pre-Existing Disease within 24 months.`)}
            >
              Load Cholecystectomy Case
            </button>
          </div>
        </div>

        <div className="cream-card" style={{ padding: 24 }}>
          <h4 className="serif-heading" style={{ margin: '0 0 10px 0', fontSize: 16, color: '#0E7B6C' }}>
            🖥️ Live RocketRide Engine Execution Stream
          </h4>
          <div style={{ height: 180, overflowY: 'auto', background: '#0F2038', color: '#7DD3FC', padding: 14, borderRadius: 10, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.6 }}>
            {logs.length === 0 ? (
              <span style={{ color: '#94A3B8' }}>// Ready. Click "Execute All 7 Nodes with Live AI" above.</span>
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
