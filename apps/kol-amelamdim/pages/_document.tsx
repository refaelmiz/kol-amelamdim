import { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from 'next-i18next';

export default function Document() {
  return (
    <Html dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
