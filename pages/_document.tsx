import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { DocumentContext,Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import theme from '../styles/theme';

// Based on example 
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs

export default class ExtendedDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta content={theme.palette.primary.main} name="theme-color" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

ExtendedDocument.getInitialProps = async (context: DocumentContext) => {
  const sheets = new ServerStyleSheets();

  const originalRenderPage = context.renderPage;
  context.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(context);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  };
};
