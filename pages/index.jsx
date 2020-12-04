import React from 'react';
import Head from 'next/head';

import NavBarMenu from '../components/NavBarMenu';

export default function Home() {
  return (
    <>
      <Head>
        <title>Animeflix - Streaming de Animes</title>
      </Head>
      <div>
        <NavBarMenu />
      </div>
    </>
  );
}
