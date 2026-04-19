import React from 'react';
import { CHARACTERS } from '../data/characters.js';

export default function Header({ character, isAlt, traits, narration, onMapOpen, streak }) {
  const char = character ? (CHARACTERS[character] || null) : null;

  return (
    <header style={{
      position: 'fixed',
      top: '4px',
      left: 0,
      right: 0,
      height: '40px',
      zIndex: 800,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      background: 'rgba(10, 10, 20, 0.75)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      fontFamily: 'var(--font-body)',
      fontSize: '0.78rem',
    }}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Map button */}
        {onMapOpen && (
          <button
            className="btn-ghost"
            onClick={onMapOpen}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              border: 'none',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '6px',
            }}
            aria-label="Open journey map"
          >
            🗺️
          </button>
        )}

        {/* Narration toggle */}
        {narration && (
          <button
            className="btn-ghost"
            onClick={narration.toggle}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              border: 'none',
              background: narration.on ? 'rgba(240, 192, 64, 0.15)' : 'rgba(255,255,255,0.06)',
              borderRadius: '6px',
              color: narration.on ? 'var(--color-primary)' : 'var(--color-text-muted)',
            }}
            aria-label={narration.on ? 'Narration on' : 'Narration off'}
          >
            {narration.on ? (narration.speaking ? '🔊' : '🔉') : '🔇'}
          </button>
        )}

        {/* Character badge */}
        {char && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '2px 10px 2px 6px',
            borderRadius: '100px',
            border: `1px solid ${char.color}55`,
            background: `${char.color}11`,
          }}>
            <span style={{ fontSize: '0.9rem' }}>{char.icon}</span>
            <span style={{ color: char.color, fontWeight: 600, fontSize: '0.75rem' }}>
              {char.label}
            </span>
          </div>
        )}

        {/* Alt-path indicator */}
        {isAlt && (
          <span style={{
            fontSize: '0.65rem',
            padding: '1px 6px',
            borderRadius: '4px',
            background: 'rgba(224, 80, 80, 0.15)',
            color: 'var(--color-alt-path)',
            border: '1px solid rgba(224, 80, 80, 0.3)',
          }}>
            ALT
          </span>
        )}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Trait counters */}
        {traits && (
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem' }}>
            {traits.faith != null && (
              <span style={{ color: 'var(--color-accent-faith)' }} title="Faith">
                🙏{traits.faith}
              </span>
            )}
            {traits.courage != null && (
              <span style={{ color: 'var(--color-accent-courage)' }} title="Courage">
                🛡️{traits.courage}
              </span>
            )}
            {traits.wisdom != null && (
              <span style={{ color: 'var(--color-accent-wisdom)' }} title="Wisdom">
                📖{traits.wisdom}
              </span>
            )}
          </div>
        )}

        {/* Streak flame */}
        {streak > 1 && (
          <span style={{
            fontSize: '0.85rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            animation: 'streakFlame 1s ease infinite',
          }} title={`${streak} choice streak`}>
            🔥
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#fbbf24',
            }}>
              {streak}
            </span>
          </span>
        )}
      </div>
    </header>
  );
}
