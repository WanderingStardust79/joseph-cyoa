import React, { useState, useCallback } from 'react';

export default function ScriptureCard({ scripture, onContinue }) {
  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  if (!scripture) return null;

  return (
    <div style={{ margin: '12px 0' }}>
      {/* Tappable pill / badge */}
      <button
        onClick={toggle}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '100px',
          border: '1px solid rgba(240, 192, 64, 0.3)',
          background: 'rgba(240, 192, 64, 0.1)',
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          letterSpacing: '0.04em',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        aria-expanded={expanded}
        aria-label={`Scripture: ${scripture.ref}. Tap to ${expanded ? 'collapse' : 'expand'}`}
      >
        <span style={{ fontSize: '1rem' }}>📖</span>
        <span>{scripture.ref}</span>
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.3s ease',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          fontSize: '0.7rem',
        }}>
          ▼
        </span>
      </button>

      {/* Expandable scripture content */}
      <div
        className={`scripture-card ${expanded ? 'expanded' : 'collapsed'}`}
        style={{
          marginTop: expanded ? '8px' : '0',
        }}
      >
        {expanded && (
          <>
            <p style={{ margin: '4px 0 8px 0', paddingLeft: '20px' }}>
              {scripture.text}
            </p>
            <span className="scripture-ref">{scripture.ref}</span>
            {onContinue && (
              <button
                className="btn-primary"
                onClick={onContinue}
                style={{
                  marginTop: '12px',
                  width: '100%',
                  fontSize: '0.9rem',
                }}
              >
                Continue →
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
