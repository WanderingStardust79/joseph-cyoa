import React, { useMemo } from 'react';

const PALETTES = {
  default: { primary: '#f0c040', secondary: '#d4a017', accent: '#fef3c7', dark: '#3a2a08', mid: '#8b6914' },
  alt: { primary: '#e05050', secondary: '#b83030', accent: '#fecaca', dark: '#3a0a0a', mid: '#8b2020' },
};

function Stars({ p }) {
  return (
    <svg viewBox="0 0 300 120" width="300" height="120" role="img" aria-label="Stars in the night sky">
      <defs>
        <radialGradient id="sky-grad" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#1a1a3e" />
          <stop offset="100%" stopColor="#0a0a1e" />
        </radialGradient>
        <filter id="star-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="300" height="120" fill="url(#sky-grad)" rx="8" />
      {/* Horizon line */}
      <path d="M0 105 Q75 95 150 100 Q225 105 300 98 L300 120 L0 120Z" fill="#1a1a2e" opacity="0.6" />
      {/* Small background stars */}
      {[40,80,120,180,220,260,30,160,250].map((x, i) => (
        <circle key={`sm-${i}`} cx={x} cy={15 + (i * 7) % 50} r={0.8} fill="#fff" opacity={0.4 + (i % 3) * 0.2}>
          <animate attributeName="opacity" values={`${0.3 + i * 0.05};${0.7};${0.3 + i * 0.05}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Main constellation - 11 stars like Joseph's dream */}
      {[
        [90,30],[130,20],[150,15],[170,20],[210,30],
        [100,50],[140,40],[160,40],[200,50],
        [120,65],[180,65],
      ].map(([x, y], i) => (
        <g key={`star-${i}`} filter="url(#star-glow)">
          <polygon
            points={`${x},${y - 5} ${x + 1.5},${y - 1.5} ${x + 5},${y} ${x + 1.5},${y + 1.5} ${x},${y + 5} ${x - 1.5},${y + 1.5} ${x - 5},${y} ${x - 1.5},${y - 1.5}`}
            fill={p.primary}
            opacity="0.9"
          >
            <animate attributeName="opacity" values="0.7;1;0.7" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
          </polygon>
        </g>
      ))}
      {/* Central big star */}
      <g filter="url(#star-glow)">
        <polygon
          points="150,8 153,18 163,18 155,24 158,34 150,28 142,34 145,24 137,18 147,18"
          fill={p.accent}
          opacity="0.95"
        >
          <animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="3s" repeatCount="indefinite" additive="sum" />
        </polygon>
      </g>
      {/* Sleeping figure silhouette */}
      <ellipse cx="150" cy="108" rx="18" ry="6" fill="#0a0a14" opacity="0.5" />
      <path d="M135 108 Q140 95 150 92 Q160 95 165 108" fill="#1a1a2e" stroke={p.dark} strokeWidth="0.5" />
    </svg>
  );
}

function Coat({ p }) {
  return (
    <svg viewBox="0 0 300 120" width="300" height="120" role="img" aria-label="Coat of many colors">
      <defs>
        <linearGradient id="coat-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.dark} />
          <stop offset="100%" stopColor={p.mid} />
        </linearGradient>
        <filter id="coat-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect width="300" height="120" fill="url(#coat-bg)" rx="8" />
      {/* Coat shape */}
      <g filter="url(#coat-shadow)" transform="translate(150,60)">
        {/* Body */}
        <path d="M-20,-35 L-25,-10 L-30,30 L-10,35 L0,30 L10,35 L30,30 L25,-10 L20,-35 Q0,-42 -20,-35Z"
          fill="none" stroke={p.accent} strokeWidth="1.5" opacity="0.3" />
        {/* Colored stripes */}
        {[
          { y: -30, color: '#e05050' },
          { y: -22, color: '#f0c040' },
          { y: -14, color: '#34d399' },
          { y: -6, color: '#60a5fa' },
          { y: 2, color: '#c084fc' },
          { y: 10, color: '#f97316' },
          { y: 18, color: '#ec4899' },
        ].map(({ y, color }, i) => (
          <rect key={i} x={-22 + Math.abs(y) * 0.15} y={y} width={44 - Math.abs(y) * 0.3} height={6} rx="1"
            fill={color} opacity="0.7">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </rect>
        ))}
        {/* Sleeves */}
        <path d="M-20,-30 L-40,-15 L-35,-8 L-22,-18" fill={p.primary} opacity="0.4" />
        <path d="M20,-30 L40,-15 L35,-8 L22,-18" fill={p.primary} opacity="0.4" />
        {/* Collar */}
        <path d="M-12,-35 Q0,-40 12,-35 Q5,-30 0,-32 Q-5,-30 -12,-35Z" fill={p.accent} opacity="0.5" />
      </g>
      {/* Sparkles */}
      {[[-60,-20],[60,-25],[70,15],[-55,20]].map(([x,y],i) => (
        <text key={i} x={150+x} y={60+y} fontSize="8" opacity="0.5" textAnchor="middle">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${1.5+i*0.4}s`} repeatCount="indefinite" />
          ✦
        </text>
      ))}
    </svg>
  );
}

function Tent({ p }) {
  return (
    <svg viewBox="0 0 300 120" width="300" height="120" role="img" aria-label="Desert tent">
      <defs>
        <linearGradient id="tent-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1040" />
          <stop offset="100%" stopColor="#3a2a30" />
        </linearGradient>
      </defs>
      <rect width="300" height="120" fill="url(#tent-sky)" rx="8" />
      {/* Ground / sand */}
      <path d="M0 90 Q50 85 100 88 Q150 92 200 87 Q250 90 300 88 L300 120 L0 120Z" fill="#8b7340" opacity="0.5" />
      <path d="M0 95 Q75 93 150 96 Q225 93 300 95 L300 120 L0 120Z" fill="#6b5330" opacity="0.4" />
      {/* Main tent */}
      <path d="M100 90 L150 35 L200 90Z" fill={p.mid} stroke={p.primary} strokeWidth="1" opacity="0.8" />
      <path d="M150 35 L150 90" stroke={p.accent} strokeWidth="0.5" opacity="0.3" />
      {/* Tent opening */}
      <path d="M140 90 Q145 70 150 65 Q155 70 160 90" fill={p.dark} opacity="0.6" />
      {/* Side tent */}
      <path d="M210 90 L235 60 L260 90Z" fill={p.mid} opacity="0.5" stroke={p.primary} strokeWidth="0.5" />
      {/* Campfire */}
      <circle cx="170" cy="95" r="3" fill="#f97316" opacity="0.8">
        <animate attributeName="r" values="2.5;3.5;2.5" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="170" cy="95" r="6" fill="#f97316" opacity="0.15">
        <animate attributeName="r" values="5;8;5" dur="1s" repeatCount="indefinite" />
      </circle>
      {/* Moon */}
      <circle cx="60" cy="25" r="10" fill="#fef3c7" opacity="0.8" />
      <circle cx="56" cy="23" r="9" fill="#1a1040" />
      {/* Stars */}
      {[[80,15],[120,20],[240,18],[270,30],[45,45]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#fff" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2+i*0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function Pit({ p }) {
  return (
    <svg viewBox="0 0 300 120" width="300" height="120" role="img" aria-label="The pit">
      <defs>
        <linearGradient id="pit-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b7340" />
          <stop offset="100%" stopColor="#3a2a08" />
        </linearGradient>
        <radialGradient id="pit-dark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="100%" stopColor="#1a1008" />
        </radialGradient>
      </defs>
      <rect width="300" height="120" fill="url(#pit-bg)" rx="8" />
      {/* Ground surface */}
      <path d="M0 45 L100 45 Q110 44 115 48 L115 48 L185 48 Q190 44 200 45 L300 45 L300 0 L0 0Z"
        fill="#a08850" opacity="0.5" />
      {/* Pit walls */}
      <path d="M115 48 L120 110 L180 110 L185 48" fill="url(#pit-dark)" />
      <path d="M115 48 L120 110" stroke="#5a4a30" strokeWidth="1.5" opacity="0.6" />
      <path d="M185 48 L180 110" stroke="#5a4a30" strokeWidth="1.5" opacity="0.6" />
      {/* Rocks at edges */}
      {[[95,44,8],[105,42,6],[195,43,7],[207,44,5]].map(([x,y,r],i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r*0.6} fill="#6b5a40" stroke="#5a4a30" strokeWidth="0.5" />
      ))}
      {/* Figure at bottom */}
      <circle cx="150" cy="95" r="5" fill={p.primary} opacity="0.5" />
      <line x1="150" y1="100" x2="150" y2="108" stroke={p.primary} strokeWidth="1.5" opacity="0.4" />
      {/* Light beam from above */}
      <path d="M140 0 L145 48 L155 48 L160 0" fill={p.accent} opacity="0.06">
        <animate attributeName="opacity" values="0.04;0.08;0.04" dur="3s" repeatCount="indefinite" />
      </path>
      {/* Hands reaching up */}
      <path d="M147 88 L143 80 M148 88 L145 82" stroke={p.primary} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M153 88 L157 80 M152 88 L155 82" stroke={p.primary} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

function Caravan({ p }) {
  return (
    <svg viewBox="0 0 300 120" width="300" height="120" role="img" aria-label="Trading caravan">
      <defs>
        <linearGradient id="car-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9860a" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
      </defs>
      <rect width="300" height="120" fill="url(#car-sky)" rx="8" />
      {/* Sun */}
      <circle cx="250" cy="30" r="18" fill="#f0c040" opacity="0.6" />
      <circle cx="250" cy="30" r="22" fill="#f0c040" opacity="0.1" />
      {/* Dunes */}
      <path d="M0 85 Q40 70 80 80 Q130 65 180 78 Q230 68 280 75 Q300 80 300 85 L300 120 L0 120Z" fill="#a08040" opacity="0.5" />
      <path d="M0 95 Q60 88 120 92 Q180 86 240 90 Q280 92 300 95 L300 120 L0 120Z" fill="#8b6914" opacity="0.6" />
      {/* Camels - 3 in a line */}
      {[80, 150, 220].map((cx, i) => (
        <g key={i} transform={`translate(${cx}, 75)`}>
          <animateTransform attributeName="transform" type="translate" values={`${cx},75;${cx},73;${cx},75`} dur="1.2s" begin={`${i*0.3}s`} repeatCount="indefinite" />
          {/* Camel body */}
          <ellipse cx="0" cy="0" rx="12" ry="6" fill="#7a6530" />
          {/* Hump */}
          <ellipse cx="-2" cy="-6" rx="5" ry="4" fill="#6a5520" />
          {/* Head */}
          <circle cx="12" cy="-6" r="3" fill="#7a6530" />
          <line x1="10" y1="-3" x2="13" y2="-8" stroke="#7a6530" strokeWidth="2" />
          {/* Legs */}
          <line x1="-6" y1="5" x2="-7" y2="14" stroke="#6a5520" strokeWidth="1.5" />
          <line x1="6" y1="5" x2="5" y2="14" stroke="#6a5520" strokeWidth="1.5" />
          {/* Pack/goods */}
          <rect x="-8" y="-10" width="8" height="5" rx="1" fill={p.primary} opacity="0.6" />
        </g>
      ))}
      {/* Rope connecting camels */}
      <path d="M92 70 Q120 72 138 70" stroke="#5a4a30" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M162 70 Q190 72 208 70" stroke="#5a4a30" strokeWidth="0.5" fill="none" opacity="0.5" />
    </svg>
  );
}

function Temple({ p }) {
  return (
    <svg viewBox="0 0 300 120" width="300" height="120" role="img" aria-label="Egyptian temple">
      <defs>
        <linearGradient id="temp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0a3e" />
          <stop offset="100%" stopColor="#2a1a5e" />
        </linearGradient>
      </defs>
      <rect width="300" height="120" fill="url(#temp-bg)" rx="8" />
      {/* Main temple structure */}
      <path d="M100 100 L100 40 L110 35 L190 35 L200 40 L200 100Z" fill="#c9a84c" opacity="0.7" />
      {/* Pillars */}
      {[115, 135, 155, 175, 195].map((x, i) => (
        <g key={i}>
          <rect x={x - 3} y={40} width={6} height={60} fill="#b8973c" opacity="0.8" />
          <rect x={x - 4} y={38} width={8} height={4} rx="1" fill="#d4b04c" opacity="0.7" />
          <rect x={x - 4} y={98} width={8} height={4} rx="1" fill="#d4b04c" opacity="0.7" />
        </g>
      ))}
      {/* Top decoration */}
      <path d="M105 35 L150 18 L195 35" fill="none" stroke={p.primary} strokeWidth="1.5" opacity="0.7" />
      {/* Eye of Horus at top */}
      <circle cx="150" cy="27" r="4" fill="none" stroke={p.primary} strokeWidth="1" opacity="0.8" />
      <circle cx="150" cy="27" r="1.5" fill={p.primary} opacity="0.7">
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Steps */}
      <rect x="95" y="100" width="110" height="4" fill="#a08840" opacity="0.6" />
      <rect x="90" y="104" width="120" height="4" fill="#907830" opacity="0.5" />
      <rect x="85" y="108" width="130" height="4" fill="#806820" opacity="0.4" />
      {/* Torches */}
      {[85, 215].map((x, i) => (
        <g key={i}>
          <rect x={x - 1.5} y={50} width={3} height={35} fill="#6a5520" />
          <circle cx={x} cy={48} r="4" fill="#f97316" opacity="0.7">
            <animate attributeName="r" values="3;5;3" dur={`${0.7 + i * 0.2}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={48} r="8" fill="#f97316" opacity="0.1">
            <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function Chains({ p }) {
  return (
    <svg viewBox="0 0 300 120" width="300" height="120" role="img" aria-label="Prison chains">
      <rect width="300" height="120" fill="#0a0a14" rx="8" />
      {/* Stone wall texture */}
      {[0,30,60,90].map(y => (
        <g key={y}>
          {[0,50,100,150,200,250].map((x,i) => (
            <rect key={i} x={x + (y%60 ? 25 : 0)} y={y} width={48} height={28} rx="1"
              fill="none" stroke="#1a1a28" strokeWidth="1" opacity="0.5" />
          ))}
        </g>
      ))}
      {/* Window with bars */}
      <rect x="120" y="10" width="60" height="40" rx="2" fill="#1a1a3e" />
      {[130,140,150,160,170].map(x => (
        <line key={x} x1={x} y1={10} x2={x} y2={50} stroke="#3a3a4e" strokeWidth="2" />
      ))}
      {/* Moonlight through window */}
      <path d="M125 50 L110 100 L190 100 L175 50" fill="#6ea8fe" opacity="0.03">
        <animate attributeName="opacity" values="0.02;0.05;0.02" dur="4s" repeatCount="indefinite" />
      </path>
      {/* Chain links */}
      <g transform="translate(80, 30)">
        {[0,1,2,3,4,5,6].map(i => (
          <ellipse key={i} cx={0} cy={i * 12} rx="4" ry="6" fill="none"
            stroke="#666" strokeWidth="2" opacity="0.7">
            <animate attributeName="cx" values={`${-1};${1};${-1}`} dur="3s" begin={`${i*0.1}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
      </g>
      <g transform="translate(220, 25)">
        {[0,1,2,3,4,5,6].map(i => (
          <ellipse key={i} cx={0} cy={i * 12} rx="4" ry="6" fill="none"
            stroke="#666" strokeWidth="2" opacity="0.7">
            <animate attributeName="cx" values={`${1};${-1};${1}`} dur="3s" begin={`${i*0.1}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
      </g>
      {/* Figure sitting */}
      <circle cx="150" cy="82" r="6" fill={p.primary} opacity="0.3" />
      <path d="M144 88 Q150 100 156 88" stroke={p.primary} strokeWidth="1.5" fill="none" opacity="0.3" />
      <line x1="150" y1="95" x2="150" y2="108" stroke={p.primary} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function Throne({ p }) {
  return (
    <svg viewBox="0 0 300 120" width="300" height="120" role="img" aria-label="Pharaoh's throne room">
      <defs>
        <linearGradient id="throne-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1a5e" />
          <stop offset="100%" stopColor="#1a0a3e" />
        </linearGradient>
      </defs>
      <rect width="300" height="120" fill="url(#throne-bg)" rx="8" />
      {/* Floor - marble tiles */}
      <path d="M0 85 L300 85 L300 120 L0 120Z" fill="#3a2a5e" opacity="0.5" />
      {[0,40,80,120,160,200,240,280].map(x => (
        <line key={x} x1={x} y1={85} x2={x + 20} y2={120} stroke="#4a3a6e" strokeWidth="0.5" opacity="0.3" />
      ))}
      {/* Throne */}
      <path d="M125 85 L125 45 L120 40 L120 30 L130 35 L130 45 L170 45 L170 35 L180 30 L180 40 L175 45 L175 85Z"
        fill="#c9a84c" stroke="#f0c040" strokeWidth="1" opacity="0.8" />
      {/* Throne seat */}
      <rect x="128" y="65" width="44" height="8" rx="2" fill="#b8973c" />
      {/* Throne decorations */}
      <circle cx="150" cy="52" r="5" fill={p.primary} opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Pillars */}
      {[60, 240].map((x, i) => (
        <g key={i}>
          <rect x={x - 5} y={20} width={10} height={85} fill="#8a7a5c" opacity="0.5" />
          <rect x={x - 7} y={18} width={14} height={5} rx="1" fill="#a08a6c" opacity="0.5" />
        </g>
      ))}
      {/* Red carpet */}
      <path d="M140 85 L135 120 L165 120 L160 85" fill="#8b2020" opacity="0.5" />
      {/* Figure on throne */}
      <circle cx="150" cy="58" r="4" fill={p.primary} opacity="0.5" />
      <path d="M145 62 L150 75 L155 62" fill={p.primary} opacity="0.4" />
      {/* Crown */}
      <path d="M146 54 L148 50 L150 53 L152 50 L154 54" fill={p.accent} stroke={p.primary} strokeWidth="0.5" opacity="0.8" />
    </svg>
  );
}

function Crown({ p }) {
  return (
    <svg viewBox="0 0 300 120" width="300" height="120" role="img" aria-label="Golden crown">
      <defs>
        <radialGradient id="crown-glow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor={p.primary} stopOpacity="0.3" />
          <stop offset="100%" stopColor={p.dark} stopOpacity="0" />
        </radialGradient>
        <filter id="crown-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <rect width="300" height="120" fill={p.dark} rx="8" />
      {/* Radial glow behind crown */}
      <circle cx="150" cy="60" r="50" fill="url(#crown-glow)">
        <animate attributeName="r" values="45;55;45" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Crown shape */}
      <g transform="translate(150, 60)">
        {/* Base band */}
        <path d="M-35,10 Q-35,18 0,20 Q35,18 35,10 Q35,5 0,3 Q-35,5 -35,10Z"
          fill="#c9a84c" stroke={p.primary} strokeWidth="1" />
        {/* Crown points */}
        <path d="M-30,8 L-32,-15 L-20,-5 L-10,-25 L0,-10 L10,-25 L20,-5 L32,-15 L30,8"
          fill={p.primary} stroke={p.accent} strokeWidth="0.5" opacity="0.9" />
        {/* Jewels */}
        <circle cx="-20" cy="-2" r="3" fill="#e05050" opacity="0.8" />
        <circle cx="0" cy="-5" r="3.5" fill="#60a5fa" opacity="0.8">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="-2" r="3" fill="#34d399" opacity="0.8" />
        {/* Cross on center point */}
        <line x1="0" y1="-20" x2="0" y2="-13" stroke={p.accent} strokeWidth="1.5" />
        <line x1="-3" y1="-17" x2="3" y2="-17" stroke={p.accent} strokeWidth="1.5" />
      </g>
      {/* Sparkle particles */}
      {[[100,35],[200,40],[120,80],[185,78],[110,50],[195,55]].map(([x,y],i) => (
        <text key={i} x={x} y={y} fontSize="6" textAnchor="middle" opacity="0.4">
          <animate attributeName="opacity" values="0.1;0.6;0.1" dur={`${1.5+i*0.3}s`} repeatCount="indefinite" />
          ✦
        </text>
      ))}
    </svg>
  );
}

const ILLUSTRATIONS = { stars: Stars, coat: Coat, tent: Tent, pit: Pit, caravan: Caravan, temple: Temple, chains: Chains, throne: Throne, crown: Crown };

export default function Illustration({ type, isAlt = false }) {
  const palette = useMemo(() => isAlt ? PALETTES.alt : PALETTES.default, [isAlt]);
  const Component = ILLUSTRATIONS[type];
  if (!Component) return null;
  return (
    <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
      <Component p={palette} />
    </div>
  );
}
