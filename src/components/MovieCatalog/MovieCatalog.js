import React from "react";
import { Col, Card, Icon } from "antd";
import { Link } from "react-router-dom";

import "./MovieCatalog.scss";

export default function MovieCatalog(props) {
  const {
    movies: { results }
  } = props;

  return results.map(movie => (
    <Col key={movie.id} xs={24} sm={12} md={8} lg={4} className="movie-catalog">
      <MovieCard movie={movie} />
    </Col>
  ));
}

function MovieCard(props) {
  const {
    movie: { id, title, poster_path }
  } = props;
  const { Meta } = Card; // ant design
  const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;

  //console.log(movie);

  return (
    <Link to={`/movie/${id}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={title} src={posterPath} />}
        actions={[<Icon type="eye" key="eye" />]}
      >
        <Meta title={title} />
      </Card>
    </Link>
  );
}
