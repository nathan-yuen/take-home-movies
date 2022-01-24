import { makeStyles, Theme,Typography } from '@material-ui/core';
import { LocalPlay } from '@material-ui/icons';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { searchMovie } from '../api';
import Empty from '../components/core/Empty';
import MovieGrid from '../components/movie/MovieGrid';
import Movie from '../typings/Movie';

interface Props {
  movies: Movie[];
  query: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.spacing(2)
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '60vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyIcon: {
    fontSize: '10em'
  }
}));

export default function SearchPage(props: Props) {
  const classes = useStyles();
  
  const { movies, query } = props;

  const hasResult = movies.length > 0;

  if (hasResult) {
    return (
      <>
        <Typography className={classes.title} variant="h5">
          Search results for <b>'{query}'</b>
        </Typography>
        <MovieGrid movies={movies} />
      </>
    );
  } else {
    return (
      <Empty Icon={LocalPlay} message="No results found" />
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { q } = query;

  const res = await searchMovie(q.toString());
  const data = await res.json();

  return {
    props: {
      movies: data ? data.movies : [],
      query: q
    }
  };
}
