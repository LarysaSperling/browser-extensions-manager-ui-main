import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — відносні шляхи у збірці, щоб сайт працював і на GitHub Pages
// (де адреса має вигляд username.github.io/назва-репозиторію/).
export default defineConfig({
  plugins: [react()],
  base: './',
});
