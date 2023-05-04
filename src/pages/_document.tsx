import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' data-theme='dark'>
      <Head />
      <body className='h-screen w-screen bg-base-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
