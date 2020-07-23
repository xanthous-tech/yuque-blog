import React from 'react';
import { AppProps } from 'next/app';

import 'highlight.js/styles/vs2015.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
