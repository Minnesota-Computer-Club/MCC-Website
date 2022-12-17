let cached = {};
let last;

/**
 * @param {any} _ req
 * @param {any} res res
 * @return {any}
 */
export default async function fetchLeaderBoard(_, res) {
  if (last > Date.now()) {
    res.send(200).json(cached);
    return;
  }

  const data = await fetch('https://adventofcode.com/2022/leaderboard/private/view/2216296.json', {
    header: {
      // eslint-disable-next-line max-len
      cookie: 'session=53616c7465645f5fe0bf9819378fb124702a5bed2ebf04b4cd64100945d041c919b74e0203f262ac15a5a85ea35664bc6f7f93f0c18ed8ab53f822a278ee0b9c',
    },
  });

  cached = await data.json();

  last = Date.now() + 15 * 60 * 1000;
  // 15 mins > 60 seconds in a min > 1000 ms in a second

  res.send(200).json(cached);
}
