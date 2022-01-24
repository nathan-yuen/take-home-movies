import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import Movie from '../../typings/Movie';
import MovieCarousel from './MovieCarousel';

interface Props {
  movies: Movie[];
}

const compareByTitle = (a: Movie, b: Movie) => a.title.localeCompare(b.title);

export default function MovieCarouselList(props: Props) {
  const { movies } = props;

  // Build a mapping of (id -> movie) for quick access 
  const moviesById = new Map<string, Movie>(movies.map((m: Movie) => [m.id, m]));
  
  // Group movie ids by genre. Could use loadash's `groupBy`, but opted for simplicity 
  const idsByGenre = new Map<string, string[]>();
  movies.forEach((m: Movie) => {
    const { genres, id } = m;
    genres.forEach((g) => {
      if (!idsByGenre.has(g)) {
        idsByGenre.set(g, []);
      }
      idsByGenre.get(g).push(id);
    });
  });

  // Sort genres by name
  const sortedGenres = Array.from(idsByGenre.keys());
  sortedGenres.sort();

  // Render carousel for each genre
  const items = sortedGenres.map((genre) => {
    // Retrive movies by ids
    const movies = idsByGenre.get(genre).map((id) => moviesById.get(id));    
    // Sort movies by title
    movies.sort(compareByTitle);

    return (
      <MovieCarousel
        key={genre} movies={movies}
        title={genre}
      />
    );
  });

  return <Box>{items}</Box>;
}
