// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import stylex from 'astro-stylex';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    stylex(),
  ],
  experimental: {
    svg: true,
  },
});