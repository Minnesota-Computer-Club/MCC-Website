import React, { useEffect, useState } from "react";
import { intervalToDuration, isWithinInterval, startOfTomorrow } from 'date-fns'

import styles from './countdown.module.scss';

const defaultRemainingTime = {
  years: -1,
  months: -1,
  days: -1,
  hours: -1,
  minutes: -1,
  seconds: -1
}

const suffixesForCountdown = {
  years: 'y(s)',
  months: 'm(s)',
  days: 'd(s)',
  hours: 'h(s)',
  minutes: 'm(s)',
  seconds: 's(s)'
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
    setTimeLeft(timeBetweenDates(props.startDate || new Date(), props.endDate || startOfTomorrow(), props.dateOptions));

    const timer = setTimeout(() => {
      setTimeLeft(timeBetweenDates(props.startDate || new Date(), props.endDate || startOfTomorrow(), props.dateOptions));
    }, 1000);

    return () => clearTimeout(timer);
  }, [props.startDate, props.endDate, props.dateOptions]);

  return (
    <div className={styles.countdownWrapper}>
      <span className={styles.countdownPrefix}>{props.prefix || "Countdown"}</span>
      <span>{props.divider || ': '}</span> 

      {
        countdownIsValid(props.startDate || new Date(), props.repeatUntil || props.endDate || new Date()) ?
          Object.keys(timeLeft).map(key => (
            timeLeft[key] !== -1 && (timeLeft[key] !== 0 || key == 'seconds')? 
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