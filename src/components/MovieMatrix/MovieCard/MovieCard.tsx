/* eslint-disable arrow-body-style */
import React from 'react';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import classes from './MovieCard.module.scss';

type Props = {
  onSelected: Function;
  title: string;
  imageUrl: string;
  date: string;
  genres: Array<string>;
};

const MovieCard = ({ onSelected, title, imageUrl, date, genres }: Props) => {
  const genreBadges = genres.map((genre) => (
    <Badge key={genre} pill variant='primary'>
      {genre}
    </Badge>
  ));

  return (
    <>
      <Card onClick={() => onSelected()} className={classes.card}>
        <Card.Img variant='top' src={imageUrl} />
        {/* <Card.Header className={classes.title}> */}
        {/* </Card.Header> */}
        <Card.Body>
          <div className={classes.card_body}>
            <div>
              <p className={classes.title}>{title}</p>
              <div className={classes.date_text}>{date}</div>
            </div>
            {/* <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{title}</Card.Subtitle>
          <Card.Text className={classes.description}>{description}</Card.Text>
          <Button variant='primary' block onClick={() => onSelected()}>
            More information
          </Button> */}
            <div className={classes.badges_container}>{genreBadges}</div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default MovieCard;
