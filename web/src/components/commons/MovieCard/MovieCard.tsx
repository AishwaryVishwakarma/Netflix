import {ModalContext} from '@/app/home/context';
import axios from 'axios';
import React from 'react';
import {AiOutlineDown, AiOutlinePlus} from 'react-icons/ai';
import {BsFillPlayFill, BsHandThumbsUp} from 'react-icons/bs';
import {RxDotFilled} from 'react-icons/rx';

import styles from './styles.module.scss';

const MovieCard: React.FC<any> = ({movieData}) => {
  const [detail, setDetail] = React.useState<any>();
  const [genres, setGenres] = React.useState<any>();

  const {openMovieModal} = React.useContext(ModalContext);

  React.useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${movieData.id}?api_key=9c3fd4dd152d57af68bd8d3ebd55fce0&language=en-US`
    )
      .then((res) => {
        setDetail(res.data);
        setGenres(res.data.genres);
      })
      .catch((err) => console.debug(err));
  }, [movieData.id]);

  return (
    <>
      <div className={styles.bgContainer}>
        <div className={styles.movieCardWrapper}>
          <img
            loading='lazy'
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
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
                onClick={() => {
                  openMovieModal(detail);
                }}
              />
            </div>
            <p className={styles.title}>{detail?.title}</p>
            <div className={styles.genresContainer}>
              {genres?.map((genre: any) => (
                <div key={genre.name} className={styles.genre}>
                  <RxDotFilled className={styles.dotIcon} />
                  <p className={styles.genreTitle}>{genre.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
