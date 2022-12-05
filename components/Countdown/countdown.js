import React, { useEffect, useState } from "react";
import { intervalToDuration, isWithinInterval, startOfTomorrow } from 'date-fns'

import styles from './countdown.module.scss';

const defaultRemainingTime = {
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
}

const suffixesForCountdown = {
  years: 'year(s)',
  months: 'month(s)',
  days: 'day(s)',
  hours: 'hour(s)',
  minutes: 'minute(s)',
  seconds: 'second(s)'
}

const timeBetweenDates = (startDate, endDate, options) => {
  if (!startDate) { startDate = new Date(); }
  if (!endDate) { endDate = new Date(); }
  if (!options) { options = {} }

  try {
    return(intervalToDuration({start: startDate, end:endDate}));
  } catch {
    return defaultRemainingTime;
  }
}

const countdownIsValid = (startDate, endDate) => {
  try {
    return isWithinInterval(new Date(), {start: startDate || new Date(), end: endDate || new Date()});
  } catch {
    return false;
  }
}

const Countdown = (props) => {

  const [timeLeft, setTimeLeft] = useState(defaultRemainingTime);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeBetweenDates(props.startDate || new Date(), props.endDate || startOfTomorrow(), props.dateOptions));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.countdownWrapper}>
      <span className={styles.countdownPrefix}>{props.prefix || "Countdown"}</span>
      <span>{props.divider || ': '}</span> 

      {
        countdownIsValid(props.startDate || new Date(), props.repeatUntil || props.endDate || new Date()) ?
          Object.keys(timeLeft).map(key => (
            timeLeft[key] !== 0 ? 
              <>
                <span>{timeLeft[key]}</span> <span>{suffixesForCountdown[key]}</span>{key !== 'seconds' ? <span>{props.dateSeparator || ', '}</span> : <span></span> }
              </>
              :
              <></>
          ))
        :
          <>
            <span>{props.endMessage || 'The countdown has ended.' }</span>
          </>
      }

    </div>
  );
}

export default Countdown;