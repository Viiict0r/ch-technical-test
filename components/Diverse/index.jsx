import React, { useCallback } from 'react';
import { Row, Col, Spin, Divider } from 'antd';
import MovieCard from '../MovieCard';

import './styles.less';

function Diverse({ data, loading }) {
  const buildCards = useCallback(() => {
    return data?.map(movie => {
      return (
        <Col
          xs={{ span: 12 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 4 }}
          key={movie.id}
        >
          <MovieCard
            title={movie.attributes.canonicalTitle}
            slug={movie.attributes.slug}
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
      <Divider orientation="left">
        <h2>Animes diversos</h2>
      </Divider>
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
