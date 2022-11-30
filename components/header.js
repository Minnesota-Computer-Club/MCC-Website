import Link from 'next/link';
import React from "react";

const Header = () => {
  return (
    <header className="text-white bg-darkpurple">
      <nav className="mx-auto p-3 overflow-auto text-white items-center">
        <div className="flex flex-col sm:flex-row font-bold justify-between items-center">
          <div className="flex flex-col sm:flex-row justify-center text-base leading-6 sm:text-lg sm:leading-7">

            <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-darkpurple hover:bg-white mt-4 lg:mt-0">
              <Link href="/wcc">Winter Coding Competition</Link>
            </div>

          </div>
          <div>
            <a href="mailto:info@mncomputerclub.com?subject=Requesting an Invite to MCC Discord Server" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-darkpurple hover:bg-white mt-4 lg:mt-0">Join the Discord Server!</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;