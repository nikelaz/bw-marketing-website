// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import stylex from 'astro-stylex';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.budgetwarden.com',
  redirects: {
    '/legal/privacy-policies/mobile-app': {
      status: 301,
      destination: '/legal/privacy-policies/app',
    },
  },
  integrations: [react(), stylex(), sitemap({
    filter: (page) => page !== 'https://www.budgetwarden.com/admin/',
  })],
  prefetch: true,
  output: 'static',
});
