import Head from 'next/head';
import styles from './leaderboard.module.scss';
import IndividualLeaderboard from '../../../../components/rochLeaderboard/individuals';
import TeamLeaderboard from '../../../../components/rochLeaderboard/teams';
import SchoolLeaderboard from '../../../../components/rochLeaderboard/schools';
import { readFile } from 'fs/promises';
import { Nav } from '../../../../components/LandingPage/Nav/nav';

const MAX_STARS = 25;
const STAR = '★';
const SCHOOLTOCOLOR = {
    mayo: '1a743a',
    jm: 'cb2026',
    century: 'ff9ff3',
    lincoln: '64bbed',
    ctech: 'ffc01f',
    kellogg: '0d78bb',
    ['willow creek']: 'ffc01f',
};

export default function leaderboard({ AOC, form }) {
    function getSchoolColor(schoolName) {
        return SCHOOLTOCOLOR[schoolName];
    }

    /*

    Generates the star elements! lol

    */

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

    /*

    Should this user be render & counted in stats?

    */

    function isUserValid(aocUser) {
        let formUser = form[aocUser.name];
        if (!formUser) return false; //user is not in the form
        let { stars } = aocUser;
        let isInTeam =
            formUser['Are you participating as part of a team or as an individual?'] == 'Team';
        if (!isInTeam && stars == 0) return false; //if the user is not apart of a team and they dont have stars dont count them
        return true;
    }

    /*

    calculate team's total stars completed

    */

    function calculateTeamStars(teamMembers) {
        let counted = {};
        let stars = 0;
        for (let { completion_day_level } of teamMembers) {
            for (let day of Object.keys(completion_day_level)) {
                for (let puzzle of Object.keys(completion_day_level[day])) {
                    if (counted[day] && counted[day][puzzle]) continue; //this star has already been counted
                    counted[day] = counted[day] || {}; //create this day if it has not already been created
                    counted[day][puzzle] = true; // count this puzzle
                    stars++; // add to star count
                }
            }
        }
        return stars;
    }

    /*

        Add yourself if you contribute!
    
    */

    function titleEasterEgg(event) {
        let title = event.target.innerText;
        let newTitle = 'Made by github.com/KennyHarrer 👺 with help from github.com/jobartucz 🤔';
        if (title == newTitle) return;
        event.target.innerText = newTitle;
        setTimeout(() => {
            event.target.innerText = title;
        }, 5000);
    }

    return (
        <>
            <Head>
                <title>MN Computer Club Winter Programming Competition 2022 Leaderboard</title>
            </Head>

            <Nav />

            <div className={styles.leaderboard}>
                <h1 onClick={titleEasterEgg}>
                    Rochester Leaderboard
                </h1>
                <div className={styles.section}>
                    <h2>Statistics</h2>
                    <div></div>
                </div>
                <div className={styles.section}>
                    <h2>Schools</h2>
                    <table>
                        <tbody>
                            <SchoolLeaderboard
                                {...{ AOC, form, generateStars, isUserValid, calculateTeamStars }}
                            />
                        </tbody>
                    </table>
                </div>
                <div className={styles.section}>
                    <h2>Teams</h2>
                    <table>
                        <tbody>
                            <TeamLeaderboard
                                {...{
                                    AOC,
                                    form,
                                    generateStars,
                                    getSchoolColor,
                                    isUserValid,
                                    calculateTeamStars,
                                }}
                            />
                        </tbody>
                    </table>
                </div>
                <div className={styles.section}>
                    <h2>Individuals</h2>
                    <table>
                        <tbody>
                            <IndividualLeaderboard {...{ AOC, form, generateStars, isUserValid }} />
                        </tbody>
                    </table>
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
