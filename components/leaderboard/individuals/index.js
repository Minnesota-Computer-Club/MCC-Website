import coloredStyles from '../schoolColors.module.scss';
import lbStyles from '../leaderboard.module.scss';
import styles from '../styles.module.scss';

export default function IndividualLeaderboard({ AOC, form, generateStars, isUserValid }) {
    let tableRows = []; //array of table rows with info
    let aocMembers = Object.values(AOC); //Convert AOC.members obj into array
    aocMembers.sort((a, b) => b.stars - a.stars || b.local_score - a.local_score); //sort by stars & score
    for (let AOCUser of aocMembers) {
        if (!isUserValid(AOCUser)) continue;
        let formUser = form[AOCUser.name]; //grab user's form data
        /*
            Deconstruct form data
        */
        let {
            ['What is your first and last name?']: name,
            ['Which school do you attend?']: school,
            ['Are you participating as part of a team or as an individual?']: team,
        } = formUser;
        if (team == 'Team') continue; // if the user is a team we aren't going to render them on the scoreboard
        let { local_score: score, stars } = AOCUser; // deconstruct aoc data

        let rank = tableRows.length + 1; //user's leaderboard ranking
        tableRows.push(
            <tr key={rank}>
                <td>
                    <p>{rank}) </p>
                </td>
                <td>
                    <p>{score} </p>
                </td>
                <td className={styles.mobile + " " + ((stars % 2 == 0) ? lbStyles.goldStars : lbStyles.silverStar)}>{stars}★ </td>
                <td className={styles.hide}>{generateStars(stars)}</td>
                <td>
                    <p className={coloredStyles[school.replace(/ /g, '')] + ' ' + styles.shorten}>
                        {name}{' '}
                    </p>
                </td>
                <td>
                    <p className={coloredStyles[school.replace(/ /g, '')]}>({school})</p>
                </td>
            </tr>
        );
    }

    return tableRows;
}
