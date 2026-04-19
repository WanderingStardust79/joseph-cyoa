import React, { useState, useEffect, useCallback } from 'react';

const TRAIT_META = {
  faith:   { icon: '🙏', label: 'Faith' },
  courage: { icon: '🛡️', label: 'Courage' },
  wisdom:  { icon: '📖', label: 'Wisdom' },
};

export default function TraitToast({ traits, onDone }) {
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => { if (onDone) onDone(); }, 350);
  }, [onDone]);

  useEffect(() => {
    if (!traits) return;
    const entries = Object.entries(traits).filter(([, v]) => v !== 0);
    if (entries.length === 0) { if (onDone) onDone(); return; }

    // Show after brief delay for mounting
    const showTimer = setTimeout(() => setVisible(true), 50);
    const hideTimer = setTimeout(dismiss, 1800);

    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [traits, dismiss, onDone]);

  if (!traits) return null;
  const entries = Object.entries(traits).filter(([, v]) => v !== 0);
  if (entries.length === 0) return null;

  return (
    <div
      className={`trait-toast ${visible ? 'visible' : ''}`}
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      {entries.map(([key, val]) => {
        const meta = TRAIT_META[key] || { icon: '✨', label: key };
        const traitClass = TRAIT_META[key] ? `trait-toast--${key}` : '';
        return (
          <span
            key={key}
            className={traitClass}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              animation: visible ? 'traitPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
            }}
          >
            <span className="trait-toast-icon">{meta.icon}</span>
            <span>{meta.label}</span>
            <span className="trait-toast-value">
              {val > 0 ? '+' : ''}{val}
            </span>
          </span>
        );
      })}
    </div>
  );
}
