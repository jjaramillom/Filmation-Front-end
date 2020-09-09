/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import SortBy from './SortBy/SortBy';

import classes from './FilterBar.module.scss';

type Props = {
  onSortBy: Function;
};

const FilterBar = ({ onSortBy }: Props) => {
  return (
    <div className={classes.main}>
      <SortBy onSortBy={onSortBy} />
    </div>
  );
};

export default FilterBar;
