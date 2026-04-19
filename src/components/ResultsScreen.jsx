import React, { useState, useEffect, useMemo } from 'react';
import { CHARACTERS } from '../data/characters.js';

const ARCHETYPES = {
  faith: {
    title: 'The Faithful Servant',
    desc: 'Like Joseph, you trusted God even when the road was dark. Your faith shone brightest in the hardest moments.',
  },
  courage: {
    title: 'The Bold Believer',
    desc: 'You stood firm when others wavered. Like David before Goliath, your courage came from knowing God was with you.',
  },
  wisdom: {
    title: 'The Wise Steward',
    desc: 'You sought understanding and made thoughtful choices. Like Solomon, you valued wisdom above all earthly treasures.',
  },
};

const TRAIT_COLORS = {
  faith: '#60a5fa',
  courage: '#f87171',
  wisdom: '#34d399',
};

function TraitRing({ label, value, maxVal, color, delay }) {
  const [animatedPct, setAnimatedPct] = useState(0);
  const pct = maxVal > 0 ? Math.min(100, (value / maxVal) * 100) : 0;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPct / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPct(pct), delay);
    return () => clearTimeout(timer);
  }, [pct, delay]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 40 40)"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
        <text x="40" y="44" textAnchor="middle" fill={color} fontFamily="var(--font-display)" fontSize="16" fontWeight="700">
          {value}
        </text>
      </svg>
      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
        {label}
      </span>
    </div>
  );
}

export default function ResultsScreen({ traits, choices, altExplored, recoveries, onRestart }) {
  const { faith = 0, courage = 0, wisdom = 0 } = traits || {};
  const maxTrait = Math.max(faith, courage, wisdom, 1);

  const archetype = useMemo(() => {
    if (faith >= courage && faith >= wisdom) return ARCHETYPES.faith;
    if (courage >= faith && courage >= wisdom) return ARCHETYPES.courage;
    return ARCHETYPES.wisdom;
  }, [faith, courage, wisdom]);

  const characterKeys = Object.keys(CHARACTERS);

  return (
    <div className="fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px 60px',
      textAlign: 'center',
    }}>
      {/* Crown */}
      <div style={{ fontSize: '56px', marginBottom: '8px' }}>👑</div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.8rem',
        color: 'var(--color-primary)',
        marginBottom: '4px',
      }}>
        {archetype.title}
      </h1>

      {/* Description */}
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--color-text)',
        maxWidth: '340px',
        lineHeight: 1.6,
        marginBottom: '28px',
        opacity: 0.85,
      }}>
        {archetype.desc}
      </p>

      {/* Trait rings */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '28px' }}>
        <TraitRing label="Faith" value={faith} maxVal={maxTrait} color={TRAIT_COLORS.faith} delay={200} />
        <TraitRing label="Courage" value={courage} maxVal={maxTrait} color={TRAIT_COLORS.courage} delay={400} />
        <TraitRing label="Wisdom" value={wisdom} maxVal={maxTrait} color={TRAIT_COLORS.wisdom} delay={600} />
      </div>

      {/* Stats line */}
      <div style={{
        display: 'flex',
        gap: '20px',
        fontSize: '0.78rem',
        color: 'var(--color-text-muted)',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        <span>📋 {choices || 0} choices</span>
        <span>🔀 {altExplored || 0} alt paths</span>
        <span>🔄 {recoveries || 0} recoveries</span>
      </div>

      {/* Character badges */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {characterKeys.map(key => {
          const c = CHARACTERS[key];
          return (
            <div key={key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: '100px',
              background: `${c.color}15`,
              border: `1px solid ${c.color}33`,
              fontSize: '0.75rem',
              color: c.color,
            }}>
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </div>
          );
        })}
      </div>

      {/* Recovery callout */}
      {recoveries > 0 && (
        <div style={{
          padding: '14px 20px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(102, 170, 255, 0.08)',
          border: '1px solid rgba(102, 170, 255, 0.2)',
          maxWidth: '340px',
          marginBottom: '24px',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          color: 'var(--color-text)',
        }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '6px' }}>🕊️</div>
          Even off the path, you chose to come back. That&rsquo;s repentance &mdash; and God honors it every time.
        </div>
      )}

      {/* The Big Lesson */}
      <div className="scripture-card expanded" style={{
        maxWidth: '340px',
        textAlign: 'center',
        marginBottom: '28px',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          color: 'var(--color-primary)',
          marginBottom: '8px',
        }}>
          The Big Lesson
        </div>
        <p style={{ margin: '0 0 6px', fontStyle: 'italic', fontSize: '0.95rem' }}>
          &ldquo;The LORD was with Joseph, and he was a successful man.&rdquo;
        </p>
        <span className="scripture-ref">Genesis 39:2</span>
        <p style={{
          margin: '10px 0 0',
          fontStyle: 'normal',
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
        }}>
          No matter what happened &mdash; betrayal, slavery, prison &mdash; God never left Joseph&rsquo;s side. And He won&rsquo;t leave yours.
        </p>
      </div>

      {/* Play Again */}
      <button className="btn-primary" onClick={onRestart} style={{ minWidth: '200px' }}>
        Play Again
      </button>
    </div>
  );
}
