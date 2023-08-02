import ImageUrlBuilder from '@sanity/image-url';
import React from 'react';
import {client} from '../../utils/client';

interface Props {
  imageBlock: {
    alt: string;
    image: {
      asset: {
        _ref: string;
      };
    };
  };
  className?: string;
  alt?: string;
}

const builder = ImageUrlBuilder(client);

function urlFor(source: Props['imageBlock']['image']) {
  return builder.image(source);
}

const SanityImage: React.FC<Props> = ({imageBlock, className, alt}) => {
  return (
    <img
      src={imageBlock && urlFor(imageBlock?.image).url()}
      alt={imageBlock?.alt || alt}
      className={className}
    />
  );
};

export default SanityImage;
