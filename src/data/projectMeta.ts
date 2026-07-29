import type { Translations } from '../i18n/translations';

// 'web' | 'api' | 'service' | 'system' | 'mobile' — labels live in translations.
export type ProjectCategory = keyof Translations['projects']['categories'];

export interface ProjectMeta {
  /** Real project year. Overrides the GitHub repo created_at year. */
  anio?: number;
  /** Category: picks the cover icon and the default label. */
  categoria?: ProjectCategory;
  /** Custom label shown on the cover; overrides the category default. */
  etiqueta?: { en: string; es: string };
  /** Curated description; overrides the auto-generated one. */
  descripcion?: { en: string; es: string };
  /** Optional real screenshot in /public (e.g. '/projects/sisunlock.png'); overrides the generated cover. */
  imagen?: string;
  /** Manual initials for the cover; use to resolve collisions (portal-peru vs plataforma-psi). */
  iniciales?: string;
  /** Live deployment URL. Only set it when the project is actually published. */
  demo?: string;
}

/**
 * Curated metadata, keyed by repo name. Wins over src/data/github-repos.json
 */
export const PROJECT_META: Record<string, ProjectMeta> = {
  'plataforma-psi': {
    anio: 2024, // built at SUNARP
    categoria: 'web',
    iniciales: 'PR', // "Plataforma de Reportes" — avoids colliding with portal-peru's PP
    descripcion: {
      en: 'Web platform for registry title reports.',
      es: 'Plataforma web de reportes de títulos registrales.',
    },
  },
  sisunlock: {
    anio: 2024, // built at SUNARP; the GitHub repo was created later
    categoria: 'system',
    etiqueta: { en: 'Unlock system', es: 'Sistema de desbloqueo' },
    descripcion: {
      en: 'User unlock module for the registry systems.',
      es: 'Módulo de desbloqueo de usuarios de los sistemas registrales.',
    },
  },
  monitoreo_pagos_uss: {
    anio: 2026,
    categoria: 'web',
    descripcion: {
      en: 'Payment monitoring web application.',
      es: 'Aplicación web de monitoreo de pagos.',
    },
  },
  API_NAS: {
    anio: 2026,
    categoria: 'api',
    descripcion: {
      en: 'API that communicates with a local NAS server at USS.',
      es: 'API que se comunica con un servidor NAS local de la USS.',
    },
  },
  '75_BIPAY': {
    anio: 2026,
    categoria: 'service',
    iniciales: 'BIPAY', // the wallet name reads better than the repo prefix "75"
    etiqueta: { en: 'Payment gateway', es: 'Pasarela de pago' },
    descripcion: {
      en: "Payment gateway integrating Bitel's BIPAY at USS.",
      es: 'Pasarela de pagos que integra BIPAY de Bitel en la USS.',
    },
  },
  'portal-peru': {
    anio: 2025,
    categoria: 'web',
    descripcion: {
      en: "Web app to browse Peru's ministers and presidents from 2016 onwards. Personal project.",
      es: 'Aplicación web para ver los ministros y presidentes del Perú desde 2016 en adelante. Proyecto personal.',
    },
  },
  'landing-page': {
    anio: 2024,
    categoria: 'web',
    demo: 'https://discovery-lp.vercel.app/',
    descripcion: {
      en: 'Landing page built with Angular. Personal project.',
      es: 'Landing page construida con Angular. Proyecto personal.',
    },
  },
  'observatorio-violencia-grl': {
    anio: 2025,
    categoria: 'web',
    demo: 'https://observatorioviolencia.regionlambayeque.gob.pe/',
    descripcion: {
      en: 'Institutional portal on violence against women.',
      es: 'Portal institucional sobre la violencia contra la mujer.',
    },
  },
  'chat-whatsapp-novia': {
    anio: 2024,
    categoria: 'data', // Streamlit dashboard (Jupyter + Python), not a web app
    demo: 'https://jhonygaby.streamlit.app/',
    descripcion: {
      en: 'Personal project on data analysis.',
      es: 'Proyecto personal sobre análisis de datos.',
    },
  },
  sisco: {
    anio: 2023,
    categoria: 'system',
    etiqueta: { en: 'Inventory system', es: 'Sistema de inventario' },
    descripcion: {
      en: 'Inventory management system.',
      es: 'Sistema de gestión de inventario.',
    },
  },
  BuscadorJS: { anio: 2023 },
};
