import Head from 'next/head';
import styles from './leaderboard.module.scss';

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

let cached = {};
let last;
let THING = {
    'Noah Davis': {
        'Timestamp': '11/18/2022 13:29:23',
        'What is your first and last name?': 'Noah Davis ',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Noah Davis',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'NDSpam #2603',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'c-gamble': {
        'Timestamp': '11/18/2022 13:43:24',
        'What is your first and last name?': 'Cooper Gamble',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'c-gamble',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'cgamble23#3764',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'C/C++/C#',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Icebluewolf': {
        'Timestamp': '11/18/2022 14:30:57',
        'What is your first and last name?': 'Max Oftedahl',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Icebluewolf',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Ice Wolfy#5283',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Tehcnalties': {
        'Timestamp': '11/18/2022 15:11:38',
        'What is your first and last name?': 'Cory Li',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Tehcnalties',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'CaptainCookie886#1186',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Peter DeLone': {
        'Timestamp': '11/18/2022 17:52:41',
        'What is your first and last name?': 'Peter DeLone',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Peter DeLone',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)':
            'Good question',
        'Who is on your team?': 'Colten Kiehne',
    },
    'Colten Kiehne': {
        'Timestamp': '11/18/2022 17:53:52',
        'What is your first and last name?': 'Colten Kiehne',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Colten Kiehne',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'A FISH#0349',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python, Java',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)':
            'Good question',
        'Who is on your team?': 'Peter DeLone',
    },
    'mz0g': {
        'Timestamp': '11/18/2022 20:19:35',
        'What is your first and last name?': 'Marc Zoghby',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)': 'mz0g',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python, Java, Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Coder Gautam': {
        'Timestamp': '11/19/2022 8:20:12',
        'What is your first and last name?': 'Gautam Sudarshan Anand Viruthagiri',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Coder Gautam',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'gautam#1081',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Arbiter_100': {
        'Timestamp': '11/20/2022 12:59:10',
        'What is your first and last name?': 'Nicholas Onigkeit ',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Arbiter_100',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Arbiter_100',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Scotch101Tape': {
        'Timestamp': '11/21/2022 18:45:03',
        'What is your first and last name?': 'Scott Anderson',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Scotch101Tape',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'scotch101tape',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'rust, ts',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Eric Kugel': {
        'Timestamp': '11/26/2022 11:06:40',
        'What is your first and last name?': 'Eric Kugel',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Eric Kugel',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Eric Kugel#1032',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Rohil Patel': {
        'Timestamp': '11/27/2022 10:43:00',
        'What is your first and last name?': 'Rohil Patel',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Rohil Patel',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'L\u2019h\u00f4patel#4864',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Javascript',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)': 'GDC',
        'Who is on your team?': 'Jerry Zhang',
    },
    'Junhao Zhang': {
        'Timestamp': '11/27/2022 10:53:17',
        'What is your first and last name?': 'Junhao Zhang',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Junhao Zhang',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Hithere#6537',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python, Javascript, Rust',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)': 'GDC',
        'Who is on your team?': 'Rohil Patel, Junhao Zhang',
    },
};

export async function getServerSideProps() {
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
