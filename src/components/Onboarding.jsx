import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CHARACTERS } from '../data/characters.js';

const SLIDES = [
  {
    title: "You're About to Live\nthe Story of Joseph",
    subtitle: 'From dreamer to ruler — and every hard step in between.',
    visual: 'stars',
  },
  {
    title: 'See Through\n5 Different Eyes',
    subtitle: 'Play as Joseph, a brother, Jacob, the butler, and Pharaoh.',
    visual: 'characters',
  },
  {
    title: 'Your Choices Build\nYour Character',
    subtitle: 'Every decision shapes your faith, courage, and wisdom.',
    visual: 'traits',
  },
];

const STORAGE_KEY = 'hasOnboarded';

function StarsVisual() {
  return (
    <div style={{ fontSize: '64px', lineHeight: 1, marginBottom: '8px' }}>
      <span style={{ display: 'inline-block', animation: 'traitPopIn 0.6s ease forwards' }}>⭐</span>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
        {['✨', '🌙', '✨'].map((e, i) => (
          <span key={i} style={{
            fontSize: '28px',
            opacity: 0.6,
            animation: `traitPopIn 0.5s ease ${0.2 + i * 0.15}s forwards`,
            animationFillMode: 'both',
          }}>{e}</span>
        ))}
      </div>
    </div>
  );
}

function CharactersVisual() {
  const chars = Object.values(CHARACTERS);
  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {chars.map((c, i) => (
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          animation: `traitPopIn 0.4s ease ${i * 0.1}s forwards`,
          animationFillMode: 'both',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: `${c.color}22`,
            border: `2px solid ${c.color}66`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}>
            {c.icon}
          </div>
          <span style={{ fontSize: '0.6rem', color: c.color, opacity: 0.8 }}>{c.label}</span>
        </div>
      ))}
    </div>
  );
}

function TraitsVisual() {
  const items = [
    { icon: '🙏', label: 'Faith', color: '#60a5fa' },
    { icon: '🛡️', label: 'Courage', color: '#f87171' },
    { icon: '📖', label: 'Wisdom', color: '#34d399' },
  ];
  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      {items.map((t, i) => (
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          animation: `traitPopIn 0.5s ease ${i * 0.15}s forwards`,
          animationFillMode: 'both',
        }}>
          <div style={{
            fontSize: '36px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: `${t.color}15`,
            border: `2px solid ${t.color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {t.icon}
          </div>
          <span style={{
            fontSize: '0.75rem',
            color: t.color,
            fontFamily: 'var(--font-display)',
          }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

const VISUALS = { stars: StarsVisual, characters: CharactersVisual, traits: TraitsVisual };

export default function Onboarding({ onComplete }) {
  const [slide, setSlide] = useState(0);
  const touchStartRef = useRef(null);

  // Check localStorage on mount
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        onComplete();
      }
    } catch {
      // localStorage unavailable, show onboarding
    }
  }, [onComplete]);

  const next = useCallback(() => {
    if (slide < SLIDES.length - 1) {
      setSlide(s => s + 1);
    } else {
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
      onComplete();
    }
  }, [slide, onComplete]);

  const prev = useCallback(() => {
    if (slide > 0) setSlide(s => s - 1);
  }, [slide]);

  // Touch swipe
  const onTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartRef.current = null;
  }, [next, prev]);

  const current = SLIDES[slide];
  const Visual = VISUALS[current.visual];
  const isLast = slide === SLIDES.length - 1;

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      {/* Visual */}
      <div key={slide} className="fade-in" style={{ marginBottom: '32px' }}>
        {Visual && <Visual />}
      </div>

      {/* Title */}
      <h1
        key={`t-${slide}`}
        className="fade-in"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          color: 'var(--color-primary)',
          marginBottom: '12px',
          whiteSpace: 'pre-line',
          lineHeight: 1.3,
        }}
      >
        {current.title}
      </h1>

      {/* Subtitle */}
      <p
        key={`s-${slide}`}
        className="fade-in"
        style={{
          fontSize: '0.95rem',
          color: 'var(--color-text)',
          maxWidth: '300px',
          lineHeight: 1.6,
          opacity: 0.8,
          marginBottom: '40px',
        }}
      >
        {current.subtitle}
      </p>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === slide ? '24px' : '8px',
              height: '8px',
              borderRadius: '100px',
              background: i === slide ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Button */}
      <button className="btn-primary" onClick={next} style={{ minWidth: '200px', fontSize: '1.05rem' }}>
        {isLast ? 'Begin' : 'Next'}
      </button>
    </div>
  );
}
