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
let THING = {
    'Noah Davis': {
        'Timestamp': '11/29/2022 12:54:03',
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
    'Natalie Duquaine': {
        'Timestamp': '11/28/2022 14:05:22',
        'What is your first and last name?': 'Natalie Duquaine',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Natalie Duquaine',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'screenqueen #3253',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Joshua Engman': {
        'Timestamp': '11/29/2022 12:32:05',
        'What is your first and last name?': 'Joshua Engman',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Joshua Engman',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Alex Berg': {
        'Timestamp': '11/29/2022 13:37:35',
        'What is your first and last name?': 'Alex Berg',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Alex Berg',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'BergerKing#5875',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python, Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'James Bajzer': {
        'Timestamp': '11/29/2022 14:01:05',
        'What is your first and last name?': 'James Bajzer',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'James Bajzer',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'jonnynumber23',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Brennan Danielson': {
        'Timestamp': '11/29/2022 14:45:07',
        'What is your first and last name?': 'Brennan Danielson',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Brennan Danielson',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '!\u00dfrennanTheNub!#6796',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Philip Wisniewski': {
        'Timestamp': '11/29/2022 17:16:17',
        'What is your first and last name?': 'Philip Wisniewski',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Philip Wisniewski',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'A Taco': {
        'Timestamp': '11/29/2022 18:30:38',
        'What is your first and last name?': 'Arden Peng',
        'Which school do you attend?': 'Kellogg',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)': 'A Taco',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Adamfire': {
        'Timestamp': '11/29/2022 18:36:25',
        'What is your first and last name?': 'Adam Myren',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Adamfire',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Adam Myren',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python, Java, Javascript',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Noah Spinner': {
        'Timestamp': '11/29/2022 19:12:16',
        'What is your first and last name?': 'noah spinner',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Noah Spinner',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python, Java',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Eric Dirks': {
        'Timestamp': '11/29/2022 22:03:44',
        'What is your first and last name?': 'Mr. Dirks',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Eric Dirks',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'MrD#1454',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'c': {
        'Timestamp': '11/30/2022 13:34:22',
        'What is your first and last name?': 'Connor Morrey',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)': 'c',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'chair#5921',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Java, Javascript, ruby',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)': 'wuh',
        'Who is on your team?': 'Adam Pirko, Connor Morrey',
    },
    'anonymous user #2328047': {
        'Timestamp': '11/30/2022 10:36:00',
        'What is your first and last name?': 'Ryan Jin',
        'Which school do you attend?': 'Willow Creek',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'anonymous user #2328047',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Sunghwan In': {
        'Timestamp': '11/30/2022 10:41:51',
        'What is your first and last name?': 'Sunghwan In',
        'Which school do you attend?': 'Willow Creek',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Sunghwan In',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Sunghwan1234#6901',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Ivianna Duquaine': {
        'Timestamp': '11/30/2022 12:28:15',
        'What is your first and last name?': 'Ivianna Duquaine',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Ivianna Duquaine',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'TheGearEngineer     #5953',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)':
            'Runtime Terrors',
        'Who is on your team?': 'Natalie Duquaine',
    },
    'Adam Pirko': {
        'Timestamp': '11/30/2022 13:34:22',
        'What is your first and last name?': 'adam pirko',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Adam Pirko',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Java',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)': 'wuh',
        'Who is on your team?': 'Adam Pirko, Connor Morrey',
    },
    'Alexander Doughty': {
        'Timestamp': '11/30/2022 13:34:34',
        'What is your first and last name?': 'Alex Doughty',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Alexander Doughty',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'lexsayshi#4682',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python, Java, Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Ryneley': {
        'Timestamp': '11/30/2022 13:59:23',
        'What is your first and last name?': 'Ryne Zhang',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)': 'Ryneley',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'brainfuck',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'anonymous user #2212316': {
        'Timestamp': '11/30/2022 14:03:28',
        'What is your first and last name?': 'Charlie Slama',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'anonymous user #2212316',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Admin Hellriser#0943',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python, Java, Javascript, C/C++/C#, Scratch, lua',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Ethan Fang': {
        'Timestamp': '11/30/2022 15:11:00',
        'What is your first and last name?': 'Ethan Fang',
        'Which school do you attend?': 'Willow Creek',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Ethan Fang',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'JetsteamSam176#3606',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)': 'FME',
        'Who is on your team?': 'Me, Malcolm Lipford, Fabricio Jimenez',
    },
    'Adam Doughty': {
        'Timestamp': '11/30/2022 15:14:38',
        'What is your first and last name?': 'Adam Doughty',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Adam Doughty',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Javascript, Scratch',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
    },
    'Delaney Harrer': {
        'Timestamp': '11/30/2022 15:19:44',
        'What is your first and last name?': 'Delaney Harrer',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Delaney Harrer',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            '',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Scratch',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)': 'DnA',
        'Who is on your team?': 'Adrienne Sell',
    },
    'Fabricio Jimenez': {
        'Timestamp': '11/30/2022 16:01:08',
        'What is your first and last name?': 'Fabricio Jimenez',
        'Which school do you attend?': 'Willow Creek',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Fabricio Jimenez',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Shrimpy',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Javascript',
        'Are you participating as part of a team or as an individual?': 'Team',
        'What is your team name? (Make sure all your team members use the same team name!)': 'FME',
        'Who is on your team?': 'Ethan Fang, Malcolm Lipford',
    },
    'Gregory Arnold': {
        'Timestamp': '11/30/2022 16:54:43',
        'What is your first and last name?': 'Gregory Arnold',
        'Which school do you attend?': 'Mayo',
        'What is your Advent of Code Username? (Make sure you are logged in to see it!)':
            'Gregory Arnold',
        'If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.':
            'Toxalanch',
        'Which programming language(s) do you plan on using? (This is just informational, you will not be held to your choice)':
            'Python, Java, Javascript, C/C++/C#',
        'Are you participating as part of a team or as an individual?': 'Individual',
        'What is your team name? (Make sure all your team members use the same team name!)': '',
        'Who is on your team?': '',
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
