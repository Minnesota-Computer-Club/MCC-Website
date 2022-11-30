import styles from './wwc.module.scss';

import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function WCC() {
    return (
        <>
            <Head>
                <title>MN Computer Club Winter Coding Competition</title>
            </Head>
            
            <Header></Header>

            <main className="p-10 text-gray-400">
                <h2 className="text-4xl py-4 text-white text-center">Minnesota Computer Club Winter Coding Competition</h2>
                
                <div className="text-center p-4">
                    <div className="inline-flex items-center justify-center rounded-md border border-transparent bg-darkpurple px-5 py-3 text-base font-medium text-white hover:bg-white hover:text-darkpurple hover:cursor-pointer">
                        <Link href="/wcc/leaderboard">View Leaderboard</Link>
                    </div>
                </div>

                <p className="pb-4">Every December, the Minnesota Computer Club hosts a programming competition for all middle and high school students.</p>
                <p>There are 25 puzzles, given out at midnight EST once per day from December 1st - 25th. Our competition ends on December 31st, so there is some extra time to get as many puzzles done as possible. At midnight on December 31st, the scores will be calculated. Our competition is only based on the number of problems completed (stars acquired), not the speed/score unless there is a tie at the end.</p>

                <h3 className="text-2xl py-4 text-white text-center">Information and Guidelines</h3>
                <p className="pb-4">You may not share your solutions with anyone outside of your group. Again, it is up to the honor of the individual to maintain the integrity of the tournament.</p>
                <p className="pb-4">You can use any programming language you like. This competition is set up to be language-agnostic.</p>
                <p className="pb-4">Ties in the number of stars will be settled with AOC score (shortest time to complete puzzle).</p>
                <p className="pb-4">All students and teams with at least one star will also be entered for random prizes!</p>
                <p>Top three places in each of the following categories (with at least 10 entires) will earn a prize:</p>
                <ul class="list-disc pl-8 pb-4">
                    <li>High school students</li>
                    <li>Middle school students</li>
                    <li>High School with the most cumulative stars (sum of all individuals and teams)</li>
                </ul>

                <p>Prizes for high school students are as follows:</p>
                <ul class="list-disc pl-8 pb-4">
                    <li>The top individual will win a $100 cash prize.</li>
                    <li>Second place will win a $75 cash prize.</li>
                    <li>Third place will win a $50 cash prize.</li>
                    <li>The top school will receive an engraving on a perpetual trophy to be displayed at their school.</li>
                </ul>

                <h3 className="text-2xl py-4 text-white text-center">How to Participate</h3>
                <p className="pb-8">To participate, please fill out <a href="https://forms.gle/1hFTUsLNribKy9fm6" target="__blank" className="font-bold text-medpurple hover:underline cursor-pointer">this google form</a>. <i>(required)</i></p>
                <p>Want to chat with other participants? Want to find a team? You will need to go to join the Minnesota Computer Club Discord server. Email <a href="mailto:info@mncomputerclub.com?subject=Requesting an Invite to MCC Discord Server" target="__blank" className="font-bold text-medpurple hover:underline cursor-pointer">info@mncomputerclub.com</a>, and ask for an invitation link to the server.</p>

                <h2 className="text-4xl py-4 text-white text-center">Our Sponsors</h2>
                <p className="text-center">Thank you to our prize sponsors!</p>
                <div className={styles.wcc}>
                    <div className={styles.sponsors}>
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
                    </div>
                </div>
                <p> If your business would like to donate a prize and be listed on our site and t-shirts, please email <a href="mailto:info@mncomputerclub.com" target="__blank" className="font-bold text-medpurple hover:underline cursor-pointer">info@mncomputerclub.com</a>.</p>
            </main>

            <Footer></Footer>
        </>
    );
}
