import Others from '../../../components/Leaderboard/others';
import { readFile } from 'fs/promises';

export default function RochesterLeaderboard({ AOC, form }) {
  return <>
    <Others {...{ AOC, form }} />
  </>;
}

// async function fetchLeaderboard(id) {
//   const req = await fetch(`https://adventofcode.com/2022/leaderboard/private/view/${id}.json`, {
//     headers: {
//       cookie: 'session=53616c7465645f5fe0bf9819378fb124702a5bed2ebf04b4cd64100945d041c919b74e0203f262ac15a5a85ea35664bc6f7f93f0c18ed8ab53f822a278ee0b9c',
//     },
//   });
//   return await req.json();
// }

// const leaderboards = [2216296, 641987];

const cached = { AOC: {}, form: {} };
let last;

export async function getServerSideProps() {
  if (last > Date.now()) {
    return { props: { AOC: cached.AOC, form: cached.form } };
  }

  // let AOC = {};

  // for (const leaderboardID of leaderboards) {
  //   const leaderboardData = await fetchLeaderboard(leaderboardID);
  //   AOC = {
  //     ...leaderboardData.members,
  //     ...AOC,
  //   };
  // }

  try {
    // Grab the frozen leaderboard data and parse it into a JSON object.
    let frozenMinnesotaData = await readFile('./python/frozenMNLeaderboard.json', { encoding: 'utf-8' });
    frozenMinnesotaData = JSON.parse(frozenMinnesotaData);

    // Set data to be cached to prevent reading the file on every page visit.
    cached.form = frozenMinnesotaData.props.form;
    cached.AOC = frozenMinnesotaData.props.AOC;
  } catch (e) {
    console/log('Fail: Unable to read frozen MN leaderboard data.');
    console.log(e);
  }

  last = Date.now() + 15 * 60 * 1000;
  // 15 mins > 60 seconds in a min > 1000 ms in a second

  return { props: { AOC: cached.AOC, form: cached.form } };
}
