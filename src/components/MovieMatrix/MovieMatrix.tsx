import React from 'react';

import MovieCard from './MovieCard/MovieCard';

import classes from './MovieMatrix.module.scss';

interface Props {}

const MovieMatrix = ({ children }: React.PropsWithChildren<Props>) => {
  return (
    <div style={{ gridTemplateColumns: 'repeat(auto-fit, 20rem)' }} className={classes.matrix}>
      {children}
    </div>
  );
};

MovieMatrix.Card = MovieCard;

export default MovieMatrix;
