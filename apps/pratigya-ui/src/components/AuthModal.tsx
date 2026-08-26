import React, { useState } from 'react';
import { UserProfile } from '../types/claims';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSaveUser: (u: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveUser
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [formData, setFormData] = useState<UserProfile>(currentUser);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 32, 56, 0.45)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="cream-card" style={{ width: 460, padding: 32, animation: 'fadeInSlideUp 0.2s ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 className="serif-heading" style={{ margin: 0, fontSize: 20, color: '#0F2038' }}>
            {mode === 'LOGIN' ? 'Hospital Clinician Profile' : 'Register New Hospital'}
          </h3>
          <button
            style={{ background: 'none', border: 'none', fontSize: 12, color: '#E05A1B', cursor: 'pointer', fontWeight: 700 }}
            onClick={() => setMode(mode === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
          >
            {mode === 'LOGIN' ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>

        <p style={{ margin: '0 0 20px 0', fontSize: 13, color: '#60646C' }}>
          Ayushman Bharat Digital Mission (ABDM) &amp; Rohini Registry Verification
        </p>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8B909A', marginBottom: 4 }}>PHYSICIAN / REVIEWER NAME</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5CCC0', fontSize: 13, background: '#FAF8F5' }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8B909A', marginBottom: 4 }}>HOSPITAL / NURSING HOME</label>
          <input
            type="text"
            value={formData.hospital}
            onChange={e => setFormData({ ...formData, hospital: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5CCC0', fontSize: 13, background: '#FAF8F5' }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8B909A', marginBottom: 4 }}>ROHINI INSURANCE NETWORK ID</label>
          <input
            type="text"
            value={formData.rohdiniId}
            onChange={e => setFormData({ ...formData, rohdiniId: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5CCC0', fontSize: 13, background: '#FAF8F5' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button className="btn-luxury-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-luxury-primary"
            onClick={() => {
              onSaveUser(formData);
              onClose();
            }}
          >
            Save &amp; Update Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
