import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React from 'react';
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineEdit,
  AiOutlineProfile,
  AiOutlineSearch,
} from 'react-icons/ai';
import {BiHelpCircle} from 'react-icons/bi';
import {FaRegBell} from 'react-icons/fa';
import {MdOutlineAccountCircle} from 'react-icons/md';

import styles from './styles.module.scss';

// import DUMMY_PROFILES from '@/DUMMY_DATA/DUMMY_PROFILES';

const TABS = [
  'Home',
  'TV Shows',
  'Movies',
  'News & Popular',
  'My List',
  'Browse by Languages',
];

const Navbar = () => {
  const router = useRouter();

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

  const DROPDOWN_ITEMS = [
    {
      element: <AiOutlineEdit className={styles.utilityIcons} />,
      description: 'Manage Profiles',
      onclick: (): void => {
        router.push('manage-profiles');
      },
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

  return (
    <nav
      className={`${styles.navbar} ${scrollAmount > 10 ? styles.bgDark : ''}`}
    >
      <Image
        src='https://i.postimg.cc/MTkxkpnT/Logonetflix.png'
        alt='Netflix Logo'
        className={styles.logo}
        height={30}
        width={100}
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
          <Image
            src='https://i.postimg.cc/yYNvX4dG/red.jpg'
            alt='Dummy Profile Icon'
            height={32}
            width={32}
          />
          <AiFillCaretDown className={styles.caret} />
          <div className={styles.dropdownWrapper}>
            <div
              className={`${styles.profileDropdown} ${
                scrollAmount > 50 ? styles.lowOpacity : ''
              }`}
            >
              <div className={styles.itemsContainer}>
                {DROPDOWN_ITEMS.map((item, idx) => {
                  const {element, description, onclick} = item ?? {};
                  return (
                    <div
                      key={idx}
                      className={styles.utilityItems}
                      onClick={onclick}
                    >
                      {element}
                      <p>{description}</p>
                    </div>
                  );
                })}
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
