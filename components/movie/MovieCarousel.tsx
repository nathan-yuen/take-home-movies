import { createStyles, Fade, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React from 'react';
import Carousel from 'react-multi-carousel';
import { ButtonGroupProps } from 'react-multi-carousel/lib/types';

import Movie from '../../typings/Movie';
import MovieTile from './MovieTile';

interface Props {
  title: string;
  movies: Movie[];
}

const responsive = {
  xl: {
    breakpoint: { max: 3000, min: 1921 },
    items: 4
  },
  lg: {
    breakpoint: { max: 1920, min: 1281 },
    items: 3
  },
  md: {
    breakpoint: { max: 1280, min: 961 },
    items: 3
  },
  sm: {
    breakpoint: { max: 960, min: 601 },
    items: 2
  },
  xs: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 10
  }
};

const buttonStyle: CSSProperties = {
  position: 'absolute',
  padding: 6,
  backgroundColor: 'rgba(0, 0, 0, .65)',
  '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(0, 0, 0, .85)' }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      padding: `${theme.spacing(2)}px 0`
    },
    item: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    left: {
      ...buttonStyle,
      left: 0
    },
    right: {
      ...buttonStyle,
      right: 0
    }
  })
);

const CarouselButtonGroup = ({ carouselState, next, previous }: ButtonGroupProps) => {
  const classes = useStyles();
  const { currentSlide, slidesToShow, totalItems } = carouselState;

  return (
    <>
      <Fade in={currentSlide > 0} timeout={500}>
        <IconButton
          aria-label="previous movie" className={classes.left}
          onClick={() => previous()}
        >
          <ChevronLeft />
        </IconButton>
      </Fade>
      <Fade in={slidesToShow + currentSlide < totalItems} timeout={500}>
        <IconButton
          aria-label="next movie" className={classes.right}
          onClick={() => next()}
        >
          <ChevronRight />
        </IconButton>
      </Fade>
    </>
  );
};

export default function MovieCarousel(props: Props) {
  const classes = useStyles();
  
  const { movies, title } = props;

  return (
    <>
      <Typography className="movie-carousel-title" variant="h4">{title}</Typography>
      <Carousel
        arrows={false}
        className={classes.carousel}
        customButtonGroup={<CarouselButtonGroup />}
        itemClass={classes.item}
        partialVisible
        removeArrowOnDeviceType={['mobile']}
        responsive={responsive}
        ssr
      >
        {movies.map((movie) => (
          <MovieTile key={movie.id} {...movie} />
        ))}
      </Carousel>
    </>
  );
}
