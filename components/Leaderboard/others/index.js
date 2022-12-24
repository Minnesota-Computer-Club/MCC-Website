import Head from 'next/head';
import styles from '../leaderboard.module.scss';
import { Nav } from '../../landingPage/Nav/nav';
import { NoForm } from './noform';
import { NoLb } from './nolb';
import Link from 'next/link';
import { isUserValid } from '../utils';

const MAX_STARS = 25;
const STAR = '★';

export default function Leaderboard({ AOC, form }) {
  /*
    Generates the star elements! lol
    */

  function generateStars(starCount, k) {
    const goldStars = Math.floor(starCount / 2);
    const silverStar = starCount % 2;
    const incompleteStars = MAX_STARS - goldStars - silverStar;
    return (
      <div className={styles.stars} key={k}>
        <p className={styles.goldStars}>{STAR.repeat(goldStars)}</p>
        <p className={styles.silverStar}>{STAR.repeat(silverStar)}</p>
        <p className={styles.incompleteStars}>{STAR.repeat(incompleteStars) + ' '}</p>
      </div>
    );
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
    const current_puzzles = new Set();
    users.forEach((u) =>
      Object.keys(u.completion_day_level).forEach((k) => current_puzzles.add(k))
    );

    const new_localscores = new Map();

    // For every star, make a list of the users that completed it in order
    const puzzle_completers_ordered = [...current_puzzles]
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

  return (
    <>
      <Head>
        <title>MN Computer Club Winter Programming Competition 2022 Leaderboard</title>
      </Head>

      <Nav />

      <div className={styles.leaderboard}>
        <div className={styles.doublesec}>
          <h1>Wall of Reminders {/* shame */}</h1>
          <p>
                        If you don&apos;t see yourself on the main leaderboard, you may have messed up the form.
                        Please verify you completed the <Link href="https://forms.gle/4g9MYAjyY4KmnvEo9" target="_blank">Rochester form</Link>,
                        or the <Link href="https://forms.gle/1hFTUsLNribKy9fm6" target="_blank">Minnesota form</Link>. (Please don&apos;t do both)
          </p>
          <p>&lt;&lt; <Link href=".">Return to main leaderboard</Link></p>
          <div>
            <h2>Not in Leaderboard</h2>
            <p>People who filled out the google form but haven&apos;t joined the leaderboard yet.</p>
            <div className={styles.scrollTable}>
              <ul>
                <NoLb
                  {...{ AOC, form, generateStars, isUserValid, regenLocalScores }}
                />
              </ul>
            </div>
          </div>
          <div>
            <h2>Not in Form</h2>
            <p>People who have joined the leaderboard but have not filled out the google form yet.</p>
            <div className={styles.scrollTable}>
              <table>
                <tbody>
                  <NoForm
                    {...{ AOC, form, generateStars, isUserValid, regenLocalScores }}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
