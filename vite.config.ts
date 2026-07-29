import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this site from https://jhonlima97.github.io/my-portfolio/,
// so every asset needs the repo name as prefix. Set `base` back to '/' if the
// site moves to a custom domain or to the jhonlima97.github.io repo.
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react(), tailwindcss()],
})
