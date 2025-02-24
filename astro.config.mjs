// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import stylex from 'astro-stylex';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.budgetwarden.com',
  integrations: [react(), stylex(), partytown(), sitemap({
    filter: (page) => page !== 'https://www.budgetwarden.com/admin/',
  })],
  prefetch: true,
  experimental: {
    svg: true,
  },
});