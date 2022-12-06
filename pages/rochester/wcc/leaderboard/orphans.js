import Orphans from '../../../../components/Leaderboard/others';
import { readFile } from 'fs/promises';

export default function RochesterLeaderboard({ AOC, form }) {
    return <Orphans {...{ AOC, form }} />;
}

async function fetchLeaderboard(id) {
    let req = await fetch(`https://adventofcode.com/2022/leaderboard/private/view/${id}.json`, {
        headers: {
            cookie: 'session=53616c7465645f5fe0bf9819378fb124702a5bed2ebf04b4cd64100945d041c919b74e0203f262ac15a5a85ea35664bc6f7f93f0c18ed8ab53f822a278ee0b9c',
        },
    });
    return await req.json();
}

let leaderboards = [641987];
let cached = { AOC: {}, form: {} };
let last;

export async function getServerSideProps() {
    if (last > Date.now()) {
        return { props: { AOC: cached.AOC, form: cached.form } };
    }

    let AOC = {};

    for (let leaderboardID of leaderboards) {
        let leaderboardData = await fetchLeaderboard(leaderboardID);
        AOC = {
            ...leaderboardData.members,
            ...AOC,
        };
    }

    try {
        // try to grab production file
        let formData = await readFile('./python/users_roch.json', { encoding: 'utf-8' });
        formData = JSON.parse(formData);
        cached.form = formData;
    } catch (e) {
        // fall back to dev file
        console.log('falling back on dev file... rochester leaderboard');
        try {
            let formData = await readFile('./devUsers.json', { encoding: 'utf-8' });
            formData = JSON.parse(formData);
            cached.form = formData;
        } catch (e) {
            console.log("can't find devusers.json file");
        }
    }

    cached.AOC = AOC;

    last = Date.now() + 15 * 60 * 1000;
    // 15 mins > 60 seconds in a min > 1000 ms in a second

    return { props: { AOC: cached.AOC, form: cached.form } };
}
