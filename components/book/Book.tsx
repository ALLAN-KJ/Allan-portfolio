"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import styles from '@/app/nexus/nexus.module.css';
import { DashboardContent, ProfileContent, ChatContent, SettingsContent } from './PageContent';

export default function Book() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  
  // To handle manual page navigation
  const [currentPageIndex, setCurrentPageIndex] = useState(0); 
  const totalSpreads = 2; // 2 spreads (dashboard/profile -> chat/settings)
  
  const bookRef = useRef<HTMLDivElement>(null);
  const p0Ref = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);

  const tryUnlock = async () => {
    if (isUnlocking) return;
    setIsUnlocking(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        openBook();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Access Denied.');
      }
    } catch (err) {
      setErrorMsg('Connection Error.');
    } finally {
      setIsUnlocking(false);
    }
  };

  const openBook = () => {
    if (bookOpen) return;
    setBookOpen(true);
    
    if (bookRef.current) bookRef.current.style.transition = 'none';

    const tl = gsap.timeline();
    const isMobile = window.innerWidth <= 768;
    const shiftX = isMobile ? (window.innerWidth <= 480 ? 126 : 147) : 210; // scale 0.6 -> 126, scale 0.7 -> 147

    tl.to(bookRef.current, { x: shiftX, duration: 1.1, ease: 'power3.inOut' }, 0);
    
    tl.to(p0Ref.current, {
      rotationY: -180, duration: 1.5, ease: 'power3.inOut',
      onUpdate: function() {
        if (this.progress() > 0.5 && p0Ref.current) p0Ref.current.style.zIndex = '22';
      }
    }, 0.1);

    tl.to([p1Ref.current, p2Ref.current], {
      rotationY: -180, stagger: 0.07, duration: 0.6, ease: 'power2.in',
      onUpdate: function() {
        const p1 = p1Ref.current;
        const p2 = p2Ref.current;
        if (p1 && gsap.getProperty(p1, 'rotationY') as number < -90) p1.style.zIndex = '23';
        if (p2 && gsap.getProperty(p2, 'rotationY') as number < -90) p2.style.zIndex = '24';
      }
    }, 1.0);

    tl.to([p2Ref.current, p1Ref.current], {
      rotationY: 0, stagger: 0.1, duration: 1.1, ease: 'power3.out',
      onUpdate: function() {
        const p1 = p1Ref.current;
        const p2 = p2Ref.current;
        if (p2 && gsap.getProperty(p2, 'rotationY') as number > -90) p2.style.zIndex = '8';
        if (p1 && gsap.getProperty(p1, 'rotationY') as number > -90) p1.style.zIndex = '9';
      }
    }, 2.1);

    tl.call(() => {
      if (bookRef.current) {
        bookRef.current.style.transition = 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)';
      }
    });
  };

  const turnPageNext = () => {
    if (currentPageIndex >= totalSpreads - 1) return;
    
    const pageToTurn = currentPageIndex === 0 ? p1Ref.current : p2Ref.current;
    if (!pageToTurn) return;

    const newIndex = currentPageIndex + 1;
    setCurrentPageIndex(newIndex);
    
    gsap.to(pageToTurn, {
      rotationY: -180, 
      duration: 1.2, 
      ease: 'power3.inOut',
      onUpdate: function() {
        if (this.progress() > 0.5) {
          pageToTurn.style.zIndex = String(20 + newIndex);
        }
      }
    });
  };

  const turnPagePrev = () => {
    if (currentPageIndex <= 0) return;
    
    const newIndex = currentPageIndex - 1;
    const pageToTurn = newIndex === 0 ? p1Ref.current : p2Ref.current;
    if (!pageToTurn) return;

    setCurrentPageIndex(newIndex);
    
    gsap.to(pageToTurn, {
      rotationY: 0, 
      duration: 1.2, 
      ease: 'power3.inOut',
      onUpdate: function() {
        if (this.progress() > 0.5) {
          pageToTurn.style.zIndex = String(9 - newIndex);
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none perspective-[2400px]">
      <div id="book" ref={bookRef} className={`${styles.bookContainer} pointer-events-auto`}>
        
        {/* Navigation Buttons (Visible only when book is open) */}
        {bookOpen && (
          <>
            {currentPageIndex > 0 && (
              <button className={`${styles.navButton} ${styles.navPrev}`} onClick={turnPagePrev} aria-label="Previous Page">
                ←
              </button>
            )}
            {currentPageIndex < totalSpreads - 1 && (
              <button className={`${styles.navButton} ${styles.navNext}`} onClick={turnPageNext} aria-label="Next Page">
                →
              </button>
            )}
          </>
        )}

        {/* PAGE 0: COVER / LOGIN */}
        <div ref={p0Ref} className={styles.page} style={{ zIndex: 10 }}>
          <div className={`${styles.face} ${styles.cover}`}>
            <div className={styles.cframe}></div>
            <div className={styles.coverInner}>
              <div className={styles.ctitle}>NEXUS</div>
              <div className={styles.loginArea}>
                <div className={styles.fw}>
                  <div className={styles.fl}>Username</div>
                  <input 
                    className={styles.uinput} 
                    type="text" 
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
                  />
                </div>
                <div className={styles.fw}>
                  <div className={styles.fl}>Password</div>
                  <input 
                    className={styles.uinput} 
                    type="password" 
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
                  />
                </div>
                <button className={styles.btnUnlock} onClick={tryUnlock} disabled={isUnlocking}>
                  {isUnlocking ? 'Authenticating...' : '✦ Unlock ✦'}
                </button>
                <div className={styles.errMsg}>{errorMsg}</div>
              </div>
            </div>
          </div>
          <div className={`${styles.face} ${styles.faceBack} ${styles.pbg}`}>
             {/* Back of Cover -> Empty / Intro */}
             <div className={styles.pi}>
                <h2>System Access Granted</h2>
                <p>Welcome to the Nexus control panel.</p>
             </div>
          </div>
        </div>

        {/* PAGE 1: Dashboard / Profile */}
        <div ref={p1Ref} className={styles.page} style={{ zIndex: 9 }}>
          <div className={`${styles.face} ${styles.pbg}`}>
            <div className={styles.pi} style={{ padding: 0 }}>
              <DashboardContent />
            </div>
          </div>
          <div className={`${styles.face} ${styles.faceBack} ${styles.pbg}`}>
            <div className={styles.pi} style={{ padding: 0 }}>
              <ProfileContent />
            </div>
          </div>
        </div>

        {/* PAGE 2: Chat / Settings */}
        <div ref={p2Ref} className={styles.page} style={{ zIndex: 8 }}>
          <div className={`${styles.face} ${styles.pbg}`}>
            <div className={styles.pi} style={{ padding: 0 }}>
              <ChatContent />
            </div>
          </div>
          <div className={`${styles.face} ${styles.faceBack} ${styles.pbg}`}>
            <div className={styles.pi} style={{ padding: 0 }}>
              <SettingsContent />
            </div>
          </div>
        </div>

        {/* Back cover (Static, lowest z-index) */}
        <div className={styles.page} style={{ zIndex: 4 }}>
          <div className={`${styles.face} ${styles.cover}`}></div>
          <div className={`${styles.face} ${styles.faceBack} ${styles.cover}`}></div>
        </div>

      </div>
    </div>
  );
}
