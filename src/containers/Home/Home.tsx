/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
/* eslint-disable no-multi-str */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import axiosMovies from '../../services/axios';

import classes from './Home.module.scss';
import { APIKey, genresMap } from '../../temp/common';
import noCoverImage from '../../assets/images/nocover.jpg';

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

type Credits = {
  director: string;
  cast: Array<string>;
};

type SortSelection = {
  sortBy: string;
  sortOrd: string;
};

const ACTORS_NUMBER = 3;
const SORT_BY_DEF = 'popularity.desc';
const imageURL = 'http://image.tmdb.org/t/p/w342/';

const Home = () => {
  // eslint-disable-next-line no-array-constructor
  const [movies, setMovies] = useState(new Array<MovieData>());
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [sortBy, setSortBy] = useState(SORT_BY_DEF);
  const [loading, setLoading] = useState(false);

  const parseMoviesData = (data: APIData): Array<MovieData> => {
    return data.results.map((movie) => {
      const genres = movie.genre_ids.map((genre) => {
        const genreName = genresMap.find((genreCode) => genreCode.id === genre);
        if (genreName !== undefined) {
          return genreName.name;
        }
        return '';
      });
      const posterUrl = movie.poster_path ? imageURL + movie.poster_path : noCoverImage;
      return {
        title: movie.title,
        description: movie.overview,
        imageUrl: posterUrl,
        id: movie.id,
        genres,
        date: movie.release_date,
      };
    });
  };

  const fetchMovies = async (pageNum: number): Promise<Array<MovieData>> => {
    const res = await axiosMovies.get(
      `discover/movie?api_key=${APIKey}&language=en-US&sort_by=${sortBy}&page=${pageNum}`
    );
    if (page === 1) {
      setMaxPage(res.data.total_pages);
    }

    return parseMoviesData(res.data);
  };

  const fetchCredits = async (id: number): Promise<Credits> => {
    const res = await axiosMovies.get(`/movie/${id}/credits?api_key=${APIKey}`);
    const director =
      res.data.crew.find((person: any) => person.job === 'Director')?.name || 'no Information';
    const cast = res.data.cast.slice(0, ACTORS_NUMBER).map((person: any) => person.name);
    return { director, cast: cast.length > 0 ? cast : ['no Information'] };
  };

  const addCreditsToSelectedMovie = async (): Promise<void> => {
    const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
    if (selectedMovie && (!selectedMovie.director || !selectedMovie.cast)) {
      const { cast, director } = await fetchCredits(selectedMovieId);
      selectedMovie.director = director;
      selectedMovie.cast = cast || 'no Information';
      setMovies([...movies]);
    }
  };

  const onUpdateSortBy = ({ sortBy: _sortBy, sortOrd }: SortSelection) => {
    const newSortBy = `${_sortBy}.${sortOrd}`;
    if (sortBy !== newSortBy) {
      setSortBy(newSortBy);
    }
  };

  const loadMoreMovies = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const newMovies = await fetchMovies(page + 1);
    setPage(page + 1);
    setMovies([...movies, ...newMovies]);
    setLoading(false);
  };

  useEffect(() => {
    const updateMovies = async () => {
      setLoading(true);
      const newMovies = await fetchMovies(1);
      setPage(1);
      setMovies(newMovies);
      setLoading(false);
    };
    updateMovies();
  }, [sortBy]);

  let movieCards: Array<JSX.Element> = [];

  if (movies.length > 0) {
    movieCards = movies.map(({ genres, imageUrl, title, id, date }) => (
      <MovieMatrix.Card
        key={id}
        imageUrl={imageUrl}
        title={title}
        date={date}
        genres={genres}
        onSelected={() => setSelectedMovieId(id)}
      />
    ));
  }

  // Component to show while loading more items to the grid
  const loader = (
    <div key={1234554321} className={classes.loader}>
      Loading...
    </div>
  );

  let selectedMovie: MovieData | undefined;
  if (selectedMovieId !== 0) {
    selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
  }

  let moreInfo: JSX.Element | null = null;
  if (selectedMovie !== undefined) {
    addCreditsToSelectedMovie();

    moreInfo = (
      <MoreInfo
        onClose={() => setSelectedMovieId(0)}
        show={selectedMovie !== undefined}
        title={selectedMovie.title}
        body={selectedMovie.description}
        genres={selectedMovie.genres}
        director={selectedMovie.director}
        cast={selectedMovie.cast}
      />
    );
  }
  let movieComponents: JSX.Element | null = null;
  if (movies.length > 0) {
    movieComponents = (
      <div className={classes.main__container}>
        <FilterBar onSortBy={onUpdateSortBy} />
        <InfiniteScroll
          hasMore={page < maxPage}
          pageStart={0}
          loadMore={async () => loadMoreMovies()}
          loader={loader}>
          <MovieMatrix>{movieCards || 'loading'}</MovieMatrix>
        </InfiniteScroll>
      </div>
    );
  }

  return (
    <>
      {moreInfo}
      {movieComponents}
    </>
  );
};

export default Home;
