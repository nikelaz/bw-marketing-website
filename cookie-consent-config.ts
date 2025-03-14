import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom left',
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    analytics: {
      services: {
        ga4: {
          label: '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics</a>',
          onAccept: () => {
            dataLayer.push({event: 'init_gtag'});
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
        hotjar: {
          label: 'Hotjar',
          onAccept: () => {
            dataLayer.push({event: 'init_hotjar'});
          }
        },
      },
    },
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "Cookies",
          description: 'We use cookies for analytics to track usage and improve our website.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer:
            '<a href="/legal/privacy-policies/mobile-app">Privacy Policy</a>',
        },
        preferencesModal: {
          title: 'Consent Preferences Center',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie Usage',
              description: 'We use only analytics cookies for a few services which you can turn off below. This website does not have any functional cookies.',
            },
            {
              title: 'Analytics Cookies',
              linkedCategory: 'analytics',
            },
            {
              title: 'More information',
              description:
                'For any query in relation to the policy on cookies and your choices, please <a class="cc__link" href="mailto:nikola.n.lazarov@outlook.copm">contact us</a>.',
            },
          ],
        },
      },
    },
  },
};
