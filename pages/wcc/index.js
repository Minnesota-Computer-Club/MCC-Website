import Head from 'next/head';
import styles from './wwc.module.scss';

export default function WCC() {
    return (
        <>
            <Head>
                <title>MN Computer Club AOC WCC</title>
            </Head>
            <div className={styles.wcc}>
                <h1>MN Computer Club AOC WCC</h1>
                <p>
                    Every December, the Minnesota Computer Club hosts a programming competition for
                    all middle and high school students.
                    <br />
                    <br />
                    There are 25 puzzles, given out at midnight EST once per day from December 1st -
                    25th. Our competition ends on December 31st, so there is some extra time to get
                    as many puzzles done as possible. At midnight on December 31st, the scores will
                    be calculated. Our competition is only based on the number of problems completed
                    (stars acquired), not the speed/score unless there is a tie at the end.
                </p>
                <h3>Info and guidelines:</h3>
                <p>
                    You can use any programming language you like. This competition is set up to be
                    language-agnostic.
                    <br />
                    <br />
                    You may not share your solutions with anyone outside of your group. Again, it is
                    up to the honor of the individual to maintain the integrity of the tournament.
                    <br />
                    <br />
                    Ties in the number of stars will be settled with AOC score (shortest time to
                    complete puzzle)
                    <br />
                    <br />
                    All students and teams with at least one star will also be entered for random
                    prizes!
                    <br />
                    <br />
                    Top three places in each of the following categories (with at least 10 entires){' '}
                    <b>will earn a prize</b>
                </p>
                <ul style={{ alignSelf: 'flex-start' }}>
                    <li>
                        <p>High school students</p>
                    </li>
                    <li>
                        <p>Middle school students</p>
                    </li>
                    <li>
                        <p>
                            High School with the most cumulative stars (sum of all individuals and
                            teams)
                        </p>
                    </li>
                </ul>
                <p>Prizes for high school students are as follows.</p>
                <ul style={{ alignSelf: 'flex-start' }} dir="ltr">
                    <li>
                        <p>The top individual will win a $100 cash prize.</p>
                    </li>
                    <li>
                        <p>Second place will win a $75 cash prize.</p>
                    </li>
                    <li>
                        <p>Third place will win a $50 cash prize.</p>
                    </li>
                    <li>
                        <p>
                            The top school will receive an engraving on a perpetual trophy to be
                            displayed at their school.
                        </p>
                    </li>
                </ul>
                <h1>How to participate</h1>
                <p>
                    To participate, please fill out{' '}
                    <a href="https://forms.gle/1hFTUsLNribKy9fm6">this google form</a> and then fill
                    out the form on{' '}
                    <a href="https://sites.google.com/isd535.org/cs-pathways/contests">this page</a>{' '}
                    if you are a student. <i>(required)</i>
                    <br />
                    <br />
                    Want to chat with other participants? Want to find a team? You will need to go
                    to join the Minnesota Computer Club discord server. Email{' '}
                    <a href="mailto:info@mncomputerclub.com">info@mncomputerclub.com</a>
                </p>
                <div className={styles.sponsors}>
                    <h1>Thank you to our prize sponsors!</h1>
                    <div className={styles.logos}>
                        <img src="/flap.png" />
                        <img src="/newspin.png" />
                        <img src="/newts.png" />
                        <img src="/pi.png" />
                        <img src="/rctc.png" />
                        <img src="/sarg.png" />
                        <img src="/winona.png" />
                        <img className={styles.blacklogo} src="/ibm.svg" />
                        <img className={styles.blacklogo} src="/mc.svg" />
                    </div>
                    <i>
                        If your business would like to donate a prize and be listed on our site and
                        t-shirts, please email{' '}
                        <a href="mailto:info@mncomputerclub.com">info@mncomputerclub.com</a>
                    </i>
                </div>
            </div>
        </>
    );
}
