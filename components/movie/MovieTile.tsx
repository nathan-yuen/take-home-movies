
import { CardMedia, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import NextLink from 'next/link';
import React from 'react';

import Movie from '../../typings/Movie';

interface Props extends Movie {}

const transition = (prop: string) => `${prop} .3s ease-in-out`;

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
    position: 'relative',
    borderRadius: 8,
    transition: transition('all'),
    '&:hover': {
      transform: 'translateY(-5px)',
      '& $overlay': {
        background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0.1) 100%)'
      }
    },
    '&:active': {
      boxShadow: 'none',
      '& $title': {
        color: 'grey'
      }
    }
  },
  backdrop: {
    height: 200,
    width: '100%',
    borderRadius: 8
  },
  overlay: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    padding: 8,
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)',
    transition: transition('opacity'),
    borderRadius: 8
  },
  title: {
    color: 'white',
    transition: transition('color')
  }
});

export default function MovieTile(props: Props) {
  const classes = useStyles();
  
  const { slug } = props;

  return (
    <NextLink
      as={`/movies/${slug}`} href={'/movies/[slug]'}
      passHref
    >
      <Link>
        <Paper className={classNames(classes.root, 'movie-tile')} elevation={4}>
          <CardMedia
            className={classes.backdrop} image={props.backdrop}
            title={props.title}
          />
          <div className={classes.overlay}>
            <Typography className={classes.title} variant="h6">
              {props.title}
            </Typography>
          </div>
        </Paper>
      </Link>
    </NextLink>
  );
}
