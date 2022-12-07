import Head from 'next/head';
import styles from './leaderboard.module.scss';
import IndividualLeaderboard from './individuals';
import TeamLeaderboard from './teams';
import SchoolLeaderboard from './schools';
import { Nav } from '../landingPage/Nav/nav';
import Countdown from '../Countdown/countdown';

import { addSeconds, fromUnixTime, startOfTomorrow } from 'date-fns';
import { NoForm } from './others/noform';
import { NoLb } from './others/nolb';

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
    Regenerate the local score for each user in a combined leaderboard in the same way that the Advent of Code leaderboard does
    */

    function regenLocalScores(users) {
        // THE CALCULATION:
        // For N users
        // The first user to get each star gets N points
        // the seconds gets N-1, and so on

        const N = users.length;
        let current_puzzles = new Set();
        users.forEach((u) =>
            Object.keys(u.completion_day_level).forEach((k) => current_puzzles.add(k))
        );

        let new_localscores = new Map();

        // For every star, make a list of the users that completed it in order
        let puzzle_completers_ordered = [...current_puzzles]
            .map((puzzle_id) => [
                [puzzle_id, 1],
                [puzzle_id, 2],
            ])
            .flat()
            .map(([puzzle, star]) =>
                users
                    .filter(
                        (u) =>
                            puzzle in u.completion_day_level &&
                            star in u.completion_day_level[puzzle]
                    )
                    .sort(
                        (a, b) =>
                            a.completion_day_level[puzzle][star].get_star_ts -
                            b.completion_day_level[puzzle][star].get_star_ts
                    )
                    .map((u) => u.name)
            );

        puzzle_completers_ordered.forEach((star_catchers) =>
            star_catchers.forEach((name, index) => {
                new_localscores.set(
                    name,
                    new_localscores.has(name) ? new_localscores.get(name) + N - index : N - index
                );
            })
        );

        return users.map((u) =>
            new_localscores.has(u.name) ? { ...u, local_score: new_localscores.get(u.name) } : u
        );
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
                <div className={styles.section + " " + styles.stats}>
                    <h2>Statistics</h2>
                    <div className={styles.countdownRowWrapper} style={{ textAlign: 'start' }}>
                        <div>
                            <Countdown
                                prefix="Next Puzzle Unlocks In"
                                endDate={addSeconds(startOfTomorrow(), 1)}
                                repeatUntil={fromUnixTime(1671926400)}
                                endMessage="Advent of Code 2022 has ended."
                            />
                        </div>
                        <div>
                            <Countdown
                                prefix="Competition Ends In"
                                endDate={fromUnixTime(1672552801)}
                                endMessage="The competition has ended."
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>Schools</h2>
                    <div className={styles.scrollTable}>
                        <table>
                            <tbody>
                                <SchoolLeaderboard
                                    {...{
                                        AOC,
                                        form,
                                        generateStars,
                                        isUserValid,
                                        calculateTeamStars,
                                    }}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>Teams</h2>
                    <div className={styles.scrollTable}>
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
                                        regenLocalScores,
                                    }}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>Individuals</h2>
                    <div className={styles.scrollTable}>
                        <table>
                            <tbody>
                                <IndividualLeaderboard
                                    {...{ AOC, form, generateStars, isUserValid, regenLocalScores }}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>Don&apos;t see yourself?</h2>
                    <p><a href="./leaderboard/others">Click Here</a> for more.</p>
                </div>
            </div>
        </>
    );
}
