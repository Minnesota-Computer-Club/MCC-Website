import { Nav } from '../../components/Landing Page/Nav/nav';
import styles from './fourOhFour.module.scss';

export default function FourOhFour() {
    return (
        <div className={styles.FourOhFour}>
            <Nav />
            <h1>Error: 404</h1>
        </div>
    );
}
