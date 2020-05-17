import React from 'react';
import { AppProps } from 'next/app';
import { Head } from 'next/document';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
