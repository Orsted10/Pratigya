// =============================================================================
// PRATIGYA (प्रतिज्ञा) · Master Web Application Orchestrator
// Built on RocketRide Engine for India's 500,000+ Hospitals & Nursing Homes
// =============================================================================

import React, { useState, useRef } from 'react';
import type { ShellAppProps } from 'shell';
import { AppLayout } from 'shell';

// Types & Data
import { DenialClaim, UserProfile } from './types/claims';
import { REAL_INDIAN_CLAIMS } from './data/realClaims';
import { callGroqPipeline, processUploadedDocumentWithGroq } from './services/groqService';
import { extractTextFromFile } from './services/pdfParserService';

// Modular Components & Pages
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { RocketRideConsole } from './components/RocketRideConsole';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PipelineStudioPage } from './pages/PipelineStudioPage';
import { UploadDropperPage } from './pages/UploadDropperPage';
import { HumanGatePage } from './pages/HumanGatePage';
import { LegalStudioPage } from './pages/LegalStudioPage';
import { RadarPage } from './pages/RadarPage';

const LUXURY_CREAM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Lora:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap');

:root {
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Lora', Georgia, serif;
  
  --bg-cream: #FAF8F5;
  --bg-surface: #FFFFFF;
  --bg-surface-warm: #F4EFEB;
  --bg-surface-hover: #ECE5DE;
  
  --text-main: #141A22;
  --text-muted: #575E6A;
  --text-faint: #8E95A2;
  
  --brand-navy: #0B192C;
  --brand-navy-light: #1A365D;
  --brand-saffron: #E05A1B;
  --brand-saffron-light: #FF7B39;
  --brand-teal: #0E7B6C;
  --brand-teal-light: #139C8A;
  --brand-red: #C5221F;
  --brand-blue: #1A56DB;
  
  --border-delicate: #EAE4DC;
  --border-strong: #D5CCC0;
  
  --shadow-card: 0 4px 20px rgba(11, 25, 44, 0.04), 0 1px 3px rgba(11, 25, 44, 0.02);
  --shadow-hover: 0 16px 36px rgba(11, 25, 44, 0.08), 0 4px 10px rgba(11, 25, 44, 0.04);
  --shadow-float: 0 24px 50px rgba(11, 25, 44, 0.12), 0 8px 18px rgba(11, 25, 44, 0.06);
}

* { box-sizing: border-box; }

html, body, #root {
  margin: 0;
  padding: 0;
  height: auto !important;
  min-height: 100% !important;
  overflow-y: auto !important;
  overflow-x: hidden;
  font-family: var(--font-sans);
  background-color: var(--bg-cream);
  color: var(--text-main);
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.01em;
}

.app-root-container {
  min-height: 100vh;
  height: auto !important;
  overflow-y: auto !important;
  padding: 28px 36px 140px 36px;
  background: radial-gradient(circle at 10% 10%, rgba(224, 90, 27, 0.03) 0%, transparent 40%),
              radial-gradient(circle at 90% 90%, rgba(14, 123, 108, 0.03) 0%, transparent 40%),
              var(--bg-cream);
}

@keyframes fadeInSlideUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulseGlowWarm {
  0% { box-shadow: 0 0 0 0 rgba(224, 90, 27, 0.4); }
  70% { box-shadow: 0 0 0 14px rgba(224, 90, 27, 0); }
  100% { box-shadow: 0 0 0 0 rgba(224, 90, 27, 0); }
}

@keyframes shimmerGlow {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.cream-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-delicate);
  border-radius: 18px;
  box-shadow: var(--shadow-card);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInSlideUp 0.35s ease-out;
}

