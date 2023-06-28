import React from 'react';
import styles from './styles.module.scss';
import {FaFacebookF, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footerWrapper} defaultBg`}>
      <div className={styles.socialMediaIcons}>
        <FaFacebookF />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </div>
      <div className={styles.footerLinks}>
        <div>
          <p>Audio Description</p>
          <p>Investor Relations</p>
          <p>Legal Notices</p>
        </div>
        <div>
          <p>Help Center</p>
          <p>Jobs</p>
          <p>Cookie Preferences</p>
        </div>
        <div>
          <p>Gift Cards</p>
          <p>Terms of Use</p>
          <p>Corporate Information</p>
        </div>
        <div>
          <p>Media Center</p>
          <p>Privacy</p>
          <p>Contact Us</p>
        </div>
      </div>
      <div className={styles.cta}>Service Code</div>
      <div className={styles.trademark}>
        @ 2023 , Aishwary Vishwakarma Inc.
      </div>
    </footer>
  );
};

export default Footer;
