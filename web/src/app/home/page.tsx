'use client';

import Layout from '@/components/Layout/Layout';
import Navbar from '@/components/Navbar/Navbar';
import MovieSection from '@/components/pages/home/MovieSection/MovieSection';
import React from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {BsFillPlayFill} from 'react-icons/bs';

import styles from './styles.module.scss';

const MOVIES_LIST = [
  {
    name: 'Popular Today',
    query: 'popular',
  },
  {
    name: 'Top Rated',
    query: 'top_rated',
  },
  {
    name: 'Upcoming',
    query: 'upcoming',
  },
  {
    name: 'Now Playing',
    query: 'now_playing',
  },
];

const HomePage = () => {
  let documentTitle;

  if (typeof document !== 'undefined') {
    documentTitle = document.title;
  }

  const prevTitle = React.useRef(documentTitle);

  React.useEffect(() => {
    document.title = 'Home - Netflix';

    return () => {
      document.title = prevTitle.current as string;
    };
  }, []);

  return (
    <Layout className='full-bleed defaultBg' footerStyles={styles.footer}>
      <div className={styles.home}>
        <Navbar />
        <div className={styles.videoContainer}>
          <video src='/breakingbad.webm' autoPlay muted loop />
          <div className={styles.viewOptions}>
            <div className={styles.playButton}>
              <BsFillPlayFill className={`${styles.playIcon}`} /> Play
            </div>
            <div className={styles.moreInfo}>
              <AiOutlineInfoCircle className={`${styles.infoIcon}`} /> More info
            </div>
          </div>
        </div>
        {MOVIES_LIST.map((movie, idx) => {
          const {name, query} = movie;
          return (
            <MovieSection key={name} title={name} query={query} idx={idx} />
          );
        })}
      </div>
    </Layout>
  );
};

export default HomePage;