.cream-card:hover {
  box-shadow: var(--shadow-hover);
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

.serif-heading {
  font-family: var(--font-serif);
  letter-spacing: -0.015em;
}

.btn-luxury-primary {
  background: linear-gradient(135deg, #0B192C 0%, #1A365D 100%);
  color: #FFFFFF;
  font-weight: 600;
  font-size: 13px;
  padding: 10px 22px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  transition: all 0.22s ease;
  box-shadow: 0 4px 14px rgba(11, 25, 44, 0.2);
}

.btn-luxury-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(11, 25, 44, 0.3);
}

.btn-luxury-saffron {
  background: linear-gradient(135deg, #E05A1B 0%, #FF7B39 100%);
  color: #FFFFFF;
  font-weight: 600;
  font-size: 13px;
  padding: 10px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  transition: all 0.22s ease;
  box-shadow: 0 4px 16px rgba(224, 90, 27, 0.3);
}

.btn-luxury-saffron:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(224, 90, 27, 0.45);
}

.btn-luxury-secondary {
  background: var(--bg-surface-warm);
  color: var(--text-main);
  border: 1px solid var(--border-delicate);
  font-weight: 600;
  font-size: 13px;
  padding: 9px 18px;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  transition: all 0.2s ease;
}

.btn-luxury-secondary:hover {
  background: var(--bg-surface-hover);
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

.nav-pill {
  padding: 9px 18px;
  border-radius: 12px;
  border: 1px solid transparent;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: var(--font-sans);
}

.nav-pill:hover {
  color: var(--text-main);
  background: rgba(11, 25, 44, 0.04);
}

.nav-pill.active {
  background: var(--bg-surface);
  color: var(--brand-navy);
  border-color: var(--border-delicate);
  box-shadow: 0 4px 12px rgba(11, 25, 44, 0.06);
}

.drop-zone {
  border: 2px dashed var(--border-strong);
  border-radius: 20px;
  padding: 44px 28px;
  text-align: center;
  background: #FAF8F5;
  transition: all 0.25s ease;
  cursor: pointer;
}

.drop-zone:hover {
  border-color: var(--brand-saffron);
  background: #FFF9F5;
  box-shadow: 0 10px 30px rgba(224, 90, 27, 0.08);
}

.custom-range {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #E5E0D8;
  outline: none;
}
.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #E05A1B;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(224, 90, 27, 0.45);
  transition: transform 0.15s ease;
}
.custom-range::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}
`;

const PratigyaDesk: React.FC<ShellAppProps> = ({ isConnected = true, identity }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<'website' | 'app'>('app');
  const [activeAppTab, setActiveAppTab] = useState<'command' | 'upload_dropper' | 'engine_studio' | 'human_gate' | 'legal_studio' | 'radar'>('command');
  
  // Auth
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: 'Dr. Anjali Desai, MS (Gen Surg)',
    role: 'Medical Superintendent & Head of Surgery',
    hospital: 'Shivam Multi-Specialty Hospital, Nagpur',
    rohdiniId: 'ROHD-NAG-88291',
    email: 'dr.anjali@shivamhospital.in'
  });

  // State: Real Claims
  const [claims, setClaims] = useState<DenialClaim[]>(REAL_INDIAN_CLAIMS);
  const [selectedClaim, setSelectedClaim] = useState<DenialClaim>(REAL_INDIAN_CLAIMS[0]);
  const [uploadedFilesList, setUploadedFilesList] = useState<string[]>([]);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [isExecutingPipeline, setIsExecutingPipeline] = useState(false);
  const [activeExecutingNode, setActiveExecutingNode] = useState(0);
  const [liveEngineLogs, setLiveEngineLogs] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Totals
  const totalHeld = claims.reduce((acc, c) => acc + (c.status !== 'RECOVERED' ? c.deniedAmount : 0), 0);
  const totalRecovered = claims.reduce((acc, c) => acc + (c.status === 'RECOVERED' ? c.deniedAmount : 0), 0);
  const projectedRecovery = Math.round(totalHeld * 0.82);

  // Real File Upload & Groq LPU Parsing Execution
  const handleRealFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsProcessingFile(true);
    setUploadedFilesList(prev => [file.name, ...prev]);

    try {
      const extractedText = await extractTextFromFile(file);
      const newParsedClaim = await processUploadedDocumentWithGroq(
        extractedText,
        file.name,
        currentUser.hospital
      );

      setClaims(prev => [newParsedClaim, ...prev]);
      setSelectedClaim(newParsedClaim);
      setActiveAppTab('engine_studio');
    } catch (err) {
      console.error('File parsing error:', err);
    } finally {
      setIsProcessingFile(false);
    }
  };

  // 1-Click Sample Case Processor
  const handleSelectSampleCase = async (caseName: string, caseText: string) => {
    setIsProcessingFile(true);
    setUploadedFilesList(prev => [caseName, ...prev]);

    try {
      const newParsedClaim = await processUploadedDocumentWithGroq(
        caseText,
        caseName,
        currentUser.hospital
      );

      setClaims(prev => [newParsedClaim, ...prev]);
      setSelectedClaim(newParsedClaim);
      setActiveAppTab('engine_studio');
    } catch (err) {
      console.error('Sample processing error:', err);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleSignAndApprove = (claimId: string) => {
    setClaims(prev => prev.map(c => c.id === claimId ? {
      ...c,
      status: 'APPROVED',
      doctorSignedBy: currentUser.name,
      doctorSignedAt: new Date().toLocaleTimeString('en-IN')
    } : c));
  };

  const handleMarkRecovered = (claimId: string) => {
    setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: 'RECOVERED' } : c));
  };

  return (
    <div className="app-root-container">
      <style>{LUXURY_CREAM_CSS}</style>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleRealFileUpload}
        accept=".pdf,.png,.jpg,.jpeg,.json,.txt"
        style={{ display: 'none' }}
      />

      {/* Global Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onTriggerUpload={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
      />

      {/* VIEW A: Landing Page (Full Public Website) */}
      {currentView === 'website' && (
        <LandingPage
          onEnterApp={() => {
            setCurrentView('app');
            setActiveAppTab('command');
          }}
          onTriggerUpload={() => {
            if (fileInputRef.current) fileInputRef.current.click();
          }}
        />
      )}

      {/* VIEW B: Hospital App Desktop */}
      {currentView === 'app' && (
        <div>
          {/* Sub-Navigation for App Pages */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, borderBottom: '1px solid #EAE4DC', paddingBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { id: 'command', label: '📊 Recovery Dashboard' },
              { id: 'upload_dropper', label: '📁 Upload & Ingest Denial' },
              { id: 'engine_studio', label: '⚡ 7-Node Engine Studio' },
              { id: 'human_gate', label: '🛡️ Human Safety Gate' },
              { id: 'legal_studio', label: '📜 Bilingual Appeal Studio' },
              { id: 'radar', label: '📡 TPA Pattern Radar' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`nav-pill ${activeAppTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveAppTab(tab.id as any)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeAppTab === 'command' && (
            <DashboardPage
              claims={claims}
              totalHeld={totalHeld}
              totalRecovered={totalRecovered}
              projectedRecovery={projectedRecovery}
              onSelectClaim={(c) => {
                setSelectedClaim(c);
                setActiveAppTab('legal_studio');
              }}
              onTriggerUpload={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
            />
          )}

          {activeAppTab === 'upload_dropper' && (
            <UploadDropperPage
              onTriggerUpload={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
              onSelectSampleCase={handleSelectSampleCase}
              uploadedFilesList={uploadedFilesList}
              isProcessing={isProcessingFile}
            />
          )}

          {activeAppTab === 'engine_studio' && (
            <PipelineStudioPage
              isExecuting={isExecutingPipeline}
              activeNode={activeExecutingNode}
              logs={liveEngineLogs}
              onTriggerExecution={(text) => {}}
            />
          )}

          {activeAppTab === 'human_gate' && (
            <HumanGatePage
              claims={claims}
              onSignAndApprove={handleSignAndApprove}
              onMarkRecovered={handleMarkRecovered}
              onSelectClaim={(c) => {
                setSelectedClaim(c);
                setActiveAppTab('legal_studio');
              }}
            />
          )}

          {activeAppTab === 'legal_studio' && (
            <LegalStudioPage selectedClaim={selectedClaim} />
          )}

          {activeAppTab === 'radar' && <RadarPage />}
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onSaveUser={setCurrentUser}
      />

      {/* Live RocketRide Observability Console */}
      <RocketRideConsole
        isConnected={isConnected}
        activeNode={activeExecutingNode}
        totalTokensProcessed={3240}
      />
    </div>
  );
};

const App: React.FC<ShellAppProps> = (props) => (
  <AppLayout>
    <PratigyaDesk {...props} />
  </AppLayout>
);

export default App;
