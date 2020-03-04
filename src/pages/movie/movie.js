import React, { useState } from "react";
import { Row, Col, Button } from "antd"; // components from ant design
import { useParams } from "react-router-dom"; //params from url
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { URL_API, API } from "../../utils/constants";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";

import "./movie.scss";

export default function Movie() {
  console.log();
  //const params = useParams();
  const { id } = useParams();
  // console.log(id);
  const detail = useFetch(
    `${URL_API}/movie/${id}?api_key=${API}&language=en-US`
  );
  //console.log(detail);

  if (detail.loading || !detail.result) {
    return <Loading />;
  }

  return <RenderMovie movie={detail.result} />;
}

function RenderMovie(props) {
  const {
    movie: { backdrop_path, poster_path }
  } = props;

  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col span={8} md={8} xs={0} offset={3} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>
        <Col span={10} md={10} xs={24} className="movie__info">
          <MovieInfo movie={props.movie} />
        </Col>
      </Row>
    </div>
  );
}

function PosterMovie(props) {
  const { image } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;

  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
}

function MovieInfo(props) {
  const {
    movie: { id, title, release_date, overview, genres }
  } = props;

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${API}&language=en-US`
  );

  const openModal = () => setIsVisibleModal(true);
  const closeModal = () => setIsVisibleModal(false);

  const renderVideo = () => {
    if (videoMovie.result) {
      if (videoMovie.result.results.length > 0) {
        return (
          <>
            <Button icon="play-circle" onClick={openModal}>
              See Trailer
            </Button>
            <ModalVideo
              videoKey={videoMovie.result.results[0].key}
              videoPlatform={videoMovie.result.results[0].site}
              isOpen={isVisibleModal}
              close={closeModal}
            />
          </>
        );
      }
    }
  };

  return (
    <>
      {" "}
      <div className="movie__info-header">
        <h1>
          {title}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        {renderVideo()}
      </div>{" "}
      <div className="movie__info-content">
        <h3>General</h3>
        <p>{overview}</p>
        <h3>Categories</h3>
        <ul>
          {genres.map(gender => (
            <li key={gender.id}>{gender.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
