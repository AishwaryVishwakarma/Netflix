/* eslint-disable react/no-unescaped-entities */
import ProfileCard from '@/components/pages/profile/ProfileCard/ProfileCard';
import styles from './styles.module.scss';
import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import DUMMY_PROFILES from '@/DUMMY_DATA/DUMMY_PROFILES';

export default function Home() {
  return (
    <Layout footer={false}>
      <div className={styles.wrapper}>
        <div className={styles.headerText}>Who's watching?</div>
        <div className={styles.profilesContainer}>
          {DUMMY_PROFILES.map((element, idx) => (
            <Link href='/home' key={idx}>
              <ProfileCard url={element.url} name={element.name} />
            </Link>
          ))}
        </div>
        <div className={styles.manageProfilesBox}>
          <p>Manage Profiles</p>
        </div>
      </div>
    </Layout>
  );
}
