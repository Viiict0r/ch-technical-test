import React from 'react';
import { Spin } from 'antd';

import './styles.less';

function Loading() {
  return (
    <div className="loading">
      <Spin />
    </div>
  );
}

export default Loading;
