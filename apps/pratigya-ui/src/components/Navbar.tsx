import React from 'react';
import { UserProfile } from '../types/claims';

interface NavbarProps {
  currentView: 'website' | 'app';
  setCurrentView: (view: 'website' | 'app') => void;
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
    <header
      className="cream-card"
      style={{
        padding: '14px 26px',
        marginBottom: 26,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(224, 90, 27, 0.15)',
        boxShadow: '0 8px 30px rgba(11, 25, 44, 0.05)'
      }}
    >
      {/* Brand & Hospital Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #0B192C 0%, #1A365D 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 800,
            boxShadow: '0 4px 14px rgba(11, 25, 44, 0.25)'
          }}
        >
          प्र
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#0B192C', letterSpacing: '-0.02em' }}>
              PRATIGYA · प्रतिज्ञा
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#E05A1B',
                background: 'rgba(224, 90, 27, 0.1)',
                padding: '2px 8px',
                borderRadius: 20,
                border: '1px solid rgba(224, 90, 27, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E05A1B' }} />
              ROCKETRIDE STAGING
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#575E6A', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0E7B6C', boxShadow: '0 0 6px #0E7B6C' }} />
            <span>{currentUser.hospital}</span>
            <span style={{ color: '#D5CCC0' }}>|</span>
            <span style={{ color: '#8E95A2' }}>Rohini Registry: {currentUser.rohdiniId}</span>
          </div>
        </div>
      </div>

      {/* Center View Switcher */}
      <div
        style={{
          display: 'flex',
          background: '#F4EFEB',
          padding: 4,
          borderRadius: 14,
          border: '1px solid #EAE4DC'
        }}
      >
        <button
          onClick={() => setCurrentView('website')}
          style={{
            padding: '7px 16px',
            borderRadius: 10,
            border: 'none',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            background: currentView === 'website' ? '#FFFFFF' : 'transparent',
            color: currentView === 'website' ? '#0B192C' : '#575E6A',
            boxShadow: currentView === 'website' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <span>🌐</span> Public Website &amp; Story
        </button>
        <button
          onClick={() => setCurrentView('app')}
          style={{
            padding: '7px 16px',
            borderRadius: 10,
            border: 'none',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            background: currentView === 'app' ? '#FFFFFF' : 'transparent',
            color: currentView === 'app' ? '#0B192C' : '#575E6A',
            boxShadow: currentView === 'app' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <span>🏥</span> Hospital Recovery Desk
        </button>
      </div>

      {/* User Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          onClick={onOpenAuth}
          style={{
            cursor: 'pointer',
            textAlign: 'right',
            background: '#FAF8F5',
            padding: '6px 12px',
            borderRadius: 10,
            border: '1px solid #EAE4DC',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ fontSize: 10, color: '#8E95A2', textTransform: 'uppercase', fontWeight: 700 }}>
            Logged In Physician
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0B192C' }}>
            {currentUser.name}
          </div>
        </div>

        <button
          className="btn-luxury-secondary"
          onClick={onOpenAuth}
          style={{ padding: '8px 14px', fontSize: 12 }}
        >
          ⚙️ Profile
        </button>

        <button
          className="btn-luxury-saffron"
          onClick={onTriggerUpload}
          style={{ padding: '9px 18px', fontSize: 12 }}
        >
          + Upload Denial PDF
        </button>
      </div>
    </header>
  );
};
