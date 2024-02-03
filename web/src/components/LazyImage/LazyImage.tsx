import React from 'react';
import styles from './styles.module.scss';
import isImageCached from '@/utils/isImageCached';

interface Props {
  src: string;
  alt?: string;
  height: string;
  width: string;
  placeholder: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
}

const LazyImage: React.FC<Props> = ({
  src,
  alt,
  height,
  width,
  placeholder,
  className,
  loading = 'lazy',
  priority = 'high',
}) => {
  const containerRef = React.useRef(null);

  const isImageCachedInBrowser = isImageCached(src);

  React.useEffect(() => {
    // If the image is cached in browsers then don't run the effect
    if (isImageCachedInBrowser) return;

    const container = containerRef.current as HTMLDivElement | null;

    // Getting the image element
    const image = container?.childNodes[0] as HTMLImageElement;

    function loaded() {
      container?.classList.add(styles.loaded);
    }

    if (image.complete) {
      loaded();
    } else {
      image.addEventListener('load', loaded);
    }

    return (): void => {
      image.removeEventListener('load', loaded);
    };
  }, [isImageCachedInBrowser]);

  const containerClass = {
    backgroundImage: `url(${placeholder})`,
    height,
    width,
  };

  return (
    <div
      data-lazy-image='true'
      style={containerClass}
      ref={containerRef}
      className={`${styles.container} ${
        isImageCachedInBrowser && styles.imageCached
      } ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={loading} fetchPriority={priority} />
    </div>
  );
};

export default LazyImage;
