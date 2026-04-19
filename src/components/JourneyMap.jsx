import React, { useMemo } from 'react';
import { CHARACTERS } from '../data/characters.js';

const CHAPTER_TITLES = [
  'The Dreamer',
  'The Coat of Many Colors',
  'Betrayal in the Field',
  'Into the Pit',
  'Sold to Egypt',
  "Potiphar's House",
  'The Prison',
  "Pharaoh's Dreams",
  'Rise to Power',
];

export default function JourneyMap({ currentChapter, visited, scenes, onClose }) {
  const chapters = useMemo(() => {
    return CHAPTER_TITLES.map((title, i) => {
      const num = i + 1;
      const isVisited = visited && visited.has(num);
      const isCurrent = num === currentChapter;
      const isFuture = num > currentChapter;

      // Try to find character for this chapter from scenes
      let charKey = 'joseph';
      if (scenes) {
        const sceneKey = Object.keys(scenes).find(k => {
          const s = scenes[k];
          return s && s.chapter === num;
        });
        if (sceneKey && scenes[sceneKey] && scenes[sceneKey].character) {
          charKey = scenes[sceneKey].character;
        }
      }
      const char = CHARACTERS[charKey] || CHARACTERS.joseph;

      // Collect visited paths for this chapter
      let paths = [];
      if (scenes && isVisited) {
        paths = Object.entries(scenes)
          .filter(([, s]) => s && s.chapter === num && visited.has(s.id || num))
          .map(([k]) => k)
          .slice(0, 3);
      }

      return { num, title, isVisited, isCurrent, isFuture, char, paths };
    });
  }, [currentChapter, visited, scenes]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1500,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
        padding: '24px 16px',
      }}
      className="fade-in"
    >
      {/* Title */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        color: 'var(--color-primary)',
        fontSize: '1.3rem',
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        Your Journey
      </h2>

      {/* Chapter nodes */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        maxWidth: '320px',
        width: '100%',
      }}>
        {chapters.map((ch, i) => (
          <React.Fragment key={ch.num}>
            {/* Connecting path line */}
            {i > 0 && (
              <div style={{
                width: '2px',
                height: '24px',
                background: ch.isVisited || ch.isCurrent
                  ? 'var(--color-primary)'
                  : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s ease',
              }} />
            )}

            {/* Chapter node */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                width: '100%',
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                background: ch.isCurrent
                  ? 'rgba(240, 192, 64, 0.12)'
                  : ch.isVisited
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(255, 255, 255, 0.02)',
                border: ch.isCurrent
                  ? '1px solid rgba(240, 192, 64, 0.4)'
                  : '1px solid transparent',
                opacity: ch.isFuture ? 0.35 : 1,
                transition: 'all 0.3s ease',
                animation: ch.isCurrent ? 'pulseGlow 2s ease infinite' : 'none',
              }}
            >
              {/* Circle with chapter number */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.85rem',
                flexShrink: 0,
                background: ch.isVisited || ch.isCurrent
                  ? `linear-gradient(135deg, ${ch.char.color} 0%, ${ch.char.color}aa 100%)`
                  : 'rgba(255, 255, 255, 0.08)',
                color: ch.isVisited || ch.isCurrent ? '#1a1a2e' : 'rgba(255,255,255,0.3)',
                border: ch.isCurrent
                  ? '2px solid var(--color-primary)'
                  : '1px solid rgba(255,255,255,0.1)',
              }}>
                {ch.isFuture ? '🔒' : ch.num}
              </div>

              {/* Title & info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  color: ch.isFuture ? 'var(--color-text-muted)' : 'var(--color-text)',
                  marginBottom: '2px',
                }}>
                  {ch.title}
                </div>
                {/* Path tags for completed chapters */}
                {ch.paths.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {ch.paths.map((path, pi) => (
                      <span key={pi} style={{
                        fontSize: '0.65rem',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: `${ch.char.color}22`,
                        color: ch.char.color,
                        border: `1px solid ${ch.char.color}33`,
                      }}>
                        {path}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Character icon */}
              <div style={{
                fontSize: '1.2rem',
                opacity: ch.isFuture ? 0.3 : 0.8,
                flexShrink: 0,
              }}>
                {ch.char.icon}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Close button */}
      <button
        className="btn-primary"
        onClick={onClose}
        style={{ marginTop: '28px', minWidth: '160px' }}
      >
        Close Map
      </button>
    </div>
  );
}
