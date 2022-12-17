import Link from 'next/link';
import { Nav } from '../../components/landingPage/Nav/nav';
import styles from './fourOhFour.module.scss';

/**
 * @return {any}
 */
export default function FourOhFour() {
  return (
    <>
      <Nav />
      <div className={styles.FourOhFour}>
        <h1>Error: 404</h1>
        <p>Page not found! <Link href='/'>Return Home</Link>.</p>
      </div>
    </>
  );
}
