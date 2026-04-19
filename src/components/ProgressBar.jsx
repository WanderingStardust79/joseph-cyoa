import React from 'react';

export default function ProgressBar({ current = 0, total = 9 }) {
  const pct = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

  return (
    <div
      className="progress-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        zIndex: 900,
        borderRadius: 0,
      }}
    >
      <div
        className="progress-fill"
        style={{
          width: `${pct}%`,
          borderRadius: 0,
        }}
      />
    </div>
  );
}
