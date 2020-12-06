import React from 'react';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { Image } from 'antd';

import './styles.less';

function MovieCard({ poster, title, rating, ranking, slug }) {
  return (
    <Link prefetch={false} href={`/anime/${slug}`}>
      <a>
        <div className="moviecard">
          <div className="moviecard__layer">
            <div className="moviecard__layer-title">
              <p>{title}</p>
            </div>
            <div className="moviecard__layer-rating">
              <span className="moviecard__layer-rating-rank">
                Rank: <b>#{ranking}</b>
              </span>
              <span className="moviecard__layer-rating-value">
                <AiFillStar />
                {rating || 0.0}%
              </span>
            </div>
          </div>
          <Image src={poster} preview={false} />
        </div>
      </a>
    </Link>
  );
}

export default MovieCard;
