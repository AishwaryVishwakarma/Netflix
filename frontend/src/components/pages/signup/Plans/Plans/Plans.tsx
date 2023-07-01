import React from 'react';
import styles from './styles.module.scss';
import PlanCard from '../PlanCard';
import {PLANS, type PlanData} from '@/DUMMY_DATA/PLANS';
import {nanoid} from 'nanoid';

const Plans = () => {
  const [plan, setPlan] = React.useState<string>('Premium');

  console.log(PLANS.length);

  return (
    <div className={styles.plansWrapper}>
      <div className={styles.fadeInFromRight}>
        <p>
          Step <b>2</b> of <b>3</b>
        </p>
        <h1>Choose the plan that’s right for you</h1>
        <div className={styles.cardsContainer}>
          {PLANS.map((plan) => (
            <PlanCard key={nanoid()} data={plan} />
          ))}
        </div>
        <button
          role='button'
          type='button'
          // onClick={(): void => changeFormState(SCREEN_STATE.FORM)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Plans;
