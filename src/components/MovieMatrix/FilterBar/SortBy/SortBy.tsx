/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import {
  FaSortAlphaDownAlt,
  FaSortAlphaDown,
  FaSortAmountDownAlt,
  FaSortAmountDown,
  FaSortNumericDownAlt,
  FaSortNumericDown,
} from 'react-icons/fa';

import classes from './SortBy.module.scss';

type Props = {
  onSortBy: Function;
  defaultSortBy?: Options;
  defaultSortOrder?: SortingOrder;
};

enum SortingOrder {
  asc = 'asc',
  desc = 'desc',
}

enum Options {
  popularity = 'popularity',
  release_date = 'release_date',
  revenue = 'revenue',
  original_title = 'original_title',
  vote_average = 'vote_average',
  vote_count = 'vote_count',
}

const ICON_SIZE = '1.15em';

const OPTIONS_MAP = {
  [Options.popularity]: {
    asc_icon: <FaSortAmountDownAlt size={ICON_SIZE} />,
    dsc_icon: <FaSortAmountDown size={ICON_SIZE} />,
    text: 'Popularity',
    default_ord: SortingOrder.desc,
  },
  [Options.release_date]: {
    asc_icon: <FaSortNumericDown size={ICON_SIZE} />,
    dsc_icon: <FaSortNumericDownAlt size={ICON_SIZE} />,
    text: 'Release Date',
    default_ord: SortingOrder.desc,
  },
  [Options.revenue]: {
    asc_icon: <FaSortNumericDown size={ICON_SIZE} />,
    dsc_icon: <FaSortNumericDownAlt size={ICON_SIZE} />,
    text: 'Revenue',
    default_ord: SortingOrder.desc,
  },
  [Options.original_title]: {
    asc_icon: <FaSortAlphaDown size={ICON_SIZE} />,
    dsc_icon: <FaSortAlphaDownAlt size={ICON_SIZE} />,
    text: 'Original title',
    default_ord: SortingOrder.asc,
  },
  [Options.vote_average]: {
    asc_icon: <FaSortNumericDown size={ICON_SIZE} />,
    dsc_icon: <FaSortNumericDownAlt size={ICON_SIZE} />,
    text: 'Average rating',
    default_ord: SortingOrder.desc,
  },
  [Options.vote_count]: {
    asc_icon: <FaSortNumericDown size={ICON_SIZE} />,
    dsc_icon: <FaSortNumericDownAlt size={ICON_SIZE} />,
    text: 'Number of votes',
    default_ord: SortingOrder.desc,
  },
};

const FilterBar = ({
  onSortBy,
  defaultSortBy = Options.popularity,
  defaultSortOrder = SortingOrder.desc,
}: Props) => {
  const [sortBy, setSortBy] = useState(Options[defaultSortBy]);
  const [sortOrd, setSortOrd] = useState(SortingOrder[defaultSortOrder]);

  const options = Object.keys(OPTIONS_MAP).map((optionKey) => {
    return (
      <option key={optionKey} value={optionKey}>
        {(OPTIONS_MAP as any)[optionKey].text}
      </option>
    );
  });

  const onChangeOrder = () => {
    setSortOrd(sortOrd === SortingOrder.desc ? SortingOrder.asc : SortingOrder.desc);
  };

  const onChangeSelect = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(evt.target.value as any);
    setSortOrd(OPTIONS_MAP[Options[evt.target.value as Options]].default_ord);
  };

  const sortButtonClasses = ['shadow-none ml-2', classes['sort-button']].join(' ');

  return (
    <>
      <InputGroup className={classes.input}>
        <InputGroup.Prepend>
          <InputGroup.Text>Sort by</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className='shadow-none'
          value={sortBy}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChangeSelect(evt)}
          as='select'>
          {options}
        </FormControl>
        <InputGroup.Append>
          <Button variant='info' className='shadow-none' onClick={onChangeOrder}>
            {sortOrd === SortingOrder.asc
              ? OPTIONS_MAP[sortBy].asc_icon
              : OPTIONS_MAP[sortBy].dsc_icon}
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Button
        variant='info'
        className={sortButtonClasses}
        onClick={() => onSortBy({ sortBy, sortOrd })}>
        Sort
      </Button>
    </>
  );
};

export default FilterBar;
