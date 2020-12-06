import React, { useCallback } from 'react';
import { Card } from 'antd';

import './styles.less';

function EpisodeCard({ thumbnail, title, number }) {
  const shortTitle = useCallback(value => {
    if (String(value).length > 35) {
      return `${String(value).slice(0, 30)}...`;
    }
    return value || '< Sem título >';
  }, []);

  return (
    <Card
      hoverable
      size="small"
      cover={
        <img
          className="episodecard__img"
          src={thumbnail}
          width="300"
          height="150"
          alt="Episode thumbnail"
        />
      }
    >
      <span>
        <b>Episódio {number}:</b>&nbsp;
        {shortTitle(title)}
      </span>
    </Card>
  );
}

export default EpisodeCard;
