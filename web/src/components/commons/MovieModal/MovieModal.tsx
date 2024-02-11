import type {MovieDetails} from '@/components/pages/home/MovieSection/MovieSection';
import Image from 'next/image';
import React from 'react';
import {createPortal} from 'react-dom';
import {AiOutlinePlus} from 'react-icons/ai';
import {BsFillPlayFill, BsHandThumbsUp} from 'react-icons/bs';
import {FaAudioDescription} from 'react-icons/fa';
import {MdOutlineClose, MdOutlineSubtitles} from 'react-icons/md';

import styles from './styles.module.scss';

interface ModalProps {
  movieDetails: MovieDetails;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieModal: React.FC<ModalProps> = ({movieDetails, setModal}) => {
  const {
    backdrop_path,
    vote_average,
    release_date,
    original_title: title,
    overview,
  } = movieDetails ?? {};

  React.useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div>
      <div className={styles.modalBackdrop} onClick={() => setModal(false)} />
      <div className={styles.modalContent}>
        {backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={backdrop_path}
            height={400}
            width={500}
          />
        )}
        <div className={styles.viewOptions}>
          <div className={styles.playButton}>
            <BsFillPlayFill className={`${styles.playIcon} ${styles.button}`} />{' '}
            Play
          </div>
          <div className={styles.otherOptions}>
            <AiOutlinePlus className={styles.button} />
            <BsHandThumbsUp className={styles.button} />
          </div>
        </div>
        <div className={styles.closeButton} onClick={() => setModal(false)}>
          <MdOutlineClose className={styles.button} />
        </div>
        <div className={styles.overviewContainer}>
          <div className={styles.firstColumn}>
            <div className={styles.statsContainer}>
              <div className={styles.matchPercentage}>
                {Math.round(vote_average * 10)}% Match
              </div>
              <div className={styles.releaseDate}>
                {release_date && release_date.substring(0, 4)}
              </div>
              <div className={styles.icons}>
                <FaAudioDescription />
                <MdOutlineSubtitles />
              </div>
            </div>
            <div className={styles.movieTitle}>{title}</div>
            <div className={styles.storyDescription}>{overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
