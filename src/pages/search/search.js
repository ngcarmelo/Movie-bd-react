import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import MovieCatalog from "../../components/MovieCatalog";
import Footer from "../../components/Footer";
import { URL_API, API } from "../../utils/constants";

import "./search.scss";

function Search(props) {
  const { location, history } = props;
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      const searchValue = queryString.parseUrl(location.search);
      const { s } = searchValue.query;
      //console.log(location.search);
      //console.log(s);
      const response = await fetch(
        `${URL_API}/search/movie?api_key=${API}&language=en-US&query=${s}&page=1`
      );
      const movies = await response.json();
      //console.log(movies);
      setSearchValue(s);
      setMovieList(movies);
    })();
  }, [location.search]);

  const onChangeSearch = e => {
    const urlParams = queryString.parse(location.search); //get  params from url
    urlParams.s = e.target.value; //update params
    history.push(`?${queryString.stringify(urlParams)}`); //refresh url
    console.log(urlParams);
    setSearchValue(e.target.value); //update state
    //console.log(e.target.value);
  };

  https: return (
    <Row>
      <Col span={12} xs={20} sm={24} md={24} className="search">
        <h1>Find your movie</h1>
        <Input value={searchValue} onChange={onChangeSearch} />
      </Col>
      {movieList.results && (
        <Row>
          <Col span={24}>
            <MovieCatalog movies={movieList} />
          </Col>
        </Row>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
}

export default withRouter(Search);
