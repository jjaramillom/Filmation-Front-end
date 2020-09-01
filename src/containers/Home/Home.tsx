/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
/* eslint-disable no-multi-str */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import classes from './Home.module.scss';
import { APIKey, genresMap } from '../../temp/common';

import MoreInfo from '../../components/MovieMatrix/MoreInfo/MoreInfo';
import MovieMatrix from '../../components/MovieMatrix/MovieMatrix';
import FilterBar from '../../components/MovieMatrix/FilterBar/FilterBar';

type APIMovie = {
  title: string;
  poster_path: string;
  overview: string;
  id: number;
  genre_ids: Array<Number>;
  release_date: string;
};

type APIData = {
  results: Array<APIMovie>;
};

type MovieData = {
  title: string;
  description: string;
  imageUrl: string;
  id: number;
  genres: Array<string>;
  date: string;
  director?: string;
  cast?: Array<string>;
};

const ACTORS_NUMBER = 3;

const baseURL = 'https://api.themoviedb.org/3';
const imageURL = 'http://image.tmdb.org/t/p/w342/';

const discoverURL = `${baseURL}/discover/movie?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&certification=G&include_adult=false&include_video=false&page=`;

const baseState: Array<MovieData> = [];

const Home = () => {
  const [movies, setMovies] = useState(baseState);
  const [extraID, setExtraID] = useState(0);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const parseData = (data: APIData): Array<MovieData> => {
    return data.results.map((movie) => {
      const genres = movie.genre_ids.map((genre) => {
        const genreName = genresMap.find((genreCode) => genreCode.id === genre);
        if (genreName !== undefined) {
          return genreName.name;
        }
        return '';
      });
      return {
        title: movie.title,
        description: movie.overview,
        imageUrl: imageURL + movie.poster_path,
        id: movie.id,
        genres,
        date: movie.release_date,
      };
    });
  };

  const fetchMovies = async () => {
    const res = await axios.get(discoverURL + page);
    console.log(res.data);
    if (page === 1) {
      setMaxPage(res.data.total_pages);
    }
    setMovies([...movies, ...parseData(res.data)]);
    setPage(page + 1);
  };

  const fetchCredits = async (id: number) => {
    const selectedMovie = movies.find((movie) => movie.id === id);
    if (selectedMovie && !selectedMovie.director) {
      const res = await axios.get(`${baseURL}/movie/${id}/credits?api_key=${APIKey}`);
      selectedMovie.director = res.data.crew.find(
        (person: any) => person.job === 'Director'
      ).name;
      selectedMovie.cast = res.data.cast
        .slice(0, ACTORS_NUMBER)
        .map((person: any) => person.name);
      setMovies([...movies]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  let movieCards: Array<JSX.Element> = [];

  if (movies.length > 0) {
    movieCards = movies.map(({ genres, imageUrl, title, id, date }) => (
      <MovieMatrix.Card
        key={id}
        // description={description}
        imageUrl={imageUrl}
        title={title}
        date={date}
        genres={genres}
        onSelected={() => setExtraID(id)}
      />
    ));
  }

  let selectedMovie: MovieData | undefined;
  let moreInfo: JSX.Element | null = null;
  const loader = (
    <div key={1234554321} className={classes.loader}>
      Loading...
    </div>
  );

  if (extraID !== 0) {
    selectedMovie = movies.find((movie) => movie.id === extraID);
  }

  if (selectedMovie !== undefined) {
    fetchCredits(extraID);
    moreInfo = (
      <MoreInfo
        onClose={() => setExtraID(0)}
        show={selectedMovie !== undefined}
        title={selectedMovie.title}
        body={selectedMovie.description}
        genres={selectedMovie.genres}
        director={selectedMovie.director}
        cast={selectedMovie.cast}
      />
    );
  }

  return (
    <>
      {moreInfo}
      <div className={classes.main__container}>
        <FilterBar onSortBy={() => {}} />
        <InfiniteScroll
          hasMore={page < maxPage}
          pageStart={0}
          loadMore={fetchMovies}
          loader={loader}>
          <MovieMatrix>{movieCards || 'loading'}</MovieMatrix>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
