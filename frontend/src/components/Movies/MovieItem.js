import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card sx={{ width: 300, margin: 2, height: 520, borderRadius: 3, alignItems: 'center', ":hover": { boxShadow: "10px 10px 20px #ccc" } }}>
      <img height={'70%'} width='100%' src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontWeight={'400'}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={{ pathname: `/booking/${id}`, state: { movie: { title, id, releaseDate, posterUrl } } }} sx={{ margin: "auto" }} size="small">Book</Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
