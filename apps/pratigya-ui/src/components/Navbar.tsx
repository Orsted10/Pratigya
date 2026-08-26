import React from 'react';
import { UserProfile } from '../types/claims';

interface NavbarProps {
  currentView: 'website' | 'app';
  setCurrentView: (v: 'website' | 'app') => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onTriggerUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  currentUser,
  onOpenAuth,
  onTriggerUpload
}) => {
  return (
    <header className="cream-card" style={{ padding: '16px 28px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #0F2038 0%, #1A365D 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 20, fontWeight: 800, boxShadow: '0 4px 12px rgba(15, 32, 56, 0.15)' }}>
          प्र
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 className="serif-heading" style={{ margin: 0, fontSize: 23, fontWeight: 700, color: '#0F2038' }}>
              PRATIGYA <span style={{ color: '#E05A1B' }}>· प्रतिज्ञा</span>
            </h1>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: '#FFF2EB', color: '#E05A1B', border: '1px solid #FFD9C7' }}>
              ROCKETRIDE STAGING
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 12, color: '#60646C' }}>
            Autonomous Healthcare Denial Recovery · {currentUser.hospital}
          </p>
        </div>
      </div>

      {/* Main Mode Switcher */}
      <div style={{ display: 'flex', gap: 6, background: '#F4EFEB', padding: 4, borderRadius: 12, border: '1px solid #E8E2D9' }}>
        <button
          className={`nav-pill ${currentView === 'website' ? 'active' : ''}`}
          onClick={() => setCurrentView('website')}
        >
          🌐 Public Website &amp; Story
        </button>
        <button
          className={`nav-pill ${currentView === 'app' ? 'active' : ''}`}
          onClick={() => setCurrentView('app')}
        >
          🏥 Hospital Recovery Desk
        </button>
      </div>

      {/* Right User & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={onOpenAuth}>
          <div style={{ fontSize: 11, color: '#8B909A' }}>Logged In Physician</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F2038' }}>
            {currentUser.name.split(',')[0]}
          </div>
        </div>
        <button
          className="btn-luxury-secondary"
          style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={onOpenAuth}
        >
          Profile
        </button>
        <button
          className="btn-luxury-saffron"
          style={{ padding: '8px 18px', fontSize: 12 }}
          onClick={onTriggerUpload}
        >
          + Upload Denial PDF
        </button>
      </div>
    </header>
  );
};
