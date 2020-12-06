import React, { useCallback } from 'react';
import { Row, Col, Divider } from 'antd';
import MovieCard from '../MovieCard';

import './styles.less';

function Trending({ data }) {
  const buildCards = useCallback(() => {
    return data?.map((movie, index) => {
      if (index > 5) {
        return null;
      }

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
      <Divider orientation="left">
        <h2>Animes populares</h2>
      </Divider>
      <div className="trending__container-trends">
        <Row gutter={[16, 16]}>{buildCards()}</Row>
      </div>
    </div>
  );
}

export default Trending;
