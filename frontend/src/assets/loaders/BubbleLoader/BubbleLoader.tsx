import React, {ReactElement, ReactNode} from 'react';
import styles from './styles.module.scss';

const range = [1, 2, 3, 4] as const;

interface LoaderOptions {
  color?: string;
  numberOfBubbles?: (typeof range)[number];
  containerClass?: string;
}

let bubbles: Array<ReactElement> = [];

const BubbleLoader: React.FC<LoaderOptions> = ({
  color = '#e50914',
  numberOfBubbles = 3,
  containerClass,
}) => {
  const createBubbles = () => {
    bubbles = [];
    for (let i = 0; i < numberOfBubbles; i++) {
      // Max 4 bubbles are allowed so break out of the loop
      if (i === 4) break;
      const divElement = (
        <div
          style={{
            background: color,
          }}
          className={styles.bubble}
        />
      );
      bubbles.push(divElement);
    }
  };

  createBubbles();

  return (
    <span className={`${styles.container} ${containerClass}`}>{bubbles}</span>
  );
};

export default BubbleLoader;
