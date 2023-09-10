import React from 'react';
import styles from './styles.module.scss';
import PlanCard from '../PlanCard';
import {PLANS} from '@/DATA/PLANS';
import {nanoid} from 'nanoid';
import CircularLoader from '@/assets/loaders/CircularLoader/CircularLoader';
import {setSubscription as SET_SUBSCRIPTION_URL} from '@/END_POINTS';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {clearStorage, getStorage} from '@/utils/storage';

/*
 * Plans Screen (Plans Page)
 */

const Plans: React.FC = () => {
  const router = useRouter();

  const submitHandler = async (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> => {
    const subscription = JSON.parse(
      sessionStorage.getItem('subscription') as string
    );

    const [authToken] = getStorage(['auth-token'], localStorage);

    try {
      const res = await axios.post(
        SET_SUBSCRIPTION_URL,
        {
          subscription,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        clearStorage(['subscription'], sessionStorage);
        router.push('/signup/payment');
      }
    } catch (error) {
      console.debug(error);
      router.push('/signup');
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
        <span>
          HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
          to your internet service and device capabilities. Not all content is
          available in all resolutions. See our Terms of Use for more details.
          <br /> <br />
          Only people who live with you may use your account. Watch on 4
          different devices at the same time with Premium, 2 with Standard, and
          1 with Basic and Mobile.
        </span>
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
  type?: 'button' | 'submit' | 'reset';
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
      {isLoading ? <CircularLoader /> : 'Next'}
    </button>
  );
};

export default Plans;
