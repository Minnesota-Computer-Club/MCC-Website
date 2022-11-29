import Head from 'next/head';
import './global.scss';
import '../styles/tailwind-globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
