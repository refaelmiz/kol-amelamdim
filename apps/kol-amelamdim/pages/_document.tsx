import { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from 'next-i18next';

export default function Document() {
  return (
    <Html dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
      <Head>
        <meta name="keywords" content="כל המלמדים, שיתוף חומרי לימוד, פרשת השבוע" />
        <title>כל המלמדים</title>
        <meta name="google-site-verification" content="ki8Gg9GvsjUxnQNDTwhUrwLDzrusa-VOV7xhZokAl-8" />
        <meta name="google-site-verification" content="LCJQP47TTBWdztLzlDfd8-H9TNeCOfc_yICK3LVNWRU" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
