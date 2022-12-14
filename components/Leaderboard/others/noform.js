import lbStyles from '../leaderboard.module.scss';
import styles from '../styles.module.scss';

// people in the LEADERBOARD but not in the FORM
export function NoForm({ AOC, form: _, generateStars, isUserValid, regenLocalScores }) {
    let tableRows = []; // array of table rows with info
    let aocMembers = Object.values(AOC); //Convert AOC.members obj into array
    aocMembers = regenLocalScores(aocMembers)
    aocMembers.sort((a, b) => b.stars - a.stars || b.local_score - a.local_score); //sort by stars & score

    for (let AOCUser of aocMembers) {
        if (isUserValid(AOCUser)) continue;

        let { local_score: score, stars, name } = AOCUser; // deconstruct aoc data

        let rank = tableRows.length + 1; //user's leaderboard ranking
        tableRows.push(
            <tr key={rank} className={styles.rows}>
                <td>
                    <p>{rank}) </p>
                </td>
                <td>
                    <p>{score} </p>
                </td>
                <td
                    className={
                        styles.mobile +
                        ' ' +
                        (stars % 2 == 0 ? lbStyles.goldStars : lbStyles.silverStar)
                    }
                    style={{ textAlign: 'start' }}
                >
                    {stars}★{' '}
                </td>
                <td className={styles.hide}>{generateStars(stars, rank)}</td>
                <td><p>{name}</p></td>
            </tr>
        );
    }

    return tableRows;
}