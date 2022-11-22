const path = require('path');

/**
 * @type {import('next-i18next').UserConfig}
 **/

const i18nConfig = {
  i18n: {
    localePath: path.resolve('./apps/kol-amelamdim/public/locales'),
    locales: ['he', 'en'],
    defaultLocale: 'he',
    localeDetection: false,
  },
};
module.exports = i18nConfig;
