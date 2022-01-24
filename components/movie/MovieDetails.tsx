import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';

import Movie from '../../typings/Movie';

interface Props extends Movie {}

const useStyles = makeStyles((theme: Theme) => ({
  poster: {
    display: 'block',
    width: '100%',
    boxShadow: theme.shadows[6]
  },
  section: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      marginBottom: theme.spacing(2)
    }
  },
  ratingValue: {
    marginLeft: 5
  },
  metaDivider: {  
    fontSize: '1.2em',
    fontWeight: 'bold',
    padding: `0 ${theme.spacing(1.5)}px`
  }
}));

export default function MovieDetails(props: Props) {
  const classes = useStyles();

  const { cast, director, imdb_rating, length, overview, poster, released_on, title } = props;

  const year = new Date(released_on).getFullYear();

  const directorToDisplay = Array.isArray(director) ? director.join(', ') : director;

  const ratingValue = (imdb_rating / 10) * 5; // Scale down to 5 stars rating

  const castToDisplay = cast ? cast.join(', ') : '';

  return (
    <Grid container justify="space-between" spacing={2}>
      <Grid
        container item justify="center"
        md={3} sm={4} xs={12}
      >
        <img alt={title} className={classes.poster} src={poster} />        
      </Grid>
      <Grid
        container item 
        md={9} sm={8} xs={12}
      >
        <Grid container justify="space-between" spacing={1}>
          <Grid
            alignContent="center" alignItems="center"
            className={classes.section} container item
            sm={8} xs={12}
          >
            <Typography className="movie-detail-title" variant="h4">{title}</Typography>
          </Grid>
          <Grid
            alignContent="center" alignItems="center" className={classes.section}
            container item justify="flex-end"
            sm={4} xs={12}
          >
            <Rating precision={0.1} readOnly value={ratingValue} />
            <span className={classes.ratingValue}>{ratingValue.toFixed(1)}</span>
          </Grid>
        </Grid>
        <Grid className={classes.section} item xs={12}>
          <span className="movie-detail-year">{year}</span>
          <span className={classes.metaDivider}>|</span>
          <span className="movie-detail-length">{length}</span>
          <span className={classes.metaDivider}>|</span>
          <span className="movie-detail-director">{directorToDisplay}</span>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Cast</Typography>
          <p className="movie-detail-cast">{castToDisplay}</p>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Overview</Typography>
          <p className="movie-detail-overview">{overview}</p>
        </Grid>
      </Grid>
    </Grid>
  );
}
