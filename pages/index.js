import styles from './index.module.scss';
import Link from 'next/link';
import Head from 'next/head';

export default function Index() {
    return (
        <>
            <Head>
                <title>Minnesota Computer Club</title>
            </Head>
            <div className={styles.index}>
                <h1>Minnesota Computer Club</h1>
                <h2>👷 Under Construction 👷‍♀️</h2>
                <h3>
                    Check out the <Link href="/wcc/">Winter Coding Competition</Link>
                </h3>
            </div>
        </>
    );
}
