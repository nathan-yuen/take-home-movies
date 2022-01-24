import React from 'react';

import { getMovies } from '../api';
import MovieCarouselList from '../components/movie/MovieCarouselList';
import Movie from '../typings/Movie';

interface Props {
  movies: Movie[];
}

export default function HomePage(props: Props) {
  return <MovieCarouselList movies={props.movies} />;
}

export async function getServerSideProps() {
  const res = await getMovies();
  const data = await res.json();

  return {
    props: {
      movies: data ? data.movies : []
    }
  };
}
