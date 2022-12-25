import Countdown from '../../Countdown/countdown';

// import moment from "moment";
import moment from 'moment-timezone';
import { fromUnixTime } from 'date-fns';

import styles from '../leaderboard.module.scss';

function getPuzzleDate() {
    const date = moment()
        .tz('America/New_York') // convert today to EST
        .startOf('day') // go to today's EST midnight which is 12 AM
        .add(1, 'day') // go to tomorrow's midnight in EST
        .add(1, 'second') // add 1 second because it unlocks after 12 AM not on 12 AM
        .toDate(); // convert to date
    return date;
}

export default function renderStatistics({ AOC, STAR }) {
    const totalUsers = Object.keys(AOC).length;
    const totalStars = Object.keys(AOC).reduce((prev, key) => prev + AOC[key].stars, 0);
    const avgStars = Math.round((totalStars / totalUsers) * 100) / 100;
    const avgStarsInt = Math.round(avgStars);

    return (
        <>
            <Countdown
                prefix="Next Puzzle Unlocks In"
                endDate={getPuzzleDate()}
                repeatUntil={fromUnixTime(1671948001)}
                endMessage="Advent of Code 2022 has ended."
            />

            <Countdown
                prefix="Competition Ends In"
                endDate={fromUnixTime(1672552801)}
                endMessage="The competition has ended."
            />
            <div>
                <span className={styles.boldShadow}>Total stars:&nbsp;</span>
                <span className={totalStars % 2 == 0 ? styles.goldStars : styles.silverStar}>
                    {totalStars}
                    {STAR}
                </span>
            </div>

            <div>
                <span className={styles.boldShadow}>Average Stars:&nbsp;</span>
                <span className={avgStarsInt % 2 == 0 ? styles.goldStars : styles.silverStar}>
                    {avgStars}
                    {STAR}
                </span>
            </div>

            <div>
                <span className={styles.boldShadow}>Total Users:&nbsp;</span>
                <span style={{ color: 'rgb(117, 193, 255)' }}>{totalUsers}</span>
            </div>
        </>
    );
}
