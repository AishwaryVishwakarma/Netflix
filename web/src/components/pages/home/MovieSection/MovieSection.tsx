import API_KEY from '@/API_KEY';
import MovieCard from '@/components/commons/MovieCard/MovieCard';
import axios from 'axios';
import {nanoid} from 'nanoid';
import React from 'react';
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './styles.module.scss';

interface MovieSectionProps {
  title: string;
  query: string;
  idx: number;
}

export interface MovieDetails {
  backdrop_path: string;
  id: number;
  name: string;
  title: string;
  origin_country: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const MovieSection: React.FC<MovieSectionProps> = ({title, query, idx}) => {
  const [movies, setMovies] = React.useState<MovieDetails[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const CARD_SEKELETONS = Array.apply(null, Array(10)).map(() => {});

  let cardsSectionRef = React.useRef<HTMLDivElement | null>(null);

  const scroll = (scrollOffset: number) => {
    if (cardsSectionRef.current) {
      cardsSectionRef.current.scrollLeft += scrollOffset;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(`https://api.themoviedb.org/3/movie/${query}?api_key=${API_KEY}`)
      .then((res) => {
        setMovies(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => console.debug(err));
  }, [query]);

  return (
    <>
      {idx === 0 && <div className={styles.blurContainer} />}
      <div className={styles.sectionWrapper}>
        <div className={styles.heading}>
          {isLoading ? (
            <Skeleton
              className={styles.headingSkeleton}
              highlightColor='lightgrey'
              baseColor='grey'
              duration={1}
              width={300}
            />
          ) : (
            title
          )}
        </div>
        <div ref={cardsSectionRef} className={styles.cardsContainer}>
          {isLoading &&
            CARD_SEKELETONS.map(() => (
              <Skeleton
                key={nanoid()}
                highlightColor='lightgrey'
                baseColor='grey'
                duration={1.5}
                height={283}
                width={190}
              />
            ))}
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
          <button
            type='button'
            className={styles.prevButton}
            onClick={() => scroll(-1400)}
          >
            <MdNavigateBefore className={styles.buttonIcons} />
          </button>
          <button
            type='button'
            className={styles.nextButton}
            onClick={() => scroll(1400)}
          >
            <MdNavigateNext className={styles.buttonIcons} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieSection;
