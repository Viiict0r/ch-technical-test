import React, { useCallback } from 'react';
import { Row, Col, Spin } from 'antd';
import MovieCard from '../MovieCard';

import './styles.less';

function Diverse({ data, loading }) {
  const buildCards = useCallback(() => {
    return data?.map(movie => {
      return (
        <Col span={4} key={movie.id}>
          <MovieCard
            title={movie.attributes.canonicalTitle}
            poster={movie.attributes.posterImage.medium}
            rating={movie.attributes.averageRating}
            ranking={movie.attributes.popularityRank}
          />
        </Col>
      );
    });
  }, [data]);

  return (
    <div className="diverse">
      <h2>Animes diversos</h2>
      <div className="diverse__movies">
        <Row gutter={[16, 16]}>{buildCards()}</Row>
      </div>
      {loading && (
        <div className="diverse__loading">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default Diverse;
