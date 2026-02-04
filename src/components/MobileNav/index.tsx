import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function MobileNav(): JSX.Element {
  return (
    <nav className={styles.mobileNav}>
      <div className={styles.mobileNavContainer}>
        <Link to="/about-us" className={styles.mobileNavLink}>
          About Us
        </Link>
        <Link to="/editorial-team" className={styles.mobileNavLink}>
          Editorial Team
        </Link>
        <Link to="/advisory-board" className={styles.mobileNavLink}>
          Advisory Board
        </Link>
      </div>
    </nav>
  );
}
