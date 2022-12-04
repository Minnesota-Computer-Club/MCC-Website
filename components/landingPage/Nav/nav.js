import Link from 'next/link';
import React from "react";
import Image from 'next/image';

import styles from './nav.module.scss';

export const Nav = () => {
  return (
    <header className={styles.headerComponentWrapper}>
      <nav>
        <div className={styles.navSiteTitle}>
          <Link href="/"><Image src="/mn-computer-club-round.png" alt="Minnesota Computer Club Logo" width='500' height='500' /></Link>
        </div>
        <div className={styles.navItemWrapper}>
          <div>
            <Link className={styles.navItem} href="/rochester/wcc/">Rochester Winter Coding Competition</Link>
          </div>
          
          <div>
            <Link className={styles.navItem} href="/wcc">Winter Coding Competition</Link>
          </div>

          <div>
            <a href="mailto:info@mncomputerclub.com?subject=Requesting an Invite to MCC Discord Server" className={styles.navItemCTA}>Join the Discord Server!</a>
          </div>
        </div>
      </nav>
    </header>
  );
}