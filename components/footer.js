import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="px-4 sm:px-6 lg:px-8 pb-2">
        <Link href="/">© 2022 Minnesota Computer Club</Link> | <Link href="mailto:info@mncomputerclub.com" target="__blank">info@mncomputerclub.com</Link>
    </footer>
  );
}
export default Footer;