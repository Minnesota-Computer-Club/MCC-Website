import styles from '../../../pages/rochester/wcc/leaderboard/schoolColors.module.scss'

export default function renderSchools({ AOC, form, isUserValid }) {
    let schools = {}; //obj containing schoolName: obj leaderboard stats
    let aocMembers = Object.values(AOC.members);
    aocMembers.sort((a, b) => b.stars - a.stars || b.local_score - a.local_score); //sort by stars & score
    for (let AOCUser of aocMembers) {
        if (!isUserValid(AOCUser)) continue;
        let formUser = form[AOCUser.name]; //grab the aoc user's form submission
        let { ['Which school do you attend?']: school } = formUser; //grab what school they go to
        let { stars } = AOCUser; //grab their stars
        if (!schools[school]) schools[school] = { name: school, stars: 0, players: 0 }; //initialize this school if need be
        schools[school].stars += stars;
        schools[school].players += 1;
        schools[school].efficiency = schools[school].stars / schools[school].players;
    }

    let schoolsSorted = Object.values(schools); //convert schools in to an array

    schoolsSorted.sort((a, b) => { //sort the schools by stars
        return b.starts - a.stars;
    });

    let tableRows = [];

    for (let school of schoolsSorted) {
        let rank = tableRows.length + 1; //this schools leaderboard ranking
        let cssClassName = school.name.replace(/ /g, '');//remove spaces from school name so it matches its css class
        tableRows.push(
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

    return tableRows;
}