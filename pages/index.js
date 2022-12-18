/* eslint-disable max-len */
import styles from './index.module.scss';

import Footer from '../components/landingPage/Footer/footer';
import { Nav } from '../components/landingPage/Nav/nav';

import Link from 'next/link';
import Head from 'next/head';

/**
 * @return {any}
 */
export default function Index() {
  return (
    <>
      <Head>
        <title>Minnesota Computer Club</title>
      </Head>

      <Nav />

      <main>
        <div className={styles.heroWrapper}>
          <div className={styles.heroImageWrapper}>
            <Link href="/">
              <img
                src="/mn-computer-club-round.png"
                alt="Minnesota Computer Club Logo"
                width='2000'
                height='2000' />
            </Link>
          </div>

          <h2 className="text-4xl py-4">Minnesota Computer Club</h2>
          <p>
            The Minnesota Computer Club is a Discord-based community
            of students and teachers from all across Minnesota.
          </p>
        </div>

        <div className={styles.clubInfoWrapper}>
          <div>
            <h3>Who can join?</h3>
            <p>The Minnesota Computer Club is open and welcoming to <span className="font-bold italic">anyone</span> that is interested in Computer Science! You might already teach Computer Science to others. You might be thinking about perusing higher education in Computer Science. You might be tech support for the entire family. You might be an industry professional. You might know absolutely nothing about Computer Science but are interested in learning more. We want ALL of you to join!</p>
            <p>You can obtain an invite to the Discord server by clicking the <span className={styles.inlineEmphasis}>Join the Discord!</span> button above or below. This will open an email client for you to send an email to <a className={styles.inlineLink} href="mailto:info@mncomputerclub.com?subject=Requesting an Invite to MCC Discord Server">info@mncomputerclub.com</a> to request an invite code. This will help protect our community from spam abuse.</p>
          </div>

          <div className={styles.clubHighlightsWrapper}>
            <div className={styles.highlightsRowWrapper}>
              <div className={styles.highlightsRowItemsWrapper}>

                <div className={styles.highlightWrapper}>
                  <div className={styles.highlightIconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                      <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                  </div>

                  <div className={styles.highlightDescriptionWrapper}>
                    <p className={styles.highlightDescriptionTitle}>Connect with New People</p>
                    <p className={styles.highlightDescription}>Our community has teachers, fellow students, and industry professionals. It is a great place to meet people with similar interests and learn about topics in Computer Science that are entirely new to you!</p>
                  </div>
                </div>

                <div className={styles.highlightWrapper}>
                  <div className={styles.highlightIconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
                      <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                    </svg>
                  </div>

                  <div className={styles.highlightDescriptionWrapper}>
                    <p className={styles.highlightDescriptionTitle}>Learn New Skills</p>
                    <p className={styles.highlightDescription}>Our Discord server has dedicated channels for you to learn alongside people that are interested in similar topics in Computer Science by sharing good tutorials, articles, or some of your side projects.</p>
                  </div>
                </div>

              </div>
            </div>


            <div className={styles.highlightsRowWrapper}>
              <div className={styles.highlightsRowItemsWrapper}>

                <div className={styles.highlightWrapper}>
                  <div className={styles.highlightIconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className={styles.highlightDescriptionWrapper}>
                    <p className={styles.highlightDescriptionTitle}>Show Off Your Skills</p>
                    <p className={styles.highlightDescription}>Compete in competitions like our Winter Coding Challenge (WCC) to show off mad skills (and win prizes!) all while learning tips and tricks from other members.</p>
                  </div>
                </div>

                <div className={styles.highlightWrapper}>
                  <div className={styles.highlightIconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28-.53a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L8.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-2.25 2.25z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className={styles.highlightDescriptionWrapper}>
                    <p className={styles.highlightDescriptionTitle}>Contribute to Community Projects</p>
                    <p className={styles.highlightDescription}>Projects (like this website!) are entirely community created and updated. Have an interest in helping out? We would love to have you!</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div>
          <div className={styles.ctaWrapper}>
            <h2>
              <span>We want you!</span>
              <span className={styles.mediumPurpleText}>Join our growing community.</span>
            </h2>
            <div className={styles.btnWrapper}>
              <a href="mailto:info@mncomputerclub.com?subject=Requesting an Invite to MCC Discord Server">Join the Discord Server</a>
            </div>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </>
  );
}
