import styles from '../../../pages/rochester/wcc/leaderboard/schoolColors.module.scss'

export default function IndividualLeaderboard({ AOC, form, generateStars }) {
    let tableRows = []; //array of table rows with info
    let aocMembers = Object.values(AOC.members); //Convert AOC.members obj into array
    aocMembers.sort((a, b) => b.stars - a.stars || b.local_score - a.local_score); //sort by stars & score
    for (let AOCUser of aocMembers) {
        let formUser = form[AOCUser.name]; //grab user's form data
        if (!formUser) continue; //if the user didnt fill out the form we aren't going to render them on the scoreboard
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

    return tableRows;
}
