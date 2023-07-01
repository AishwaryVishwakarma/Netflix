import React from 'react';
import styles from './styles.module.scss';
import PlanCard from '../PlanCard';
import {PLANS} from '@/DUMMY_DATA/PLANS';
import {nanoid} from 'nanoid';
import Button from '@/utils/Button/Button';

/*
 * Plans Screen (Plans Page)
 */

const Plans: React.FC = () => {
  const submitHandler = async () => {
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
        <Button submitFunction={submitHandler} />
      </div>
    </div>
  );
};

export default Plans;
