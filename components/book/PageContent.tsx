import React from 'react';
import styles from '@/app/nexus/nexus.module.css';

export function DashboardContent() {
  return (
    <div className={styles.contentSection}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8c96b", fontSize: "1.4rem", marginBottom: "10px" }}>
        Dashboard
      </h2>
      <p style={{ fontSize: "0.78rem", color: "#8a7e71" }}>
        Welcome back, Commander. System status is nominal.
      </p>
      
      <div className={styles.statGrid}>
        <div className={styles.statBox}>
          <div className={styles.statValue}>99%</div>
          <div className={styles.statLabel}>System Health</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statValue}>14</div>
          <div className={styles.statLabel}>Active Nodes</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statValue}>3.2s</div>
          <div className={styles.statLabel}>Ping Time</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statValue}>0</div>
          <div className={styles.statLabel}>Threats</div>
        </div>
      </div>
    </div>
  );
}

export function ProfileContent() {
  return (
    <div className={styles.contentSection} style={{ textAlign: 'center' }}>
      <div className={styles.profileAvatar}></div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8c96b", fontSize: "1.4rem", marginBottom: "5px" }}>
        Administrator
      </h2>
      <p style={{ fontSize: "0.78rem", color: "#8a7e71", marginBottom: "20px" }}>
        Level 9 Clearance
      </p>

      <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '4px', border: '1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ marginBottom: '10px' }}>
          <div className={styles.statLabel}>ID NUMBER</div>
          <div style={{ color: '#ddd5c8', fontSize: '0.9rem' }}>NEX-8849-B</div>
        </div>
        <div>
          <div className={styles.statLabel}>LAST LOGIN</div>
          <div style={{ color: '#ddd5c8', fontSize: '0.9rem' }}>2026-09-05 08:30:00</div>
        </div>
      </div>
    </div>
  );
}

export function ChatContent() {
  return (
    <div className={styles.contentSection}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8c96b", fontSize: "1.4rem", marginBottom: "15px" }}>
        Comms
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '350px', overflowY: 'auto' }}>
        <div style={{ background: 'rgba(201,168,76,0.05)', padding: '10px', borderRadius: '4px', borderLeft: '2px solid #e8c96b' }}>
          <div className={styles.statLabel} style={{ marginBottom: '5px' }}>HQ (10:05 AM)</div>
          <div style={{ color: '#ddd5c8', fontSize: '0.85rem' }}>Are the servers updated?</div>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px', alignSelf: 'flex-end', width: '85%' }}>
          <div className={styles.statLabel} style={{ marginBottom: '5px', textAlign: 'right' }}>YOU (10:12 AM)</div>
          <div style={{ color: '#ddd5c8', fontSize: '0.85rem', textAlign: 'right' }}>Yes, deployment was successful.</div>
        </div>

        <div style={{ background: 'rgba(201,168,76,0.05)', padding: '10px', borderRadius: '4px', borderLeft: '2px solid #e8c96b' }}>
          <div className={styles.statLabel} style={{ marginBottom: '5px' }}>HQ (10:14 AM)</div>
          <div style={{ color: '#ddd5c8', fontSize: '0.85rem' }}>Excellent. Stand by for next tasks.</div>
        </div>
      </div>
    </div>
  );
}

export function SettingsContent() {
  return (
    <div className={styles.contentSection}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8c96b", fontSize: "1.4rem", marginBottom: "20px" }}>
        Settings
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#ddd5c8', fontSize: '0.9rem' }}>Enable Notifications</div>
          <div style={{ width: '36px', height: '20px', background: '#c9a84c', borderRadius: '10px', position: 'relative' }}>
            <div style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', background: '#04020a', borderRadius: '50%' }}></div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#ddd5c8', fontSize: '0.9rem' }}>Dark Mode (Enforced)</div>
          <div style={{ width: '36px', height: '20px', background: '#c9a84c', borderRadius: '10px', position: 'relative' }}>
            <div style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', background: '#04020a', borderRadius: '50%' }}></div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#ddd5c8', fontSize: '0.9rem' }}>Telemetry</div>
          <div style={{ width: '36px', height: '20px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '2px', top: '2px', width: '16px', height: '16px', background: '#8a7e71', borderRadius: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
