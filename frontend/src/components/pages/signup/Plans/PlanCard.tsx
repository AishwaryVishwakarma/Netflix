import React from 'react';
import styles from './styles.module.scss';
import CheckMarkCircle from '@/utils/icons/CheckMarkCircle';
import CheckMark from '@/utils/icons/CheckMark';
import {type PlanData} from '@/DUMMY_DATA/PLANS';

const PlanCard: React.FC<{data: PlanData}> = ({data}) => {
  const {
    _value: {type, value},
    name,
    resolution,
    features,
  } = data ?? {};
  return (
    <div className={styles.cardWrapper}>
      <input type='radio' id={type} name='plan-select' value={type} />
      <label htmlFor={type}>
        <div className={styles.topContainer}>
          <span className={styles.type}>{name}</span>
          <span className={styles.resolution}>{resolution}</span>
        </div>
        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature.title}>
              <CheckMarkCircle />
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
