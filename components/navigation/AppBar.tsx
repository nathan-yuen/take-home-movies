import {
  AppBar,
  createStyles,
  Link,
  makeStyles,
  Slide,
  Theme,
  Toolbar,
  Typography,
  useScrollTrigger
} from '@material-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import SearchInput from './SearchInput';

interface HideOnScrollProps {
  window?: () => Window;
  children: JSX.Element;
}

const HideOnScroll = (props: HideOnScrollProps) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide
      appear={false} direction="down"
      in={!trigger}
    >
      {children}
    </Slide>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1,
      cursor: 'pointer'      
    },
    titleLink: {      
      transition: 'color .3s ease-in-out',
      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.secondary.light
      }
    }
  })
);

interface Props {}

export default function ExtendedAppBar(props: Props) {
  const classes = useStyles();

  const router = useRouter();
  const { pathname, query } = router;
  
  const [searchInput, setSearchInput] = useState('');

  const onSearchChange = (value: string) => setSearchInput(value);

  const onSearchSubmit = (value: string) => router.push(`/search?q=${encodeURIComponent(value)}`);

  const onSearchClear = () => setSearchInput('');

  // Sync searchInput with route query
  useEffect(() => {
    if (pathname === '/search' && query && query.q) {
      setSearchInput(query.q.toString());
    } else {
      setSearchInput('');
    }
  }, [query]);

  return (
    <HideOnScroll {...props}>
      <AppBar className={classes.root} position="sticky">
        <Toolbar>
          <Typography
            className={classes.title} color="inherit"
            id="app-title" variant="h6"
          >
            <NextLink href="/" passHref>
              <Link className={classes.titleLink} color="textPrimary">Wookie Movies</Link>
            </NextLink>
          </Typography>
          <SearchInput
            onSearchChange={onSearchChange}
            onSearchClear={onSearchClear}
            onSearchSubmit={onSearchSubmit}
            value={searchInput}
          />
        </Toolbar>
      </AppBar>
    </HideOnScroll>      
  );
}
