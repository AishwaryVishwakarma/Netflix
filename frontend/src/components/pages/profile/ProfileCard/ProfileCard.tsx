import React from 'react';
import styles from './styles.module.scss';

interface ProfileCardProps {
  url: string;
  name: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({url, name}) => {
  return (
    <div className={styles.boxWrapper}>
      <img src={url} alt='image' />
      <div className={styles.profileName}>{name}</div>
    </div>
  );
};

export default ProfileCard;
