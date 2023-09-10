import React from 'react';
import styles from './styles.module.scss';
import CheckMarkCircle from '@/assets/icons/CheckMarkCircle';
import CheckMark from '@/assets/icons/CheckMark';
import {type PlanData} from '@/DATA/PLANS';
import {setStorage} from '@/utils/storage';

/*
 * Plans Card (Plans Screen)
 */

const PlanCard: React.FC<{
  data: PlanData;
}> = ({data}) => {
  const {
    _value: {type, value},
    background,
    name,
    resolution,
    svgFill,
    features,
  } = data ?? {};

  const changePlanHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const subscription = {
      type: event.target.value,
      value: value.toString(),
    };

    setStorage(
      {
        subscription: JSON.stringify(subscription),
      },
      sessionStorage
    );
  };

  return (
    <div className={styles.cardWrapper}>
      <input
        type='radio'
        id={type}
        name='plan-select'
        value={type}
        defaultChecked={type === 'premium'}
        onChange={changePlanHandler}
      />
      <label htmlFor={type}>
        <div
          className={styles.topContainer}
          style={{
            background: background,
          }}
        >
          <span className={styles.type}>{name}</span>
          <span className={styles.resolution}>{resolution}</span>
        </div>
        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature.title}>
              <CheckMarkCircle color={svgFill} />
              <div className={styles.featureInfo}>
                <p>{feature.title}</p>
                <h4>{feature.description}</h4>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.selected}>
          <CheckMark height={16} width={16} color='rgb(118, 118, 118)' />
          Selected
        </div>
      </label>
    </div>
  );
};

export default PlanCard;
