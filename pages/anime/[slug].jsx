import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { Row, Col, Image, Tabs, Button, Tag } from 'antd';
import { AiFillStar } from 'react-icons/ai';

import { getBySlug } from '../../lib/animes';
import NavBarMenu from '../../components/NavBarMenu';
import Loading from '../../components/Loading';

import '../../styles/pages/anime.less';

const { TabPane } = Tabs;

export default function Anime({ animeData, categories }) {
  const [isSynopsisExpanded, setSynopsisExpanded] = useState(false);
  const router = useRouter();

  const buildSynopsis = useCallback(
    synopsis => {
      if (String(synopsis).length > 400) {
        const partText = String(synopsis).slice(0, 400);

        return (
          <div>
            {isSynopsisExpanded ? (
              <p>{synopsis}</p>
            ) : (
              <p>
                {partText}
                <span>...</span>
              </p>
            )}

            <Button
              type="link"
              onClick={() => setSynopsisExpanded(!isSynopsisExpanded)}
            >
              {isSynopsisExpanded ? 'Ver menos' : 'Ver mais'}
            </Button>
          </div>
        );
      }
      return <p>{synopsis}</p>;
    },
    [isSynopsisExpanded]
  );

  const translateStatus = useCallback(status => {
    switch (String(status)) {
      case 'current':
        return 'Em exibição';
      case 'finished':
        return 'Encerrado';
      case 'unreleased':
        return 'Não lançado';
      case 'upcoming':
        return 'Em breve';
      default:
        return status;
    }
  }, []);

  const parseDate = useCallback(date => {
    if (!date) return '---';

    const dt = new Date(date);
    const month = dt.toLocaleString('pt-br', { month: 'short' });

    return `${month} de ${dt.getFullYear()}`;
  }, []);

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Animeflix</title>
        </Head>
        <Loading />
      </>
    );
  }

  return (
    <div className="anime">
      <Head>
        <title>
          {router.isFallback
            ? 'Animeflix'
            : `${animeData?.attributes?.canonicalTitle} - Animeflix`}
        </title>
      </Head>

      <NavBarMenu />

      <div className="anime__banner">
        <div className="anime__banner-layer" />
        {!router.isFallback && animeData?.attributes?.coverImage?.small && (
          <NextImage
            src={animeData?.attributes?.coverImage?.small}
            alt="Banner"
            layout="fill"
          />
        )}
      </div>
      <div className="anime__content">
        <Row gutter={0}>
          <Col span={6}>
            <div className="anime__content-poster">
              <div className="anime__content-poster__img">
                <Image
                  preview={false}
                  src={animeData?.attributes?.posterImage?.small}
                />
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="anime__content-details">
              <div className="anime__content-details__title">
                <strong>{animeData?.attributes.canonicalTitle}</strong>
                <div className="anime__content-details__title-rating">
                  {!router.isFallback && (
                    <>
                      <AiFillStar /> {animeData?.attributes?.averageRating}% de
                      aprovação
                    </>
                  )}
                </div>
              </div>
              <Tabs>
                <TabPane tab="Resumo" key="1">
                  <div className="anime__content-details__categories">
                    {categories?.map(data => (
                      <Tag color="rgba(255, 255, 255, .1)" key={data.id}>
                        {data.attributes.title}
                      </Tag>
                    ))}
                  </div>
                  <div className="anime__content-details__desc">
                    <strong>Sinopse</strong>
                    <div className="anime__content-details__desc-synopsis">
                      {buildSynopsis(animeData?.attributes?.synopsis)}
                    </div>
                  </div>
                  {animeData?.attributes.youtubeVideoId && (
                    <div className="anime__content-details__trailer">
                      <strong>Trailer</strong>
                      <div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.youtube.com/embed/${animeData?.attributes.youtubeVideoId}" frameborder="0" controls="0" showinfo="0" />`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </TabPane>
                <TabPane tab="Episódios" key="2">
                  teste
                </TabPane>
              </Tabs>
            </div>
          </Col>
          <Col span={6}>
            <div className="anime__content-others">
              <strong>Informações</strong>
              <div className="anime__content-others__info">
                <Row gutter={[0, 8]}>
                  <Col span={9}>
                    <b>Tipo</b>
                  </Col>
                  <Col span={15}>
                    <span>{animeData?.attributes.subtype}</span>
                  </Col>
                  <Col span={9}>
                    <b>Status</b>
                  </Col>
                  <Col span={15}>
                    <span>{translateStatus(animeData?.attributes.status)}</span>
                  </Col>
                  <Col span={9}>
                    <b>Transmitido</b>
                  </Col>
                  <Col span={15}>
                    <span>{parseDate(animeData?.attributes.startDate)}</span>
                  </Col>
                  <Col span={9}>
                    <b>Classificação</b>
                  </Col>
                  <Col span={15}>
                    <span>{animeData?.attributes.ageRatingGuide}</span>
                  </Col>
                  <Col span={9}>
                    <b>Duração</b>
                  </Col>
                  <Col span={15}>
                    <span>
                      {animeData?.attributes.episodeLength
                        ? `${animeData?.attributes.episodeLength} min cada ep.`
                        : '---'}
                    </span>
                  </Col>
                  <Col span={9}>
                    <b>Popularidade</b>
                  </Col>
                  <Col span={15}>
                    <span>
                      {animeData?.attributes.popularityRank
                        ? `${animeData?.attributes.popularityRank}º no rank.`
                        : '---'}
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async context => {
  try {
    const { slug } = context.params;

    const response = await getBySlug(slug);

    if (!response || response.data.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        animeData: response.data[0],
        categories: response.included,
      },
      revalidate: 10 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
