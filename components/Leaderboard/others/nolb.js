import lbStyles from '../leaderboard.module.scss';
import styles from '../styles.module.scss';

// checks if user is in the lb
function userInLb(user, aocMembers) {
    return aocMembers.findIndex(x => x.name == user) != -1;
}

export function NoLb({ AOC, form, generateStars, isUserValid, regenLocalScores }) {
    let li = []; // array of table rows with info
    let aocMembers = Object.values(AOC); //Convert AOC.members obj into array
    aocMembers = regenLocalScores(aocMembers); // map

    for (let username in form) {
        if (userInLb(username, aocMembers)) continue;

        li.push(
            <li>{username}</li>
        );
    }

    return li;
}