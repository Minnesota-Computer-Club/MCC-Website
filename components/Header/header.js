import Link from 'next/link';
import React from "react";

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.headerComponentWrapper}>
      <nav>
        <div className={styles.navItemWrapper}>
          <div>
            <Link className={styles.navItem} href="/wcc">Winter Coding Competition</Link>
          </div>

          <div>
            <a href="mailto:info@mncomputerclub.com?subject=Requesting an Invite to MCC Discord Server" className={styles.navItem}>Join the Discord Server!</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;