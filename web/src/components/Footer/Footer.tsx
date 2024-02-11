import Link from 'next/link';
import React from 'react';
import {FaFacebookF, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa';

import styles from './styles.module.scss';

/*
 * Footer
 */

const Footer: React.FC<{
  type: 'auth' | 'home';
  fixed: boolean;
  footerStyles: string | undefined;
}> = ({type, fixed, footerStyles}) => {
  return (
    <footer
      className={`${styles.footerWrapper} ${type === 'home' && 'defaultBg'} ${
        type === 'auth' && 'transparentBg'
      } ${fixed && styles.fixedOnBottom} ${footerStyles}`}
    >
      {type === 'home' && <HomeFooter />}
      {type === 'auth' && <AuthFooter />}
    </footer>
  );
};

/*
 * Auth Pages Footer
 */

const AuthFooter = () => {
  return (
    <>
      <p className={styles.contact}>Questions? Call 000-800-919-1694</p>
      <div className={`${styles.footerLinks} ${styles.smallFont}`}>
        <div>
          <Link href='/help/faq'>FAQ</Link>
          <p>Cookie Preferences</p>
        </div>
        <div>
          <p>Help Center</p>
          <p>Corporate Information</p>
        </div>
        <div>
          <p>Terms of Use</p>
        </div>
        <div>
          <p>Privacy</p>
        </div>
      </div>
    </>
  );
};

/*
 * Home Footer
 */

const HomeFooter = () => {
  return (
    <>
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
      <div className={styles.trademark}>@ 2023 , Aishwary Vishwakarma Inc.</div>
    </>
  );
};

export default Footer;
