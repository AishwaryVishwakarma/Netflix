import type {MovieDetails} from '@/components/pages/home/MovieSection/MovieSection';
import Image from 'next/image';
import React from 'react';
import {AiOutlineDown, AiOutlinePlus} from 'react-icons/ai';
import {BsFillPlayFill, BsHandThumbsUp} from 'react-icons/bs';

import MovieModal from '../MovieModal/MovieModal';
import styles from './styles.module.scss';

const MovieCard: React.FC<MovieDetails> = (data) => {
  const {name, title, original_name, overview, poster_path} = data ?? {};

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <div className={styles.bgContainer}>
        <div className={styles.movieCardWrapper}>
          <Image
            loading='lazy'
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt={original_name}
            width={300}
            height={500}
          />
          <div className={styles.detailsContainer}>
            <div className={styles.ctaContainer}>
              <BsFillPlayFill
                className={`${styles.playButton} ${styles.button}`}
              />
              <BsHandThumbsUp
                className={`${styles.thumbsIcon} ${styles.button}`}
              />
              <AiOutlinePlus
                className={`${styles.plusIcon} ${styles.button}`}
              />
              <AiOutlineDown
                className={`${styles.downIcon} ${styles.button}`}
                onClick={() => setModalOpen(true)}
              />
            </div>
            <p className={styles.title}>{name ?? title}</p>
            <p className={styles.description}>{overview}</p>
          </div>
        </div>
      </div>
      {modalOpen && <MovieModal movieDetails={data} setModal={setModalOpen} />}
    </>
  );
};

export default MovieCard;
