/* eslint-disable arrow-body-style */
import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
};

const MovieCard = ({ title, description, imageUrl }: Props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant='primary'>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
