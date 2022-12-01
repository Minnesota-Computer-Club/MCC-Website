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
    'Kenny Harrer': {
        'Timestamp': '11/8/2021 13:31:17',
        'What is your first and last name?': 'Kenneth Harrer',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Kenny Harrer',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'TriggeredForDays#7576',
    },
    'Coder Gautam': {
        'Timestamp': '11/8/2021 17:11:07',
        'What is your first and last name?': 'Gautam',
        'Which school do you attend?': 'Kellogg',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Coder Gautam',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Coder Gautam#1081',
    },
    'Gabriel Poole': {
        'Timestamp': '11/15/2021 12:35:10',
        'What is your first and last name?': 'Gabriel Poole',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Gabriel Poole',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    '1499329': {
        'Timestamp': '11/15/2021 20:03:28',
        'What is your first and last name?': 'Ashley Villar',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)': '1499329',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'itshoozi': {
        'Timestamp': '11/23/2021 9:37:23',
        'What is your first and last name?': 'Jeremy Pringle',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'itshoozi',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'itsHoozi#6969',
    },
    'Franziska Rinkleff': {
        'Timestamp': '11/26/2021 11:05:13',
        'What is your first and last name?': 'Franziska Rinkleff',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Franziska Rinkleff',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'chstudent#0863',
    },
    'Icebluewolf': {
        'Timestamp': '11/29/2021 7:39:38',
        'What is your first and last name?': 'Max Oftedahl',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Icebluewolf',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Ice Wolfy#5283',
    },
    'Bailey Deetz': {
        'Timestamp': '11/29/2021 11:33:33',
        'What is your first and last name?': 'Bailey Deetz',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Bailey Deetz',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Alex Berg': {
        'Timestamp': '11/29/2021 12:02:57',
        'What is your first and last name?': 'Alex Berg',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Alex Berg',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Lukas Singer': {
        'Timestamp': '11/29/2021 12:46:58',
        'What is your first and last name?': 'Lukas Singer',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Lukas Singer',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Lukas Singer#9541',
    },
    'anonymous user #1541323': {
        'Timestamp': '11/29/2021 14:17:05',
        'What is your first and last name?': 'Ryne Zhang',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'anonymous user #1541323',
        'Which programming language do you plan on using?': 'scratch, python, java, javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Christian Scheckel': {
        'Timestamp': '11/29/2021 20:43:08',
        'What is your first and last name?': 'Christian Scheckel',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Christian Scheckel',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Snehan Majumder': {
        'Timestamp': '11/30/2021 19:52:43',
        'What is your first and last name?': 'Snehan Majumder',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Snehan Majumder',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'Null Programmers Exception',
        'Who is on your team?': 'Copeland Steele',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Tennistoby': {
        'Timestamp': '11/30/2021 20:04:07',
        'What is your first and last name?': 'Zoey Chen',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Tennistoby',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'ZoeyPotato#3759',
    },
    'Lucy Fulton': {
        'Timestamp': '11/30/2021 20:20:32',
        'What is your first and last name?': 'Lucy Fulton',
        'Which school do you attend?': 'Lincoln ',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Lucy Fulton',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'prosthetic.head#7592',
    },
    'Joshua Engman': {
        'Timestamp': '11/30/2021 20:44:24',
        'What is your first and last name?': 'joshua engman',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Joshua Engman',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Mary Villarama': {
        'Timestamp': '12/1/2021 1:25:37',
        'What is your first and last name?': 'Mary Villarama',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Mary Villarama',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Mason Konz': {
        'Timestamp': '12/1/2021 8:22:49',
        'What is your first and last name?': 'Mason Konz',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Mason Konz',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Lucas Wilson': {
        'Timestamp': '12/1/2021 8:27:34',
        'What is your first and last name?': 'Lucas Wilson',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Lucas Wilson',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Alex Hansen': {
        'Timestamp': '12/1/2021 8:27:52',
        'What is your first and last name?': 'Alex Hansen',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Alex Hansen',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Esteban Montoya ': {
        'Timestamp': '12/1/2021 8:28:06',
        'What is your first and last name?': 'Esteban Montoya ',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Esteban Montoya ',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Gavin Konz': {
        'Timestamp': '12/1/2021 8:28:11',
        'What is your first and last name?': 'Gavin Konz',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Gavin Konz',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Gabriel Musa': {
        'Timestamp': '12/1/2021 8:29:04',
        'What is your first and last name?': 'Gabe Musa',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Gabriel Musa',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Melissa Angell': {
        'Timestamp': '12/1/2021 8:29:54',
        'What is your first and last name?': 'Melissa Angell',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Melissa Angell',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Gabriel Brown': {
        'Timestamp': '12/1/2021 8:29:58',
        'What is your first and last name?': 'Gabriel Brown',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Gabriel Brown',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Prin Harmon': {
        'Timestamp': '12/1/2021 8:30:28',
        'What is your first and last name?': 'Prin Harmon',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Prin Harmon',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Noah Lemke': {
        'Timestamp': '12/1/2021 8:31:08',
        'What is your first and last name?': 'Noah Lemke',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Noah Lemke',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Leyth101': {
        'Timestamp': '12/1/2021 8:32:46',
        'What is your first and last name?': 'Leyth Saber',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Leyth101',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'Lions',
        'Who is on your team?': 'Danial',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Daniel chen': {
        'Timestamp': '12/1/2021 8:35:29',
        'What is your first and last name?': 'Daniel chen',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Daniel chen',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Ibrahim sheikhibrahim': {
        'Timestamp': '12/1/2021 8:42:35',
        'What is your first and last name?': 'Ibrahim sheikhibrahim',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Ibrahim sheikhibrahim',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Kyon Prom User #1643295': {
        'Timestamp': '12/1/2021 10:17:41',
        'What is your first and last name?': 'kyon prom',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Kyon Prom User #1643295',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Adam Adam': {
        'Timestamp': '12/1/2021 10:20:18',
        'What is your first and last name?': 'Adam Adam',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Adam Adam',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Samuel Kalina': {
        'Timestamp': '12/1/2021 14:03:08',
        'What is your first and last name?': 'Samuel Kalina',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Samuel Kalina',
        'Which programming language do you plan on using?': 'C/C++/C#',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'samx#9328',
    },
    'Tyler Olson': {
        'Timestamp': '12/1/2021 15:12:10',
        'What is your first and last name?': 'Tyler Olson',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Tyler Olson',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Noah Winkel': {
        'Timestamp': '12/1/2021 16:09:06',
        'What is your first and last name?': 'Noah Winkel',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Noah Winkel',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Adil Mohamed': {
        'Timestamp': '12/1/2021 21:05:26',
        'What is your first and last name?': 'Adil Mohamed',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Adil Mohamed',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'William Bradley': {
        'Timestamp': '12/1/2021 21:37:49',
        'What is your first and last name?': 'Will Bradley',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'William Bradley',
        'Which programming language do you plan on using?': 'C/C++/C#',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Will Bradley#7320',
    },
    'Eric Dirks': {
        'Timestamp': '12/1/2021 21:44:13',
        'What is your first and last name?': 'Mr. Dirks',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Eric Dirks',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'MrD#1454',
    },
    'Eric Rogelstad': {
        'Timestamp': '12/2/2021 10:12:32',
        'What is your first and last name?': 'Mr. Rogelstad',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Eric Rogelstad',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Spencer Sivertson': {
        'Timestamp': '12/2/2021 10:12:53',
        'What is your first and last name?': 'Spencer Sivertson',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Spencer Sivertson',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Mimi Nguyen': {
        'Timestamp': '12/2/2021 10:13:58',
        'What is your first and last name?': 'Mimi Nguyen',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Mimi Nguyen',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Adam Aoudia': {
        'Timestamp': '12/2/2021 10:14:51',
        'What is your first and last name?': 'Adam Aoudia',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Adam Aoudia',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'paleo2014#2471',
    },
    'Aaron Ress': {
        'Timestamp': '12/2/2021 10:18:44',
        'What is your first and last name?': 'Aaron Ress',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Aaron Ress',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Ethan Her': {
        'Timestamp': '12/2/2021 10:32:15',
        'What is your first and last name?': 'Ethan Her',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Ethan Her',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Damian Kim': {
        'Timestamp': '12/2/2021 10:34:49',
        'What is your first and last name?': 'Damian Kim',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Damian Kim',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Caleb Pardeik': {
        'Timestamp': '12/2/2021 10:37:10',
        'What is your first and last name?': 'Caleb Pardeik',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Caleb Pardeik',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Bjorn Dukek': {
        'Timestamp': '12/2/2021 10:43:17',
        'What is your first and last name?': 'Bjorn Dukek',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Bjorn Dukek',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Andrew Yan': {
        'Timestamp': '12/2/2021 11:02:34',
        'What is your first and last name?': 'Andrew Yan',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Andrew Yan',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Andrew Yan#3424',
    },
    'Dre Harm': {
        'Timestamp': '12/2/2021 11:10:38',
        'What is your first and last name?': 'Dre Harm',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Dre Harm',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Dreyfus Harmonious#3606',
    },
    'Joshua Hansen': {
        'Timestamp': '12/2/2021 11:17:15',
        'What is your first and last name?': 'Joshua Hansen',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Joshua Hansen',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Daniel Evans': {
        'Timestamp': '12/2/2021 12:08:37',
        'What is your first and last name?': 'Daniel Evans',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Daniel Evans',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': 'Pramod Anandarao, Ayooluwa Odeyinka',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'NeroExistsMaybe#1745',
    },
    'Maximilian Comfere': {
        'Timestamp': '12/2/2021 13:09:48',
        'What is your first and last name?': 'Maximilian Comfere',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Maximilian Comfere',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'bluemens#5551',
    },
    'Ranmon F': {
        'Timestamp': '12/2/2021 14:53:15',
        'What is your first and last name?': 'raymond fichtinger',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Ranmon F',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Abhinav Koppulu': {
        'Timestamp': '12/2/2021 14:56:40',
        'What is your first and last name?': 'Abhinav Koppulu',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Abhinav Koppulu',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Nathan Nelson': {
        'Timestamp': '12/2/2021 15:31:57',
        'What is your first and last name?': 'Nathan Nelson',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Nathan Nelson',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'William Yan': {
        'Timestamp': '12/2/2021 17:05:20',
        'What is your first and last name?': 'William Yan',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'William Yan',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '3notoleppo2#3991',
    },
    'Michael McCright': {
        'Timestamp': '12/2/2021 18:58:53',
        'What is your first and last name?': 'Michael McCright',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Michael McCright',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '8354801#2059',
    },
    'Ezra Weldegabriel': {
        'Timestamp': '12/2/2021 19:52:31',
        'What is your first and last name?': 'Ezra Weldegabriel',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Ezra Weldegabriel',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Jandre Alzamora': {
        'Timestamp': '12/2/2021 21:44:21',
        'What is your first and last name?': 'Jandre Alzamora',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Jandre Alzamora',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'anonymous user #1746649 (Or Alyssa McCargar)': {
        'Timestamp': '12/2/2021 22:28:49',
        'What is your first and last name?': 'Alyssa McCargar',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'anonymous user #1746649 (Or Alyssa McCargar)',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Sohum Joshi': {
        'Timestamp': '12/3/2021 8:28:33',
        'What is your first and last name?': 'Sohum Joshi',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Sohum Joshi',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Hans Xu': {
        'Timestamp': '12/3/2021 8:47:55',
        'What is your first and last name?': 'Hans Xu',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)': 'Hans Xu',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Tyler White': {
        'Timestamp': '12/3/2021 8:50:34',
        'What is your first and last name?': 'Tyler White',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Tyler White',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Shaun Prum': {
        'Timestamp': '12/3/2021 10:13:27',
        'What is your first and last name?': 'Shaun Prum',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Shaun Prum',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'R0n1n-codes': {
        'Timestamp': '12/3/2021 10:48:49',
        'What is your first and last name?': 'Sam Phan',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'R0n1n-codes',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Tehcnalties': {
        'Timestamp': '12/3/2021 12:41:02',
        'What is your first and last name?': 'Cory Li',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Tehcnalties',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'CaptainCookie886\uf8ff\u00fc\u00e9\u00d1#1186',
    },
    'Andrew Roth': {
        'Timestamp': '12/3/2021 12:52:28',
        'What is your first and last name?': 'Mr. Roth',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Andrew Roth',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Mr. Roth#0995',
    },
    'Alexa Schmidt': {
        'Timestamp': '12/3/2021 12:53:47',
        'What is your first and last name?': 'Alexa Schmidt',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Alexa Schmidt',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'potato1709#8403',
    },
    'Lee Miller': {
        'Timestamp': '12/3/2021 14:06:52',
        'What is your first and last name?': 'Lee Miller',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Lee Miller',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'peepeepoopoo': {
        'Timestamp': '12/3/2021 14:15:30',
        'What is your first and last name?': 'Carter Davis',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'peepeepoopoo',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'David Murphy Carmona': {
        'Timestamp': '12/3/2021 14:32:45',
        'What is your first and last name?': 'David Murphy Carmona',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'David Murphy Carmona',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'James Bajzer': {
        'Timestamp': '12/3/2021 14:37:20',
        'What is your first and last name?': 'James Bajzer',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'James Bajzer',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Ethan Gaddis': {
        'Timestamp': '12/3/2021 17:22:16',
        'What is your first and last name?': 'Ethan Gaddis',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Ethan Gaddis',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'EthanG.#3339',
    },
    'Jay': {
        'Timestamp': '12/3/2021 19:50:36',
        'What is your first and last name?': 'Jay Sargent',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)': 'Jay',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Drake Mitchell': {
        'Timestamp': '12/3/2021 22:05:53',
        'What is your first and last name?': 'Drake Mitchell',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Drake Mitchell',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Severedx#8220',
    },
    '8986401': {
        'Timestamp': '12/4/2021 10:18:12',
        'What is your first and last name?': 'Chahel',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)': '8986401',
        'Which programming language do you plan on using?': 'coding',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Nhan Le-Rademacher': {
        'Timestamp': '12/4/2021 20:30:01',
        'What is your first and last name?': 'Nhan Le-Rademacher',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Nhan Le-Rademacher',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Pramod Anandarao': {
        'Timestamp': '12/5/2021 21:27:55',
        'What is your first and last name?': 'Pramod Anandarao',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Pramod Anandarao',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Pramod A#6502',
    },
    'Evangeline Ellenbaum': {
        'Timestamp': '12/6/2021 13:31:31',
        'What is your first and last name?': 'Evie Ellenbaum',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Evangeline Ellenbaum',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'Strawberry',
        'Who is on your team?': 'Evie Ellenbaum, Jamie Ahern, Benjamin Werner',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Gavin Buhrow': {
        'Timestamp': '12/6/2021 13:32:11',
        'What is your first and last name?': 'gavin buhrow',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Gavin Buhrow',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'the kool kidz',
        'Who is on your team?': 'Timothy Schroder, Aiden Linden',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Timothy Schroeder': {
        'Timestamp': '12/6/2021 13:32:16',
        'What is your first and last name?': 'Timothy Schroeder',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Timothy Schroeder',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'the kool kidz',
        'Who is on your team?': 'Aiden Linden Gavin Buhrow',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Aiden Linden': {
        'Timestamp': '12/6/2021 13:32:40',
        'What is your first and last name?': 'aiden linden',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Aiden Linden',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'the kool kidz',
        'Who is on your team?': 'Gavin Buhrow Timothy schroeder',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Joshua Couch': {
        'Timestamp': '12/6/2021 14:27:49',
        'What is your first and last name?': 'Joshua Couch',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Joshua Couch',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Marc Zoghby': {
        'Timestamp': '12/6/2021 16:57:33',
        'What is your first and last name?': 'Marc Zoghby',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Marc Zoghby',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Chloe Vesterby': {
        'Timestamp': '12/6/2021 17:07:14',
        'What is your first and last name?': 'Chloe Vesterby',
        'Which school do you attend?': 'Kellogg',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Chloe Vesterby',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Joseph Vesterby': {
        'Timestamp': '12/6/2021 17:13:48',
        'What is your first and last name?': 'Joseph Vesterby',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Joseph Vesterby',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Benjamin Werner': {
        'Timestamp': '12/7/2021 13:31:05',
        'What is your first and last name?': 'Benjamin Werner',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Benjamin Werner',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'Strawberry',
        'Who is on your team?': 'Evie Ellenbaum, Jamie Ahern, and Benjamin Werner',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Jamie Ahern': {
        'Timestamp': '12/7/2021 13:32:30',
        'What is your first and last name?': 'Jamie Ahern',
        'Which school do you attend?': 'Lincoln',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Jamie Ahern',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'Strawberry',
        'Who is on your team?': 'Evie Ellenbaum Benjamin Werner',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Tyson Morris': {
        'Timestamp': '12/7/2021 13:55:16',
        'What is your first and last name?': 'Tyson Morris',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Tyson Morris',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Peter DeLone': {
        'Timestamp': '12/7/2021 14:51:03',
        'What is your first and last name?': 'Peter DeLone',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Peter DeLone',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'camelCase;',
        'Who is on your team?': 'Colten Kiehne',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Joshua McKnight': {
        'Timestamp': '12/8/2021 10:37:02',
        'What is your first and last name?': 'Mr. McKnight',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Joshua McKnight',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'TsunamiRider#4170',
    },
    'Camdon Magle': {
        'Timestamp': '12/9/2021 11:15:58',
        'What is your first and last name?': 'Camdon Magle',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Camdon Magle',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Colten Kiehne': {
        'Timestamp': '12/9/2021 11:22:26',
        'What is your first and last name?': 'Colten Kiehne',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Colten Kiehne',
        'Which programming language do you plan on using?': 'Combination of multiple',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'camelCase;',
        'Who is on your team?': 'Peter DeLone',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Vinay Deep Beeram': {
        'Timestamp': '12/9/2021 15:58:46',
        'What is your first and last name?': 'Vinay Deep Beeram',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Vinay Deep Beeram',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Mr. Bartucz': {
        'Timestamp': '12/10/2021 9:36:06',
        'What is your first and last name?': 'Mr. Bartucz',
        'Which school do you attend?': 'CTECH',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Mr. Bartucz',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'MrB#6346',
    },
    'killerkitten82': {
        'Timestamp': '12/10/2021 13:45:33',
        'What is your first and last name?': 'Peter Marshall',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'killerkitten82',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Killerkitten82#6951',
    },
    'MrMyastan': {
        'Timestamp': '12/10/2021 14:15:22',
        'What is your first and last name?': 'Copeland Steele',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'MrMyastan',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'Null Programmers Exception',
        'Who is on your team?': 'Snehan Majumder',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Mr Myastan#1633',
    },
    'Armita Kazemi': {
        'Timestamp': '12/10/2021 14:35:35',
        'What is your first and last name?': 'Armita Kazemi',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Armita Kazemi',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'awesomearm#3694',
    },
    'Michael Huang': {
        'Timestamp': '12/10/2021 14:36:44',
        'What is your first and last name?': 'Michael Huang',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Michael Huang',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'mhuang03#5225',
    },
    'Noah Davis': {
        'Timestamp': '12/10/2021 15:03:53',
        'What is your first and last name?': 'Noah Davis',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Noah Davis',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'NDSpam#2603',
    },
    'Connor Morrey': {
        'Timestamp': '12/10/2021 15:14:39',
        'What is your first and last name?': 'Connor Morrey',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Connor Morrey',
        'Which programming language do you plan on using?': 'Ruby',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'chair#5921',
    },
    'Natalie Duquaine': {
        'Timestamp': '12/10/2021 16:02:57',
        'What is your first and last name?': 'Natalie Duquaine',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Natalie Duquaine',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'Ctrl Alt Defeat',
        'Who is on your team?': 'Eric Kugel ',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'screenqueen#3253',
    },
    'Jiansong Ding': {
        'Timestamp': '12/10/2021 16:41:52',
        'What is your first and last name?': 'Jiansong Ding',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Jiansong Ding',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Jaddot#3516',
    },
    'Luke Freimuth': {
        'Timestamp': '12/10/2021 16:44:25',
        'What is your first and last name?': 'Luke Freimuth',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Luke Freimuth',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'JebKerman#9131',
    },
    'Rohil Patel': {
        'Timestamp': '12/10/2021 17:04:25',
        'What is your first and last name?': 'Rohil Patel',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Rohil Patel',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'CODINGBEASTS',
        'Who is on your team?': 'Junhao Zhang',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'RohilPatel#4864',
    },
    'Quinn Kallmes': {
        'Timestamp': '12/10/2021 17:06:44',
        'What is your first and last name?': 'Quinn Kallmes',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Quinn Kallmes',
        'Which programming language do you plan on using?': 'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'QKall04#4439',
    },
    'Eric Kugel': {
        'Timestamp': '12/10/2021 18:59:51',
        'What is your first and last name?': 'Eric Kugel',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Eric Kugel',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'Ctrl Alt Defeat',
        'Who is on your team?': 'Natalie Duquaine',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Eric Kugel#1032',
    },
    'Maxwell McClelland': {
        'Timestamp': '12/10/2021 19:55:56',
        'What is your first and last name?': 'Maxwell McClelland',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Maxwell McClelland',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Gabrielle Willaert': {
        'Timestamp': '12/10/2021 20:56:16',
        'What is your first and last name?': 'Gabby Willaert',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Gabrielle Willaert',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'gabby<3 #7572',
    },
    'Junhao Zhang': {
        'Timestamp': '12/10/2021 23:02:04',
        'What is your first and last name?': 'Junhao Zhang',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Junhao Zhang',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name?': 'CODINGBEASTS',
        'Who is on your team?': 'Rohil Patel',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Hithere#6537',
    },
    'Isak Winter': {
        'Timestamp': '12/11/2021 7:34:38',
        'What is your first and last name?': 'Isak Winter',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Isak Winter',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Isak#7321',
    },
    'Philip Wisniewski': {
        'Timestamp': '12/11/2021 10:59:27',
        'What is your first and last name?': 'Philip Wisniewski',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Philip Wisniewski',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Patek#4593',
    },
    'Scott Anderson': {
        'Timestamp': '12/11/2021 11:09:12',
        'What is your first and last name?': 'Scott Anderson',
        'Which school do you attend?': 'JM',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Scott Anderson',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'scotch101tape#9577',
    },
    'Cooper Gamble': {
        'Timestamp': '12/11/2021 13:13:13',
        'What is your first and last name?': 'Cooper Gamble',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Cooper Gamble',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'cgamble23#3764',
    },
    'Cheeto Lord': {
        'Timestamp': '12/11/2021 13:55:38',
        'What is your first and last name?': 'Peter Lund',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Cheeto Lord',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'CheetoLord#5157',
    },
    'Tor Lindell': {
        'Timestamp': '12/14/2021 11:29:20',
        'What is your first and last name?': 'Tor Lindell',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Tor Lindell',
        'Which programming language do you plan on using?': 'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'CrimsonShadows12': {
        'Timestamp': '12/16/2021 15:16:42',
        'What is your first and last name?': 'Jeffrey Wang',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'CrimsonShadows12',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'CrimsonShadows12#0894',
    },
    'Jacob Turner': {
        'Timestamp': '12/17/2021 11:20:50',
        'What is your first and last name?': 'jacob turner',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Jacob Turner',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'jacobt246#5839',
    },
    'Nifley': {
        'Timestamp': '12/18/2021 15:09:13',
        'What is your first and last name?': 'Finley Bartholmai',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)': 'Nifley',
        'Which programming language do you plan on using?': 'Rust/Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Nifley#4392',
    },
    'Annika Bartucz': {
        'Timestamp': '12/19/2021 19:33:02',
        'What is your first and last name?': 'Annika Bartucz',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Annika Bartucz',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Athena#8990',
    },
    'Nathan Ewert': {
        'Timestamp': '12/20/2021 8:37:47',
        'What is your first and last name?': 'Nathan Ewert',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Nathan Ewert',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Nathan E.#3208',
    },
    'Erik Hill': {
        'Timestamp': '12/20/2021 10:18:59',
        'What is your first and last name?': 'Erik Hill',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Erik Hill',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Antonios Papadakis': {
        'Timestamp': '12/20/2021 15:01:56',
        'What is your first and last name?': 'Antonios Papadakis',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Antonios Papadakis',
        'Which programming language do you plan on using?': 'Javascript/Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Revvz#3321',
    },
    'Pranavagurubaran Senthilkumar': {
        'Timestamp': '12/20/2021 18:11:45',
        'What is your first and last name?': 'Pranavagurubaran Senthilkumar',
        'Which school do you attend?': 'Kellogg',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Pranavagurubaran Senthilkumar',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'ThatWasAJokeCalmDown#7325',
    },
    'Langston Rider': {
        'Timestamp': '12/21/2021 14:12:19',
        'What is your first and last name?': 'Langston Rider',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Langston Rider',
        'Which programming language do you plan on using?': 'Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
    },
    'Shannon Kim': {
        'Timestamp': '12/27/2021 14:18:00',
        'What is your first and last name?': 'Shannon Kim',
        'Which school do you attend?': 'Kellogg',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Shannon Kim',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'shannon_12',
    },
    'Evelyn Kim': {
        'Timestamp': '12/27/2021 17:02:59',
        'What is your first and last name?': 'Evelyn Kim',
        'Which school do you attend?': 'Century',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Evelyn Kim',
        'Which programming language do you plan on using?': 'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name?': '',
        'Who is on your team?': '',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'evelynk#0907',
    },
};

export async function getServerSideProps() {
    if (last > Date.now()) {
        return { props: { AOC: cached, form: THING } };
    }

    let data = await fetch('https://adventofcode.com/2022/leaderboard/private/view/2216296.json', {
        headers: {
            cookie: 'session=53616c7465645f5fe0bf9819378fb124702a5bed2ebf04b4cd64100945d041c919b74e0203f262ac15a5a85ea35664bc6f7f93f0c18ed8ab53f822a278ee0b9c',
        },
    });

    cached = await data.json();

    last = Date.now() + 15 * 60 * 1000;
    // 15 mins > 60 seconds in a min > 1000 ms in a second

    return { props: { AOC: cached, form: THING } };
}
