/*

    Color mixing functions

*/
import styles from "../styles.module.scss";

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

export default function TeamLeaderboard({
    AOC,
    form,
    generateStars,
    getSchoolColor,
    isUserValid,
    calculateTeamStars,
}) {
    let tableRows = []; //array of table row elements
    let teams = {}; // obj teamName: array members
    let aocMembers = Object.values(AOC.members); //convert AOC.members to a obj
    aocMembers.sort((a, b) => b.stars - a.stars || b.local_score - a.local_score); //sort by stars & score
    for (let AOCUser of aocMembers) {
        if (!isUserValid(AOCUser)) continue;
        let formUser = form[AOCUser.name]; //grab aoc user's form submission
        /*
            Deconstruct Form Data
        */
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
        if (team != 'Team') continue; //if the user is not in a team we aren't going to render them in the teams leaderboard
        let { local_score: score, stars, completion_day_level } = AOCUser; //deconstruct aoc stats
        if (!teams[teamName]) teams[teamName] = []; //if this user's team does not exist in the obj yet intialize with array
        teams[teamName].push({
            //push this user into their team
            name,
            school,
            discord,
            language,
            username,
            score,
            stars,
            completion_day_level,
        });
    }
    for (let [teamName, members] of Object.entries(teams)) {
        let schools = []; //array of first letter of schools that the team members are in
        let colors = []; //array of school colors
        let ratio = 1 / members.length;
        for (let { school } of members) {
            schools.push(school.charAt(0)); //push first letter of school name
            colors.push([...hexToRGB(getSchoolColor(school.toLowerCase())), ratio]); //push the color of the school
        }
        schools = schools.join('/'); //join schools with / (ex. s/s/s)
        let color = mixRGB(colors); //mix the school colors
        let rank = tableRows.length + 1; //the team's ranking
        let score = members.reduce(function (totalScore, member) {
            return totalScore + member.score;
        }, 0);
        let stars = calculateTeamStars(members);
        tableRows.push(
            <tr key={rank}>
                <td>
                    <p>{rank}) </p>
                </td>
                <td>
                    <p>{score} </p>
                </td>
                <td className={styles.mobile} style={{
                            color: 'rgb(' + color + ')',
                            textShadow: '0 0 4px rgb(' + color + ')',
                        }}>{stars}★ </td>
                <td className={styles.hide}>{generateStars(stars)}</td>
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
    return tableRows;
}
