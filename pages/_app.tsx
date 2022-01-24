import 'react-multi-carousel/lib/styles.css';

import { Container, Fade, LinearProgress, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import AppBar from '../components/navigation/AppBar';
import theme from '../styles/theme';

interface Props {
  Component: React.ElementType;
  pageProps: object;
}

const useStyles = makeStyles({
  progressBar: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    left: 0
  }
});

export default function App(props: Props) {
  const classes = useStyles();

  const router = useRouter();

  const { Component, pageProps } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Add listeners for detecting route changes
    const handleRouteStart = () => setLoading(true);
    const handleRouteEnd = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteEnd);
    router.events.on('routeChangeError', handleRouteEnd);

    // Unmount events
    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteEnd);
      router.events.off('routeChangeError', handleRouteEnd);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Wookie Movies</title>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Container maxWidth="lg" style={{ paddingTop: 20 }}>
          <Component {...pageProps} />          
        </Container>
        <Fade
          in={loading} mountOnEnter
          unmountOnExit
        >
          <LinearProgress className={classes.progressBar} color="secondary" />
        </Fade>
      </ThemeProvider>
    </>
  );
}
