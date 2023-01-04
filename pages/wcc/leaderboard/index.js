import Leaderboard from '../../../components/Leaderboard';
import { readFile } from 'fs/promises';

export default function RochesterLeaderboard({ AOC, form }) {
  return <>
    <Leaderboard {...{ AOC, form, location: 'Minnesota' }} />
  </>;
}

async function fetchLeaderboard(id) {
  const req = await fetch(`https://adventofcode.com/2022/leaderboard/private/view/${id}.json`, {
    headers: {
      cookie: 'session=53616c7465645f5f6ada3bbcc057af75e3f3cb61ca81f9fc405651e34e3e130cff477b7a6aab1ec9d7ae198fdd8fe30d725a3a2c55bb3370c8b9ef9e20898b0d',
    },
  });
  return await req.json();
}

const leaderboards = [2216296, 641987];
const cached = { AOC: {}, form: {} };
let last;

export async function getServerSideProps() {
  if (last > Date.now()) {
    return { props: { AOC: cached.AOC, form: cached.form } };
  }

  let AOC = {};

  for (const leaderboardID of leaderboards) {
    const leaderboardData = await fetchLeaderboard(leaderboardID);
    AOC = {
      ...leaderboardData.members,
      ...AOC,
    };
  }

  try {
    // try to grab production file
    let formData = await readFile('./python/users_mn.json', { encoding: 'utf-8' });
    formData = JSON.parse(formData);
    // grab OTHER production file
    let rochFormData = await readFile('./python/users_roch.json');
    rochFormData = JSON.parse(rochFormData);
    cached.form = { ...rochFormData, ...formData };
  } catch (e) {
    // fall back to dev file
    console.log('falling back on dev file... mn leaderboard');
    try {
      let formData = await readFile('./devUsers.json', { encoding: 'utf-8' });
      formData = JSON.parse(formData);
      cached.form = formData;
    } catch (e) {
      console.log('can\'t find devusers.json file');
    }
  }

  cached.AOC = AOC;

  last = Date.now() + 15 * 60 * 1000;
  // 15 mins > 60 seconds in a min > 1000 ms in a second

  return { props: { AOC: cached.AOC, form: cached.form } };
}
