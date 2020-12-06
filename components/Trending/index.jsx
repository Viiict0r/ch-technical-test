import React, { useCallback } from 'react';
import { Row, Col, Button } from 'antd';
import MovieCard from '../MovieCard';

import './styles.less';

function Trending({ data }) {
  const buildCards = useCallback(() => {
    return data?.map((movie, index) => {
      if (index > 5) {
        return null;
      }

      return (
        <Col span={4} key={movie.id}>
          <MovieCard
            title={movie.attributes.canonicalTitle}
            poster={movie.attributes.posterImage.medium}
            rating={movie.attributes.averageRating}
            ranking={movie.attributes.popularityRank}
            slug={movie.attributes.slug}
          />
        </Col>
      );
    });
  }, [data]);

  return (
    <div className="trending__container">
      <h2>Animes populares</h2>
      <div className="trending__container-trends">
        <Row gutter={16}>{buildCards()}</Row>
        <div className="trending__container-viewmore">
          <Button type="link">Ver mais</Button>
        </div>
      </div>
    </div>
  );
}

export default Trending;
