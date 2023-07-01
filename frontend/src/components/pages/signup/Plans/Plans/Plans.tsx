import React from 'react';
import styles from './styles.module.scss';
import PlanCard from '../PlanCard';
import {PLANS} from '@/DUMMY_DATA/PLANS';
import {nanoid} from 'nanoid';
import Loader from '@/utils/loader/loader';

const Plans = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect((): void => {
    sessionStorage.setItem('plan', 'premium');
  }, []);

  const planSubmitHandler = () => {
    setIsLoading(true);

    const plan = sessionStorage.getItem('plan');

    console.log(plan);
  };

  return (
    <div className={styles.plansWrapper}>
      <div className={styles.fadeInFromRight}>
        <p>
          Step <b>2</b> of <b>3</b>
        </p>
        <h1>Choose the plan that’s right for you</h1>
        <div className={styles.cardsContainer}>
          {PLANS.map((planObject) => (
            <PlanCard key={nanoid()} data={planObject} />
          ))}
        </div>
        <button
          role='button'
          type='button'
          className={isLoading ? styles.loading : ''}
          onClick={planSubmitHandler}
        >
          {isLoading ? <Loader /> : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Plans;
