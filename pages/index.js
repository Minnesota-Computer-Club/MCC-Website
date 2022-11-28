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
                <p>
                    The Minnesota Computer Club is a Discord-based community of students and
                    teachers from all across Minnesota. If you would like to join, please email:
                    info@mncomputerclub.com
                </p>
                <h3>
                    Check out the <Link href="/wcc/">Winter Coding Competition</Link>. It is open to
                    all middle and high-school students in Minnesota.
                </h3>
                <h3>
                    If you leave near Rochester, please join the <Link href="/rochester/">Rochester Computer Club</Link> as well. 
                    There is an additional Winter Coding Competition for Rochester students, who are welcome to join both!
                </h3>
            </div>
        </>
    );
}
