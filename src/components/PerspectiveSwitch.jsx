import React, { useState, useEffect, useRef } from 'react';
import { CHARACTERS } from '../data/characters.js';

export default function PerspectiveSwitch({ who, onDone }) {
  const [phase, setPhase] = useState('flash'); // flash -> reveal -> done
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const char = CHARACTERS[who] || CHARACTERS.joseph;

  useEffect(() => {
    // Phase 1: white flash (200ms)
    const t1 = setTimeout(() => setPhase('reveal'), 200);
    // Phase 2: animate progress bar
    const t2 = setTimeout(() => setProgress(100), 300);
    // Phase 3: call onDone
    timerRef.current = setTimeout(() => {
      if (onDone) onDone();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(timerRef.current);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.3s ease',
        background: phase === 'flash'
          ? 'rgba(255,255,255,0.95)'
          : `linear-gradient(135deg, ${char.color}22 0%, ${char.color}44 100%)`,
      }}
    >
      {phase === 'reveal' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            animation: 'traitPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          {/* Character icon */}
          <div style={{
            fontSize: '72px',
            lineHeight: 1,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
          }}>
            {char.icon}
          </div>

          {/* Label */}
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}>
            You Are Now Playing As
          </div>

          {/* Character name */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '36px',
            fontWeight: 700,
            color: char.color,
            textShadow: `0 2px 12px ${char.color}66`,
          }}>
            {char.label}
          </div>

          {/* Description */}
          {char.desc && (
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-text)',
              textAlign: 'center',
              maxWidth: '280px',
              opacity: 0.8,
              lineHeight: 1.5,
              marginTop: '4px',
            }}>
              {char.desc}
            </div>
          )}
        </div>
      )}

      {/* Progress bar at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '10%',
        right: '10%',
      }}>
        <div className="progress-bar" style={{ height: '4px' }}>
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              transition: 'width 1.9s cubic-bezier(0.4, 0, 0.2, 1)',
              background: `linear-gradient(90deg, ${char.color} 0%, ${char.color}99 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
