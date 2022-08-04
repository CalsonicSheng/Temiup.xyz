import React, { useCallback, useEffect, useState } from 'react';

export default function CountDown({ startDate, totalDuration }) {
  const [remainingTimeString, setRemainingTimeString] = useState('');

  //--------------------------------------------------------------------------

  const updateRemainingTime = useCallback(() => {
    const currentTimestampInMillisecond = Date.now();
    const teamDealEndedAtInMillisecond = Date.parse(startDate) + totalDuration * 86400000;
    const remainingTimeInSecond = (teamDealEndedAtInMillisecond - currentTimestampInMillisecond) / 1000;
    if (remainingTimeInSecond <= 0) {
      setRemainingTimeString('deal has ended');
    } else {
      let hrs = Math.floor(remainingTimeInSecond / 3600);
      let mins = Math.floor(remainingTimeInSecond / 60) % 60;
      let seconds = Math.floor(remainingTimeInSecond / 1) % 60;

      hrs = hrs < 10 ? '0' + hrs : hrs;
      mins = mins < 10 ? '0' + mins : mins;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      setRemainingTimeString(`${hrs} : ${mins} : ${seconds}`);
    }
  }, [startDate, totalDuration]);

  //--------------------------------------------------------------------------

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, [updateRemainingTime]);

  return <h4>{remainingTimeString}</h4>;
}
