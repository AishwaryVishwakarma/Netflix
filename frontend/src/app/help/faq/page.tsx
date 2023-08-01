import React from 'react';
import styles from './styles.module.scss';
import {client} from '@/client';
import {redirect} from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import NetflixLogo from '@/utils/icons/NetflixLogo';
import Link from 'next/link';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import SanityImage from '@/utils/SanityImage';
import SanityRichText from '@/utils/SanityRichText';
import Article from '@/utils/icons/Article';

interface Features {
  _key: string;
  heading: string;
  featureImage: {
    alt: string;
    image: {
      asset: {
        _ref: string;
      };
    };
  };
  description: any;
}

interface RelatedArticles {
  _key: string;
  text: string;
  link: string;
}

const getPageData = async () => {
  try {
    const res = await client.fetch(
      '*[_type == "faqPage"] {features, relatedArticles}'
    );
    return res[0];
  } catch (error) {
    console.debug(error);
    redirect('/');
  }
};

const FAQPage = async () => {
  const pageData = await getPageData();

  if (!pageData) {
    redirect('/');
  }

  const {
    features,
    relatedArticles,
  }: {
    features: Array<Features>;
    relatedArticles: Array<RelatedArticles>;
  } = pageData;

  return (
    <Layout className='full-bleed'>
      <header className='layouted defaultBg'>
        <div className={styles.headerContent}>
          <Link href='/'>
            <NetflixLogo width={80} height={32} />
          </Link>
          <div className={styles.divider} />
          <span>Help Center</span>
          <Link href='/signup'>JOIN NETFLIX</Link>
          <Link href='/'>SIGN IN</Link>
        </div>
      </header>
      <section className='layouted'>
        <div className={styles.main}>
          <div className={styles.leftPan}>
            <Link href='/'>
              <AiOutlineArrowLeft />
              <span>Back to help center</span>
            </Link>
            {features.map((feature) => (
              <div key={feature._key} className={styles.feature}>
                <h1>{feature.heading}</h1>
                <SanityImage imageBlock={feature.featureImage} />
                <SanityRichText
                  textBlock={feature.description}
                  className={styles.description}
                />
                <hr />
              </div>
            ))}
          </div>
          <div className={styles.rightPan}>
            <div className={styles.relatedArticles}>
              <h3>Related Articles</h3>
              <ul>
                {relatedArticles.map((article) => (
                  <li key={article._key}>
                    <Article />
                    <Link href={article.link || '/'}>{article.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
