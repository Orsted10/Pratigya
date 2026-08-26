import React, { useState, useEffect } from 'react';

interface RocketRideConsoleProps {
  isConnected?: boolean;
  activeNode?: number;
  totalTokensProcessed?: number;
}

export const RocketRideConsole: React.FC<RocketRideConsoleProps> = ({
  isConnected = true,
  activeNode = 0,
  totalTokensProcessed = 1842
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '14:41:20 [ROCKETRIDE STAGING] WebSocket Connected on wss://staging.rocketride.ai:443',
    '14:41:21 [SHELL HOST] Micro-frontend pratigya_health.pratigya mounted into AppLayout',
    '14:41:22 [PIPE ENGINE] Loaded pipelines/pratigya_main.pipe (Project ID: b842df19-a92e-4b21-a3f2-10f829ec9912)',
    '14:41:22 [SUPABASE RAG] pgvector REST endpoint connected (https://dgsqbsvdvrinpgbkaxnl.supabase.co)',
    '14:41:23 [GROQ LPU] Inference engine initialized (706 t/s · openai/gpt-oss-120b & qwen/qwen3.8-27b)'
  ]);

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 24, zIndex: 9999, fontFamily: 'monospace' }}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: '#0F2038',
          color: '#00F2FE',
          border: '1px solid rgba(0, 242, 254, 0.4)',
          borderRadius: 24,
          padding: '8px 18px',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: isConnected ? '#10B981' : '#EF4444', boxShadow: '0 0 8px #10B981' }} />
        ⚡ RocketRide Engine Telemetry &amp; Logs {isOpen ? '▼' : '▲'}
      </button>

      {/* Expanded Console Window */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            right: 0,
            width: 580,
            maxHeight: 320,
            background: 'rgba(10, 15, 29, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: 14,
            padding: 16,
            boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
            color: '#7DD3FC',
            fontSize: 11,
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 6 }}>
            <span style={{ fontWeight: 800, color: '#00F2FE' }}>ROCKETRIDE STAGING LOGS &amp; EVENT BUS</span>
            <span style={{ color: '#10B981' }}>● STAGING ACTIVE (0.28s latency)</span>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, background: 'rgba(255,255,255,0.04)', padding: 8, borderRadius: 6 }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: 10 }}>PROJECT ID</div>
              <div style={{ color: '#FFF', fontWeight: 700 }}>b842df19-a92e...</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: 10 }}>GROQ LPU SPEED</div>
              <div style={{ color: '#00F2FE', fontWeight: 700 }}>706 tokens/s</div>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: 10 }}>VECTOR RAG MATCH</div>
              <div style={{ color: '#10B981', fontWeight: 700 }}>Cosine 0.96 (IRDAI)</div>
            </div>
          </div>

          {/* Log Stream */}
          <div style={{ overflowY: 'auto', maxHeight: 150, padding: 4, lineHeight: 1.5, color: '#CBD5E1' }}>
            {logs.map((l, idx) => (
              <div key={idx} style={{ marginBottom: 4 }}>{l}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
