import React from 'react';
import styles from './styles.module.scss';
import PlanCard from '../PlanCard';
import {PLANS} from '@/DUMMY_DATA/PLANS';
import {nanoid} from 'nanoid';
import Loader from '@/utils/loader/loader';
import {setSubscription as SET_SUBSCRIPTION_URL} from '@/END_POINTS';
import axios from 'axios';

/*
 * Plans Screen (Plans Page)
 */

const Plans: React.FC = () => {
  const submitHandler = async (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const subscription = JSON.parse(
      sessionStorage.getItem('subscription') as string
    );

    const _id: string | null = sessionStorage.getItem('userId');

    try {
      const res = await axios.post(SET_SUBSCRIPTION_URL, {
        _id,
        subscription,
      });
      window.location.href = '/signup/payment';
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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

/*
 * Custom Button to seperate the state from Plans screen (Causing issue with the transitions)
 */

interface ButtonProps {
  submitFunction: (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<ButtonProps> = ({submitFunction, type = 'button'}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onClickHandler = () => {
    setIsLoading(true);

    submitFunction(setIsLoading);
  };
  return (
    <button
      role='button'
      type={type}
      className={`${styles.button} ${isLoading && styles.loading}`}
      onClick={onClickHandler}
    >
      {isLoading ? <Loader /> : 'Next'}
    </button>
  );
};

export default Plans;
