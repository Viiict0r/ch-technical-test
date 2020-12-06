import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';

import '../styles/pages/404.less';

function NotFound() {
  return (
    <div className="notfound">
      <div>
        <h1>404</h1>
        <p>O conteúdo que você procura não existe.</p>
        <Link href="/">
          <Button type="link">Voltar ao início</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
