import Head from 'next/head';
import styles from './leaderboard.module.scss';
import { readFile } from 'fs/promises';
import { Nav } from '../../../components/Landing Page/Nav/nav';

export default function leaderboard({ AOC, form }) {
    const MAX_STARS = 25;
    const STAR = '★';
    /*
    useEffect(async () => {

    }, []);*/

    function generateStars(starCount) {
        let goldStars = Math.floor(starCount / 2);
        let silverStar = starCount % 2;
        let incompleteStars = MAX_STARS - goldStars - silverStar;
        return (
            <div className={styles.stars}>
                <p className={styles.goldStars}>{STAR.repeat(goldStars)}</p>
                <p className={styles.silverStar}>{STAR.repeat(silverStar)}</p>
                <p className={styles.incompleteStars}>{STAR.repeat(incompleteStars) + ' '}</p>
            </div>
        );
    }

    function renderSchools() {
        let schoolData = {};
        for (let AOCUser of Object.values(AOC.members)) {
            let formUser = form[AOCUser.name];
            if (!formUser) continue;
            let { ['Which school do you attend?']: school } = formUser;
            let { stars } = AOCUser;
            if (!schoolData[school]) schoolData[school] = { stars: 0, players: 0 };
            schoolData[school].stars += stars;
            schoolData[school].players += 1;
            schoolData[school].efficiency = schoolData[school].stars / schoolData[school].players;
        }

        let schoolsSorted = [];

        for (let [schoolName, data] of Object.entries(schoolData)) {
            schoolsSorted.push({ ...data, name: schoolName });
        }

        schoolsSorted.sort((a, b) => {
            return b.starts - a.stars;
        });

        let elements = [];

        for (let school of schoolsSorted) {
            let rank = elements.length + 1;
            elements.push(
                <tr key={rank}>
                    <td>
                        <p className={styles[school.name]}>{rank}) </p>
                    </td>
                    <td>
                        <p className={styles[school.name]} style={{ textAlign: 'start' }}>
                            {school.name}{' '}
                        </p>
                    </td>
                    <td>
                        <p className={styles[school.name]}>★Total Stars: </p>
                    </td>
                    <td>
                        <p className={styles[school.name]}>{school.stars}★ </p>
                    </td>
                    <td>
                        <p className={styles[school.name]}>Total Participants: </p>
                    </td>
                    <td>
                        <p className={styles[school.name]}>{school.players} </p>
                    </td>
                    <td>
                        <p className={styles[school.name]}>Efficiency: </p>
                    </td>
                    <td>
                        <p className={styles[school.name]}>{school.efficiency.toFixed(1)}</p>
                    </td>
                </tr>
            );
        }

        return elements;
    }

    function renderIndividuals() {
        let elements = [];
        let aocMembers = Object.values(AOC.members);
        aocMembers.sort((a, b) => b.stars - a.stars || b.local_score - a.local_score); //sort by stars & score
        for (let AOCUser of aocMembers) {
            let formUser = form[AOCUser.name];
            if (!formUser) continue;
            let {
                ['What is your first and last name?']: name,
                ['Which school do you attend?']: school,
            } = formUser;
            let { local_score: score, stars } = AOCUser;

            let rank = elements.length + 1;
            elements.push(
                <tr key={rank}>
                    <td>
                        <p>{rank}) </p>
                    </td>
                    <td>
                        <p>{score} </p>
                    </td>
                    <td>{generateStars(stars)}</td>
                    <td>
                        <p className={styles[school]}>{name} </p>
                    </td>
                    <td>
                        <p className={styles[school]}>({school})</p>
                    </td>
                </tr>
            );
        }

        return elements;
    }

    return (
        <>
            <Head>
                <title>MN Computer Club Winter Programming Competition 2022 Leaderboard</title>
            </Head>

            <Nav />

            <div className={styles.leaderboard}>
                <h1>MN Computer Club Winter Programming Competition 2022 Leaderboard</h1>
                <div className={styles.section}>
                    <h2>Statistics</h2>
                    <div></div>
                </div>
                <div className={styles.section}>
                    <h2>Schools</h2>
                    <table>
                        <tbody>{renderSchools()}</tbody>
                    </table>
                </div>
                <div className={styles.section}>
                    <h2>Individuals</h2>
                    <table>
                        <tbody>{renderIndividuals()}</tbody>
                    </table>
                </div>
                <div className={styles.section}>
                    <h2>Teams</h2>
                    <div></div>
                </div>
            </div>
        </>
    );
}

let cached = { AOC: {}, form: {} };
let last;

export async function getServerSideProps() {
    if (last > Date.now()) {
        return { props: { AOC: cached.AOC, form: cached.form } };
    }

    let AOCData = await fetch(
        'https://adventofcode.com/2022/leaderboard/private/view/641987.json',
        {
            headers: {
                cookie: 'session=53616c7465645f5fe0bf9819378fb124702a5bed2ebf04b4cd64100945d041c919b74e0203f262ac15a5a85ea35664bc6f7f93f0c18ed8ab53f822a278ee0b9c',
            },
        }
    );

    try {
        //try to grab production file
        let formData = await readFile('./python/users_roch.json', { encoding: 'utf-8' });
        formData = JSON.parse(formData);
        cached[form] = formData;
    } catch (e) {
        // fall back to dev file
        try {
            let formData = await readFile('./devUsers.json', { encoding: 'utf-8' });
            formData = JSON.parse(formData);
            cached.form = formData;
        } catch (e) {
            console.log("can't find devusers.json file");
        }
    }

    cached.AOC = await AOCData.json();

    last = Date.now() + 15 * 60 * 1000;
    // 15 mins > 60 seconds in a min > 1000 ms in a second

    return { props: { AOC: cached.AOC, form: cached.form } };
}
