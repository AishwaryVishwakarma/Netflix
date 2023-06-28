'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import MovieSection from '@/components/pages/home/MovieSection/MovieSection';
import {BsFillPlayFill} from 'react-icons/bs';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import MovieDetailModal from '@/components/commons/MovieDetailModal/MovieDetailModal';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';

interface Context {
  openMovieModal: (data: any) => void;
  closeMovieModal: () => void;
}

const MOVIES_LIST = [
  {
    name: 'Popular Today',
    type: 'Popular',
  },
  {
    name: 'Harry Potter',
    type: 'search',
  },

  {
    name: 'Pirates of the caribbean',
    type: 'search',
  },
  {
    name: 'Star Wars',
    type: 'search',
  },
];

export const ModalContext = React.createContext<Context>({
  openMovieModal: (data: any): void => {},
  closeMovieModal: (): void => {},
});

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState();

  const prevTitle = React.useRef(document.title);

  React.useEffect(() => {
    document.title = 'Home - Netflix';

    return () => {
      document.title = prevTitle.current;
    };
  }, []);

  function openMovieModal(data: any): void {
    setIsModalOpen(true);
    setModalData(data);
    // console.log(data)
  }

  function closeMovieModal(): void {
    setIsModalOpen(false);
  }
  return (
    <ModalContext.Provider value={{openMovieModal, closeMovieModal}}>
      <Layout className='full-bleed defaultBg'>
        <div className={styles.home}>
          <Navbar />
          <div className={styles.videoContainer}>
            <iframe
              src='https://www.youtube.com/embed/1JLUn2DFW4w?autoplay=1&mute=1&loop=1&controls=0&playlist=1JLUn2DFW4w'
              frameBorder='0'
            ></iframe>
          </div>
          <div className={styles.viewOptions}>
            <div className={styles.playButton}>
              <BsFillPlayFill className={`${styles.playIcon}`} /> Play
            </div>
            <div className={styles.moreInfo}>
              <AiOutlineInfoCircle className={`${styles.infoIcon}`} /> More info
            </div>
          </div>
          {MOVIES_LIST.map((movie) => (
            <MovieSection
              key={movie.name}
              movieName={movie.name}
              query={movie.type}
            />
          ))}
        </div>
        {isModalOpen && <MovieDetailModal data={modalData} />}
      </Layout>
    </ModalContext.Provider>
  );
};

export default HomePage;
