import React from 'react';
import styles from './styles.module.scss';
import {
  AiOutlineSearch,
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineEdit,
  AiOutlineProfile,
} from 'react-icons/ai';
import {FaRegBell} from 'react-icons/fa';
import {MdOutlineAccountCircle} from 'react-icons/md';
import {BiHelpCircle} from 'react-icons/bi';
// import DUMMY_PROFILES from '@/DUMMY_DATA/DUMMY_PROFILES';

const TABS = [
  'Home',
  'TV Shows',
  'Movies',
  'News & Popular',
  'My List',
  'Browse by Languages',
];

const DROPDOWN_ITEMS = [
  {
    element: <AiOutlineEdit className={styles.utilityIcons} />,
    description: 'Manage Profiles',
  },
  {
    element: <AiOutlineProfile className={styles.utilityIcons} />,
    description: 'Transfer Profile',
  },
  {
    element: <MdOutlineAccountCircle className={styles.utilityIcons} />,
    description: 'Account',
  },
  {
    element: <BiHelpCircle className={styles.utilityIcons} />,
    description: 'Help Center',
  },
];

const Navbar = () => {
  const [scrollAmount, setScrollAmount] = React.useState(0);

  const handleScroll = () => {
    setScrollAmount(window.scrollY);
  };

  React.useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollAmount]);

  return (
    <nav
      className={`${styles.navbar} ${scrollAmount > 10 ? styles.bgDark : ''}`}
    >
      <img
        src='https://i.postimg.cc/MTkxkpnT/Logonetflix.png'
        alt=''
        className={styles.logo}
      />
      <ul>
        {TABS.map((tab, idx) => (
          <li key={idx}>{tab}</li>
        ))}
      </ul>
      <div className={styles.rightContainer}>
        <AiOutlineSearch className={styles.searchIcon} />
        <p>Children</p>
        <FaRegBell className={styles.bellIcon} />
        <div className={styles.profileWrapper}>
          <img src='https://i.postimg.cc/yYNvX4dG/red.jpg' alt='' />
          <AiFillCaretDown className={styles.caret} />
          <div className={styles.dropdownWrapper}>
            <div
              className={`${styles.profileDropdown} ${
                scrollAmount > 50 ? styles.lowOpacity : ''
              }`}
            >
              <div className={styles.itemsContainer}>
                {/* {DUMMY_PROFILES.map((profile, idx) => (
                  <div key={idx} className={styles.profiles}>
                    <img src={profile.url} alt='' />
                    <p>{profile.name}</p>
                  </div>
                ))} */}
                {DROPDOWN_ITEMS.map((item, idx) => (
                  <div key={idx} className={styles.utilityItems}>
                    {item.element}
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
              <div className={styles.signOut}>Sign out of Netflix</div>
              <AiFillCaretUp className={styles.dropdownCaret} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
