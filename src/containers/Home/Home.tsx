/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
/* eslint-disable no-multi-str */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

import classes from './Home.module.scss';

import MovieMatrix from '../../components/MovieMatrix/MovieMatrix';

type Props = {
  title: string;
};

type APIMovie = {
  title: string;
  poster_path: string;
  overview: string;
};

type APIData = {
  results: Array<APIMovie>;
};

type cardData = {
  title: string;
  description: string;
  imageUrl: string;
};

const URL =
  'https://api.themoviedb.org/3/discover/movie?api_key=407ae8fcb9d00a80912893d280f427bb&language=en-US&sort_by=popularity.desc&certification=G&include_adult=false&include_video=false&page=1';

const imageURL = 'http://image.tmdb.org/t/p/w342/';

const baseState: Array<cardData> = [];

const Home = () => {
  const [movies, setMovies] = useState(baseState);

  const parseData = (data: APIData): Array<cardData> => {
    return data.results.map((movie) => {
      return {
        title: movie.title,
        description: movie.overview,
        imageUrl: imageURL + movie.poster_path,
      };
    });
  };

  const fetchData = async () => {
    const resp = await axios.get(URL);
    const test = parseData(resp.data);
    setMovies(test);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let movieCards: Array<JSX.Element> = [];

  if (movies.length > 0) {
    movieCards = movies.map(({ description, imageUrl, title }) => (
      <MovieMatrix.Card
        key={imageUrl}
        description={description}
        imageUrl={imageUrl}
        title={title}
      />
    ));
  }

  return (
    <div className={classes.main__container}>
      <MovieMatrix>
        {movieCards || 'loading'}
        {/* <MovieMatrix.Card title='holi' />
        <MovieMatrix.Card title='holi' /> */}
      </MovieMatrix>
    </div>
  );
};

export default Home;
