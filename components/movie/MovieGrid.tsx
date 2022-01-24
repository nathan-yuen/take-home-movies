import { Grid, makeStyles, Theme } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import React from 'react';

import Movie from '../../typings/Movie';
import MovieTile from './MovieTile';

interface Props {
  movies: Movie[];
  width: string
}

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    [theme.breakpoints.only('xs')]: {
      marginBottom: theme.spacing(2)
    }
  }
}));

function MovieGrid(props: Props): JSX.Element {
  const classes = useStyles();

  const { movies, width } = props;
  const spacing = width === 'xs' ? 0 : 2;

  return (
    <Grid container spacing={spacing}>
      {movies.map((movie) => (
        <Grid
          className={classes.item} item
          key={movie.id} md={4}
          sm={6} xs={12}
        >
          <MovieTile {...movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default withWidth()(MovieGrid);
