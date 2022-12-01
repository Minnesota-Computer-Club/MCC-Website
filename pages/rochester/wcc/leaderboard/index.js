import Head from 'next/head';
import styles from './leaderboard.module.scss';

export default function leaderboard({ AOC, form }) {
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
    /*

    Color mixing functions

    */

    function hexToRGB(hex) {
        let aRgbHex = hex.match(/.{1,2}/g);
        let aRgb = [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)];
        return aRgb;
    }

    function mixRGB(rgbs) {
        //sum of all ratios must add up to 1
        let r = 0;
        let g = 0;
        let b = 0;
        for (let [red, green, blue, ratio] of rgbs) {
            r += red * ratio;
            g += green * ratio;
            b += blue * ratio;
        }
        return [r, g, b];
    }

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
        let teams = {};
        let aocMembers = Object.values(AOC.members);
        aocMembers.sort((a, b) => b.stars - a.stars || b.local_score - a.local_score); //sort by stars & score
        for (let AOCUser of aocMembers) {
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
            let cssClassName = school.name.replace(/ /g, '');
            elements.push(
                <tr key={rank}>
                    <td>
                        <p className={styles[cssClassName]}>{rank}) </p>
                    </td>
                    <td>
                        <p className={styles[cssClassName]} style={{ textAlign: 'start' }}>
                            {school.name}{' '}
                        </p>
                    </td>
                    <td>
                        <p className={styles[cssClassName]}>★Total Stars: </p>
                    </td>
                    <td>
                        <p className={styles[cssClassName]}>{school.stars}★ </p>
                    </td>
                    <td>
                        <p className={styles[cssClassName]}>Total Participants: </p>
                    </td>
                    <td>
                        <p className={styles[cssClassName]}>{school.players} </p>
                    </td>
                    <td>
                        <p className={styles[cssClassName]}>Efficiency: </p>
                    </td>
                    <td>
                        <p className={styles[cssClassName]}>{school.efficiency.toFixed(1)}</p>
                    </td>
                </tr>
            );
        }

        return elements;
    }

    function renderTeams() {
        let elements = [];
        let teams = {};
        let aocMembers = Object.values(AOC.members);
        aocMembers.sort((a, b) => b.stars - a.stars || b.local_score - a.local_score); //sort by stars & score
        for (let AOCUser of aocMembers) {
            let formUser = form[AOCUser.name];
            if (!formUser) continue;
            let {
                ['What is your first and last name?']: name,
                ['Which school do you attend?']: school,
                ['Are you participating as part of a team or as an individual?']: team,
                ['What is your team name? (Make sure all your team members use the same team name!)']:
                    teamName,
                ['If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.']:
                    discord,
                ['Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)']:
                    language,
                ['What is your Advent of Code Username? (Make sure you are logged in to see it!)']:
                    username,
            } = formUser;
            if (team != 'Team') continue;
            let { local_score: score, stars } = AOCUser;
            if (!teams[teamName]) teams[teamName] = [];
            teams[teamName].push({
                name,
                school,
                discord,
                language,
                username,
                score,
                stars,
            });
        }
        for (let [teamName, members] of Object.entries(teams)) {
            let schools = [];
            let colors = [];
            let ratio = 1 / members.length;
            for (let { school } of members) {
                schools.push(school.charAt(0));
                colors.push([...hexToRGB(SCHOOLTOCOLOR[school.toLowerCase()]), ratio]);
            }
            schools = schools.join('/');
            let color = mixRGB(colors);
            let rank = elements.length + 1;
            let { score, stars } = members[0];
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
                        <p
                            style={{
                                color: 'rgb(' + color + ')',
                                textShadow: '0 0 4px rgb(' + color + ')',
                            }}
                        >
                            {teamName}{' '}
                        </p>
                    </td>
                    <td>
                        <p
                            style={{
                                color: 'rgb(' + color + ')',
                                textShadow: '0 0 4px rgb(' + color + ')',
                            }}
                        >
                            ({schools})
                        </p>
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
                ['Are you participating as part of a team or as an individual?']: team,
            } = formUser;
            if (team == 'Team') continue;
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
                        <p className={styles[school.replace(/ /g, '')]}>{name} </p>
                    </td>
                    <td>
                        <p className={styles[school.replace(/ /g, '')]}>({school})</p>
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
            <div className={styles.leaderboard}>
                <h1
                    onClick={(e) => {
                        let title = e.target.innerText;
                        let newTitle =
                            'Made by github.com/KennyHarrer 👺 with help from github.com/jobartucz 🤔';
                        if (title == newTitle) return;
                        e.target.innerText = newTitle;
                        setTimeout(() => {
                            e.target.innerText = title;
                        }, 5000);
                    }}
                >
                    MN Computer Club Winter Programming Competition 2022 Leaderboard
                </h1>
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
                    <h2>Teams</h2>
                    <table>
                        <tbody>{renderTeams()}</tbody>
                    </table>
                </div>
                <div className={styles.section}>
                    <h2>Individuals</h2>
                    <table>
                        <tbody>{renderIndividuals()}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

let cached = {};
let last;

import fs from 'fs/promises';
import path from 'path';

export async function getServerSideProps() {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const THING = JSON.parse(await fs.readFile(jsonDirectory + '/formdata.json', 'utf8'));

    if (last > Date.now()) {
        return { props: { AOC: cached, form: THING } };
    }

    let data = await fetch('https://adventofcode.com/2022/leaderboard/private/view/641987.json', {
        headers: {
            cookie: 'session=53616c7465645f5fe0bf9819378fb124702a5bed2ebf04b4cd64100945d041c919b74e0203f262ac15a5a85ea35664bc6f7f93f0c18ed8ab53f822a278ee0b9c',
        },
    });

    cached = await data.json();

    last = Date.now() + 15 * 60 * 1000;
    // 15 mins > 60 seconds in a min > 1000 ms in a second

    return { props: { AOC: cached, form: THING } };
}
