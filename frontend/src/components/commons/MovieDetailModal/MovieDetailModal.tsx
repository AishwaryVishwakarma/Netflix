import React from 'react';
import styles from './styles.module.scss';
import {createPortal} from 'react-dom';
import {FaAudioDescription} from 'react-icons/fa';
import {MdOutlineSubtitles, MdOutlineClose} from 'react-icons/md';
import {BsFillPlayFill, BsHandThumbsUp} from 'react-icons/bs';
import {AiOutlinePlus} from 'react-icons/ai';
import {ModalContext} from '@/app/home/page';

const MovieDetailModal: React.FC<any> = ({data}) => {
  const {
    backdrop_path,
    vote_average,
    release_date,
    runtime,
    original_title: title,
    overview,
    genres,
  } = data ?? {};

  const {closeMovieModal} = React.useContext(ModalContext);

  React.useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMovieModal();
      }
    };
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [closeMovieModal]);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <div>
      <div className={styles.modalBackdrop} onClick={closeMovieModal}>
        {' '}
      </div>
      <div className={styles.modalContent}>
        {backdrop_path && (
          <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} />
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
        <div className={styles.closeButton} onClick={closeMovieModal}>
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
              <div>{`${Math.round(runtime / 60)}h ${runtime % 60} min`}</div>
              <div className={styles.icons}>
                <FaAudioDescription />
                <MdOutlineSubtitles />
              </div>
            </div>
            <div className={styles.movieTitle}>{title}</div>
            <div className={styles.storyDescription}>{overview}</div>
          </div>
          <div className={styles.secondColumn}>
            <div className={styles.genresContainer}>
              <span>Genres</span>
              <div className={styles.genres}>
                {genres?.map((genre: any, idx: number) => (
                  <p className={styles.genreTitle} key={idx}>
                    {genre.name},
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MovieDetailModal;
