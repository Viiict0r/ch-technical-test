/* eslint-disable no-console */
import React, { useState, useCallback } from 'react';
import Head from 'next/head';

import { getDiverse, getTrending } from '../lib/animes';

import Trending from '../components/Trending';
import Diverse from '../components/Diverse';
import NavBarMenu from '../components/NavBarMenu';

import useInifiniteScroll from '../hooks/InfiniteScroll';

export default function Home({ trending, diverse }) {
  const [diverseData, setDiverseData] = useState(diverse);
  const [fetching, setFetching] = useInifiniteScroll(() => fetchMore());

  const fetchMore = useCallback(async () => {
    try {
      if (!diverseData.links?.next) {
        return;
      }

      const response = await getDiverse(diverseData.links.next);

      setDiverseData(oldData => ({
        data: [...oldData.data, ...response.data],
        links: response.links,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  }, [fetching, diverseData]);

  return (
    <>
      <Head>
        <title>Animeflix - Streaming de Animes</title>
      </Head>
      <NavBarMenu />
      <div className="page-content">
        <Trending data={trending.data} />
        <Diverse data={diverseData.data} loading={fetching} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const requests = [getTrending(), getDiverse()];

  const response = await Promise.all(requests);

  const trending = response[0];
  const diverse = response[1];

  return {
    props: {
      trending,
      diverse,
    },
    revalidate: 60,
  };
};
