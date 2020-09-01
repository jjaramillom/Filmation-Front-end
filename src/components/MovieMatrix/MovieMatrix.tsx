import React from 'react';

import MovieCard from './MovieCard/MovieCard';

import classes from './MovieMatrix.module.scss';

interface Props {}

const MovieMatrix = ({ children }: React.PropsWithChildren<Props>) => (
  <div className={classes.matrix}>{children}</div>
);

MovieMatrix.Card = MovieCard;

export default MovieMatrix;
