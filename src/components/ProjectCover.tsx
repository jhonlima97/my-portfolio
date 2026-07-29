import type { ReactNode } from 'react';
import type { ProjectCategory } from '../data/projectMeta';

interface ProjectCoverProps {
  nombre: string;
  /** Resolved, already-translated label (custom etiqueta or category default). */
  etiqueta?: string;
  categoria?: ProjectCategory;
  /** Real screenshot path; when present it replaces the generated cover. */
  imagen?: string;
  /** Manual initials override (projectMeta.iniciales), for collisions like PP/PP. */
  iniciales?: string;
}

/**
 * Palette of well-separated hues. Picking from a fixed list (instead of
 * hue % 360) keeps covers visually distinct — a raw hash clustered most
 * projects in the green/teal range.
 */
const HUES = [222, 265, 340, 18, 42, 190, 288, 130, 355, 205, 310, 70];

/** Deterministic hash: same repo name -> same palette slot, always. */
function hashIndex(name: string, buckets: number): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % buckets;
}

/** "monitoreo_pagos_uss" -> "MP" · "75_BIPAY" -> "75" · "sisunlock" -> "SI" */
function initials(name: string): string {
  const tokens = name.split(/[-_\s]+/).filter(Boolean);
  if (tokens.length === 0) return '?';
  if (/^\d{1,2}$/.test(tokens[0])) return tokens[0];
  if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
  return (tokens[0][0] + tokens[1][0]).toUpperCase();
}

const CATEGORY_ICONS: Record<ProjectCategory, ReactNode> = {
  web: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M3 12h18M12 3c2.3 2.4 3.6 5.6 3.6 9s-1.3 6.6-3.6 9c-2.3-2.4-3.6-5.6-3.6-9s1.3-6.6 3.6-9z" />
    </svg>
  ),
  api: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M8 7H7a4 4 0 000 8h1m8-8h1a4 4 0 010 8h-1" />
    </svg>
  ),
  service: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path strokeLinecap="round" d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  ),
  system: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9" rx="2" />
      <path strokeLinecap="round" d="M8.5 10.5V7.75a3.5 3.5 0 017 0v2.75M12 14.5v2" />
    </svg>
  ),
  mobile: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path strokeLinecap="round" d="M11 18h2" />
    </svg>
  ),
  data: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M7 20v-7m5 7V6m5 14v-10" />
    </svg>
  ),
};

/**
 * Generated card cover: deterministic gradient from the repo name, big
 * initials, category icon + label. Replaced by a real screenshot when
 * `imagen` is provided in projectMeta.ts.
 */
export default function ProjectCover({
  nombre,
  etiqueta,
  categoria,
  imagen,
  iniciales,
}: ProjectCoverProps) {
  if (imagen) {
    return (
      <img
        src={imagen}
        alt={nombre}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    );
  }

  const label = iniciales ?? initials(nombre);
  const hue = HUES[hashIndex(nombre, HUES.length)];
  const gradient = `linear-gradient(135deg, hsl(${hue} 58% 24%) 0%, hsl(${(hue + 35) % 360} 60% 42%) 100%)`;

  return (
    <div
      role="img"
      aria-label={etiqueta ? `${nombre} — ${etiqueta}` : nombre}
      className="relative w-full h-full flex items-center justify-center"
      style={{ background: gradient }}
    >
      <span
        className={`font-bold tracking-widest text-white/85 select-none px-4 text-center ${
          label.length > 4 ? 'text-3xl' : 'text-5xl'
        }`}
      >
        {label}
      </span>
      {categoria && (
        <span className="absolute top-3 left-3 text-white/70">{CATEGORY_ICONS[categoria]}</span>
      )}
      {etiqueta && (
        <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-xs font-medium text-white/75 whitespace-nowrap">
          {etiqueta}
        </span>
      )}
    </div>
  );
}
