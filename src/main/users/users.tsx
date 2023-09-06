import React, { useEffect, useState } from 'react'

export const Users = () => {

  const curDate = new Date();
  const options = { timeZone: 'America/New_York', hour12: false };
  // const options = { timeZone: 'Europe/London', hour12: false };
  // const newCurrentDate = new Date(curDate.toLocaleString('en-US', options));

  // At current on Start Date //
  const startDateString = '2023-08-29 09:17:20';
  const endDateString = '2023-09-04 09:17:20';
  let startingDate = new Date(startDateString);
  const currentDate17 = new Date(new Date().toDateString() + ' 17:00:00');
  let daysRemaining = 0;
  let breachDate = new Date(endDateString);
  const currentDate = new Date(curDate.toLocaleString('en-US', options));
  let durationLeft: string;
  let currentDateTime = new Date(curDate.toLocaleString('en-US', options));

  // At current after Start Date
  // const startDateString = '2023-08-29 12:30:00';
  // const endDateString = '2023-09-05 12:30:00';
  // let startingDate = new Date(startDateString);
  // const currentDate17 = new Date('2023-08-30' + ' 17:00:00');
  // let daysRemaining = 0;
  // let breachDate = new Date(endDateString);
  // const currentDate = new Date('2023-08-30 15:45:00');
  // let durationLeft: string;
  // let currentDateTime = new Date('2023-08-30 15:45:00');

  // On Start Date before 8 //
  // const startDateString = '2023-08-29 03:30:00';
  // const endDateString = '2023-09-05 17:00:00';
  // let startingDate = new Date(startDateString);
  // const currentDate17 = new Date(new Date().toDateString() + ' 17:00:00');
  // let daysRemaining = 0;
  // let breachDate = new Date(endDateString);
  // const currentDate = new Date('2023-08-29 08:30:00');
  // let durationLeft: string;
  // let currentDateTime = new Date('2023-08-29 08:30:00');

  // On Start Date after 17 //
  // const startDateString = '2023-08-29 17:30:00';
  // const endDateString = '2023-09-05 17:00:00';
  // let startingDate = new Date(startDateString);
  // const currentDate17 = new Date(new Date().toDateString() + ' 17:00:00');
  // let daysRemaining = 0;
  // let breachDate = new Date(endDateString);
  // const currentDate = new Date('2023-08-29 18:30:00');
  // let durationLeft: string;
  // let currentDateTime = new Date('2023-08-29 18:30:00');


  // At breach date
  // const startDateString = '2023-08-29 12:30:00';
  // const endDateString = '2023-09-05 16:30:00';
  // let startingDate = new Date(startDateString);
  // const currentDate17 = new Date('2023-09-05 17:00:00');
  // let daysRemaining = 0;
  // let breachDate = new Date(endDateString);
  // const currentDate = new Date('2023-09-05 07:00:00');
  // let durationLeft: string;
  // let currentDateTime = new Date('2023-09-05 07:00:00');

  let x = 0;
  useEffect(() => {
    if (x === 0) {  


          timer();


      x++;
    }
  }, []);

  // setInterval(() => {
  //     while (currentDate < breachDate) {
  //       timer();
  //     }
  // }, 1000)



  // Function to check if a given date is a Saturday or Sunday
  function isWeekend(date: Date) {
    const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    return day === 0 || day === 6;
  }

  while (currentDateTime < breachDate) {
    if (!isWeekend(currentDateTime)) {
      daysRemaining++;
    }
    currentDateTime.setDate(currentDateTime.getDate() + 1);
  }
  daysRemaining--;

  let lastDayTime = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
  if (startingDate.getDate() !== breachDate.getDate() && currentDate.getDate() !== breachDate.getDate()) {
    lastDayTime = timeDifferenceFn(breachDate, new Date(breachDate.toDateString() + ' 08:00:00'));
  }

  function timer() {
    let timeDifference = '00:00:00';
    if (startingDate.toDateString() === currentDate.toDateString()) {
      if (startingDate < new Date(startingDate.toDateString() + ' 08:00:00')) {
        startingDate = new Date(startingDate.toDateString() + ' 08:00:00');
        timeDifference = '00:00:00';
        if (currentDate > startingDate) {
          let timeObj = timeDifferenceFn(currentDate17, currentDate);
          timeDifference = (timeObj.hours < 10 ? ('0' + timeObj.hours) : timeObj.hours) + ':' + (timeObj.minutes < 10 ? ('0' + timeObj.minutes) : timeObj.minutes) + ':' +
            (timeObj.seconds < 10 ? ('0' + timeObj.seconds) : timeObj.seconds);
        } else {
          daysRemaining = daysRemaining + 1;
        }
      }
      else if (startingDate > new Date(startingDate.toDateString() + ' 17:00:00')) {
        startingDate.setDate(startingDate.getDate() + 1);
        timeDifference = '00:00:00';
        daysRemaining = daysRemaining + 1;
      }
      else {
        let timeObj = timeDifferenceFn(currentDate17, currentDate);
        timeDifference = (timeObj.hours < 10 ? ('0' + timeObj.hours) : timeObj.hours) + ':' + (timeObj.minutes < 10 ? ('0' + timeObj.minutes) : timeObj.minutes) + ':' +
          (timeObj.seconds < 10 ? ('0' + timeObj.seconds) : timeObj.seconds);
      }
    }
    else if (currentDate.getDate() === breachDate.getDate()) {

      let newCurrDate = currentDate;
      if (currentDate < new Date(breachDate.toDateString() + ' 08:00:00')) {
        newCurrDate = new Date(breachDate.toDateString() + ' 08:00:00');
      }
      let timeObj = timeDifferenceFn(breachDate, newCurrDate);
      timeDifference = '0' + timeObj.hours + ':' + (timeObj.minutes < 10 ? ('0' + timeObj.minutes) : timeObj.minutes)
        + ':' + (timeObj.seconds < 10 ? ('0' + timeObj.seconds) : timeObj.seconds);
    }
    else {
      if (currentDate.getHours() >= 17 || currentDate.getHours() < 8) {
        timeDifference = '00:00:00';
      } else {
        let timeObj = timeDifferenceFn(currentDate17, currentDate);
        if (timeObj.hours <= 9) {
          timeDifference = (timeObj.hours < 10 ? ('0' + timeObj.hours) : timeObj.hours) + ':' + (timeObj.minutes < 10 ? ('0' + timeObj.minutes) : timeObj.minutes) + ':' +
            (timeObj.seconds < 10 ? ('0' + timeObj.seconds) : timeObj.seconds);
        } else {
          timeDifference = '00:00:00';
          daysRemaining = daysRemaining + 1;
        }
      }
    }
    let lastBreachTime = (lastDayTime.hours < 10 ? ('0' + lastDayTime.hours) : lastDayTime.hours) + ':' + (lastDayTime.minutes < 10 ? ('0' + lastDayTime.minutes) : lastDayTime.minutes)
      + ':' + (lastDayTime.seconds < 10 ? ('0' + lastDayTime.seconds) : lastDayTime.seconds);
    let totalTime = addTime(timeDifference, lastBreachTime);
    let actualTimeRemaining = '00:00:00';
    if (totalTime.hours >= 9) {
      actualTimeRemaining = ((totalTime.hours % 9) < 10 ? ('0' + (totalTime.hours % 9)) : (totalTime.hours % 9)) + ':' +
        (totalTime.minutes < 10 ? ('0' + totalTime.minutes) : totalTime.minutes)
        + ':' + (totalTime.seconds < 10 ? ('0' + totalTime.seconds) : totalTime.seconds);
    }
    else {
      actualTimeRemaining = (totalTime.hours < 10 ? ('0' + totalTime.hours) : totalTime.hours) + ':' +
        (totalTime.minutes < 10 ? ('0' + totalTime.minutes) : totalTime.minutes)
        + ':' + (totalTime.seconds < 10 ? ('0' + totalTime.seconds) : totalTime.seconds);
    }

    durationLeft = daysRemaining + ' days ' + actualTimeRemaining;
    console.log(durationLeft);
  }

  function timeDifferenceFn(largerDate: Date, smallerDate: Date) {
    const timeDifferenceInMilliseconds = (largerDate as any) - (smallerDate as any);

    const millisecondsInHour = 60 * 60 * 1000;
    const millisecondsInMinute = 60 * 1000;

    const hours = Math.floor(timeDifferenceInMilliseconds / millisecondsInHour);
    const remainingMilliseconds = timeDifferenceInMilliseconds % millisecondsInHour;
    const minutes = Math.floor(remainingMilliseconds / millisecondsInMinute);
    const seconds = Math.floor((remainingMilliseconds % millisecondsInMinute) / 1000);

    return { hours: hours, minutes: minutes, seconds: seconds };
  }

  function addTime(time1: string, time2: string) {
    let firstTime = new Date(new Date().toDateString() + ' ' + time1);
    let secondTime = new Date(new Date().toDateString() + ' ' + time2);

    // Extract hours, minutes, and seconds from firstTime
    const firstHours = firstTime.getHours();
    const firstMinutes = firstTime.getMinutes();
    const firstSeconds = firstTime.getSeconds();

    // Extract hours, minutes, and seconds from secondTime
    const secondHours = secondTime.getHours();
    const secondMinutes = secondTime.getMinutes();
    const secondSeconds = secondTime.getSeconds();

    // Add corresponding hours, minutes, and seconds
    let totalHours = firstHours + secondHours;
    let totalMinutes = firstMinutes + secondMinutes;
    let totalSeconds = firstSeconds + secondSeconds;

    // Handle overflow from seconds to minutes and minutes to hours
    if (totalSeconds >= 60) {
      totalMinutes += Math.floor(totalSeconds / 60);
      totalSeconds %= 60;
    }

    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
    }

    return { hours: totalHours, minutes: totalMinutes, seconds: totalSeconds };
  }


  return (
    <div>

    </div>
  )
}
