/* eslint-disable arrow-body-style */
import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

import classes from './MoreInfo.module.scss';

type Props = {
  show: boolean;
  onClose: Function;
  title: string;
  body: string;
  genres: Array<string>;
  director?: string;
  cast?: Array<string>;
};

const MoreInfo = ({ show, title, body, onClose, genres, director, cast }: Props) => {
  const [showInfo, setShowInfo] = useState(show);

  const onCloseHandler = () => {
    onClose();
    setShowInfo(false);
  };

  const genreBadges = genres.map((genre) => (
    <Badge key={genre} pill variant='primary'>
      {genre}
    </Badge>
  ));

  return (
    <Modal centered show={showInfo} onHide={onCloseHandler}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
        <div className={classes.director}>
          <strong>Director</strong> {director}
        </div>
        <div className={classes.cast}>
          <strong>Cast</strong> {cast?.join(' | ')}
        </div>
      </Modal.Body>
      <Modal.Footer> {genreBadges}</Modal.Footer>
    </Modal>
  );
};

export default MoreInfo;
