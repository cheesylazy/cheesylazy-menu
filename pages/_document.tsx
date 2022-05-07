import { Head, Html, Main, NextScript } from 'next/document'

export default function MyDocument() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
