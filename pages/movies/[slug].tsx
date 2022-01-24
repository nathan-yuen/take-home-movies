import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { getMovie } from '../../api';
import MovieDetails from '../../components/movie/MovieDetails';
import Movie from '../../typings/Movie';

interface Props {
  movie: Movie;
}

export default function MoviePage(props: Props) {
  const { movie } = props;

  return <MovieDetails {...movie} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const { slug } = params;

  const res = await getMovie(slug.toString());
  const movie = await res.json();

  return {
    props: {
      movie
    }
  };
}
