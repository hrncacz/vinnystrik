import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' data-theme='coffee'>
      <Head />
      <body className='h-screen w-screen bg-secondary-content'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
