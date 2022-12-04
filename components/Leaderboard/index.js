import Head from 'next/head';
import styles from './leaderboard.module.scss';
import IndividualLeaderboard from '../leaderboard/individuals';
import TeamLeaderboard from '../leaderboard/teams';
import SchoolLeaderboard from '../leaderboard/schools';
import { Nav } from '../landingPage/Nav/nav';

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
    individual: '808080',
    ['prior lake']: '1d3c66',
};

export default function Leaderboard({ AOC, form, location }) {
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
        if (stars == 0) return false; //if the user is not apart of a team and they dont have stars dont count them
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
                <h1 onClick={titleEasterEgg}>{location} Leaderboard</h1>
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