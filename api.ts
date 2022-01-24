import fetch from 'node-fetch';

const BASE_URL = 'https://wookie.codesubmit.io';

const BASE_HEADER = {
  Authorization: 'Bearer Wookie2019'
};

const baseFetch = (method: string, path: string) => {
  return fetch(`${BASE_URL}${path}`, {
    method,
    headers: BASE_HEADER
  });
};

export const getMovies = () => baseFetch('GET', '/movies');

export const getMovie = (slug: string) => baseFetch('GET', `/movies/${slug}`);

export const searchMovie = (query: string) => baseFetch('GET', `/movies?q=${encodeURIComponent(query)}`);
