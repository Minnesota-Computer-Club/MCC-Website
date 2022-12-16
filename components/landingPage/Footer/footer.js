import Link from "next/link";
import React from "react";

import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footerComponentWrapper}>
      <Link href="/">© 2022 Minnesota Computer Club</Link> | <Link href="mailto:info@mncomputerclub.com" target="__blank">info@mncomputerclub.com</Link>
    </footer>
  );
}

export default Footer;