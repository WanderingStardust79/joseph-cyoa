import React from 'react';

export default function ChoiceButton({ label, text, isBack = false, onClick }) {
  if (isBack) {
    return (
      <button
        className="btn-ghost"
        onClick={onClick}
        style={{
          width: '100%',
          justifyContent: 'center',
          marginTop: '4px',
          fontSize: '0.85rem',
          opacity: 0.7,
        }}
      >
        ← {text}
      </button>
    );
  }

  return (
    <button className="btn-choice" onClick={onClick}>
      {label && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'rgba(240, 192, 64, 0.15)',
            border: '1px solid rgba(240, 192, 64, 0.3)',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.8rem',
            marginRight: '14px',
            flexShrink: 0,
          }}
        >
          {label}
        </span>
      )}
      <span style={{ flex: 1 }}>{text}</span>
    </button>
  );
}
