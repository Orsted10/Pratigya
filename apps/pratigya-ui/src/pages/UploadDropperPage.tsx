import React from 'react';

interface UploadDropperPageProps {
  onTriggerUpload: () => void;
  uploadedFilesList: string[];
}

export const UploadDropperPage: React.FC<UploadDropperPageProps> = ({
  onTriggerUpload,
  uploadedFilesList
}) => {
  return (
    <div className="cream-card" style={{ padding: 32 }}>
      <h2 className="serif-heading" style={{ margin: '0 0 6px 0', fontSize: 22, color: '#0F2038' }}>
        📁 Mixed-Media Denial Intake &amp; Ingestion Desk
      </h2>
      <p style={{ margin: '0 0 24px 0', fontSize: 13, color: '#60646C' }}>
        Upload or drop raw PDF rejection letters, hospital discharge summaries, or photo scans. 
        RocketRide will auto-anonymize patient PHI per the DPDP Act 2023 and extract billing facts via Groq LPU.
      </p>

      {/* Drop Zone */}
      <div className="drop-zone" onClick={onTriggerUpload}>
        <div style={{ fontSize: 42, marginBottom: 12 }}>📄📁</div>
        <h4 style={{ margin: '0 0 6px 0', fontSize: 17, color: '#0F2038' }}>
          Click to Browse or Drag &amp; Drop Denial Documents Here
        </h4>
        <p style={{ margin: '0 0 16px 0', fontSize: 13, color: '#60646C' }}>
          Supports PDF, Scanned Images (PNG/JPG), JSON, and Plain Text · Max 50 MB / batch
        </p>
        <button className="btn-luxury-saffron">
          Choose File from Computer
        </button>
      </div>

      {/* Uploaded History */}
      {uploadedFilesList.length > 0 && (
        <div style={{ marginTop: 24, padding: 16, background: '#F4EFEB', borderRadius: 12, border: '1px solid #E8E2D9' }}>
          <h5 style={{ margin: '0 0 8px 0', fontSize: 13, color: '#0F2038' }}>Recent Documents Processed by Engine:</h5>
          {uploadedFilesList.map((fn, idx) => (
            <div key={idx} style={{ fontSize: 12, color: '#0E7B6C', fontWeight: 600, marginBottom: 4 }}>
              ✓ {fn} → Parsed into active claims list!
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
