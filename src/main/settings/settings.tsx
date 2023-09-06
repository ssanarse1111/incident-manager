import React, { useEffect, useState } from 'react'
import './settings.css'

const Settings = () => {

	const startDateString = '2023-08-25 02:30:00';
	const endDateString = '2023-08-31 17:00:00';
	const duration = '5 00:00:00';
	let stage = 'In progress';
	let startingDate = new Date(startDateString);
	let breachDate = new Date(endDateString);
	const currentDate = new Date();
	let durationLeft: string;
	let isInitialUpdate: boolean = (localStorage.getItem('isInitialUpdate') === null || localStorage.getItem('isInitialUpdate') === 'false') ? false : true;

	const options = { timeZone: 'America/New_York', hour12: false };
	// const options = { timeZone: 'Europe/London', hour12: false };
	const newCurrentDate = new Date(currentDate.toLocaleString('en-US', options));

	console.log('newCurrentDate', newCurrentDate);
	console.log('breachDate', breachDate);;



	// const currentUTC = new Date().getTime();
	// const startingUTC = startingDate.getTime();
	// const breachUTC = breachDate.getTime();

	// // Apply EST timezone offset (UTC-4 or UTC-5 depending on daylight saving time)
	// const estOffset = (new Date()).getTimezoneOffset() === 240 ? 240 : 300;
	// const currentEstTime = currentUTC + estOffset * 60 * 1000;
	// const startingEstTime = startingUTC + estOffset * 60 * 1000;
	// const breachEstTime = breachUTC + estOffset * 60 * 1000;

	// console.log('startingUTC', new Date(startingUTC));
	// console.log('startingEstTime', new Date(startingEstTime));

	// const ny = new Date(currentDate.toLocaleString('en-US', options)).getTimezoneOffset();
	// console.log('ny', ny);




	useEffect(() => {
		
	}, []);
	// setInterval(timer, 1000);

	// Calculate Duration Left
	function timer() {
		if (newCurrentDate < breachDate) {
			if (!isInitialUpdate && !localStorage.getItem('durationLeft')) {
				const dayIndex = duration.search(' ');
				const totalHoursLeft = (parseInt(duration.slice(0, dayIndex)) * 9) + parseInt(duration.slice(dayIndex + 1, dayIndex + 3));
				durationLeft = totalHoursLeft + duration.slice(dayIndex + 3, duration.length);
				localStorage.setItem('durationLeft', durationLeft);
				localStorage.setItem('isInitialUpdate', 'true');
				isInitialUpdate = true;
				return;
			} else {
				console.log('durationLeft', durationLeft);

				durationLeft = localStorage.getItem('durationLeft') as any;
				// console.log(localStorage.getItem('durationLeft'));

			}

			// if (!isInitialUpdate) {
			//     const dayIndex = duration.search(' ');
			//     const totalHoursLeft = (parseInt(duration.slice(0, dayIndex)) * 9) + parseInt(duration.slice(dayIndex + 1, dayIndex + 3));
			//     durationLeft = totalHoursLeft + duration.slice(dayIndex + 3, duration.length);
			//     localStorage.setItem('durationLeft', durationLeft);
			//     localStorage.setItem('isInitialUpdate', 'true');
			//     isInitialUpdate = true;
			// } 

			// If Weekend, then change the start date to Monday 8 am
			if ((startingDate.getDay() === 5 && startingDate.getHours() >= 17) || (startingDate.getDay() === 1 && startingDate.getHours() <= 7)
				|| startingDate.getDay() === 6 || startingDate.getDay() === 0) {
				const dayNumber = startingDate.getDay();
				let dateIncrement = dayNumber === 5 ? 3 : dayNumber === 6 ? 2 : dayNumber === 0 ? 1 : 0;
				setStartingDate8AmTime(dateIncrement);
			}
			// If working days and not between working hours
			else if ((startingDate.getDay() !== 0 || startingDate.getDay() !== 6)) {
				if (startingDate.getHours() < 8 && startingDate.getHours() >= 0) {
					setStartingDate8AmTime(0);
				}
				if (startingDate.getHours() >= 17 && startingDate.getHours() <= 23) {
					setStartingDate8AmTime(1);
				}
			}

			// Calculate the time for the 1st day of starting the SLA
			if (newCurrentDate.getDate() === startingDate.getDate()) {
				getDurationLeft(startingDate);
			}

			// Calculate the time for the 1st day of starting the SLA
			else if (newCurrentDate.getDate() > startingDate.getDate()) {
				let todayDate = new Date();
				todayDate.setHours(8);
				todayDate.setMinutes(0);
				todayDate.setSeconds(0);
				todayDate.setMilliseconds(0);
				getDurationLeft(todayDate);
			}
		}
		else {
			durationLeft = '0 days 00:00:00';
		}
		// console.log('durationLeft', durationLeft);


	}

	// Set Starting Time Time at 8 am
	function setStartingDate8AmTime(dateIncrement: number) {
		startingDate.setDate(startingDate.getDate() + dateIncrement);
		startingDate.setHours(8);
		startingDate.setMinutes(0);
		startingDate.setSeconds(0);
		startingDate.setMilliseconds(0);

	}

	// Get Duration Left
	function getDurationLeft(startOrTodayDate: Date) {
		let modifiedCurrentDate = newCurrentDate;
		if (newCurrentDate.getHours() >= 17 && newCurrentDate.getHours() <= 23) {
			modifiedCurrentDate.setHours(17);
			modifiedCurrentDate.setMinutes(0);
			modifiedCurrentDate.setSeconds(0);
			modifiedCurrentDate.setMilliseconds(0);
		}

		if (modifiedCurrentDate > startingDate) {
			const timeDifference = getTimeDifference(startOrTodayDate, modifiedCurrentDate);
			console.log('timeDifference', timeDifference);
			const timePassed = converToTotalTimeFormat(timeDifference);


			// console.log('parse', durationLeft);

			let totalTimeRemainingInSeconds = parseTimeToSeconds(durationLeft);
			let timePassedInSeconds = parseTimeToSeconds(timePassed);
			let timePassedInHours = formatSecondsToTime(timePassedInSeconds);
			// console.log('timePassedInHours', timePassedInHours);
			// stage === 'Paused' && localStorage.setItem('timePassedInSeconds', timePassedInSeconds.toString());
			let differenceInSeconds = totalTimeRemainingInSeconds - timePassedInSeconds;
			let totalHoursFormat = formatSecondsToTime(differenceInSeconds);
			// console.log('totalHoursFormat', totalHoursFormat);


			// durationLeft = stage === 'Paused' ? durationLeft : convertToDaysFormat(totalHoursFormat);
			durationLeft = convertToDaysFormat(totalHoursFormat);
		} else {
			durationLeft = convertToDaysFormat(durationLeft);
		}
	}

	// Function to find time remaining in '0 days 00:00:00' format
	function convertToDaysFormat(time: string) {
		const totalHours = parseInt(time.slice(0, 2));
		const remainingHours = totalHours % 9;
		const days = (totalHours - remainingHours) / 9;
		return days + ' days ' + remainingHours + time.slice(2, time.length);
	}

	// Function to find time remaining in '00:00:00' format
	function converToTotalTimeFormat(dayTimeObject: any) {
		const hr = dayTimeObject.totalTime.hours < 10 ? ('0' + dayTimeObject.totalTime.hours) : dayTimeObject.totalTime.hours;
		const min = dayTimeObject.totalTime.minutes < 10 ? ('0' + dayTimeObject.totalTime.minutes) : dayTimeObject.totalTime.minutes;
		const sec = dayTimeObject.totalTime.seconds < 10 ? ('0' + dayTimeObject.totalTime.seconds) : dayTimeObject.totalTime.seconds;
		return `${hr}:${min}:${sec}`;
	}

	// Function to parse a time string and convert it to seconds
	function parseTimeToSeconds(timeString: string) {
		let [hours, minutes, seconds] = timeString.split(':').map(Number);
		return hours * 3600 + minutes * 60 + seconds;
	}

	// Function to convert seconds to a formatted time string
	function formatSecondsToTime(seconds: number) {
		let hours = Math.floor(seconds / 3600);
		let minutes = Math.floor((seconds % 3600) / 60);
		let remainingSeconds = seconds % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}


	// Calculate time Difference
	function getTimeDifference(start: Date, current: Date) {
		const startDate = start;
		const currDate = current;

		// Calculate the difference in milliseconds
		let timeOutput;
		timeOutput = currDate.getTime() - startDate.getTime();

		// Calculate the difference in days, hours, and minutes
		const daysDifference = Math.floor(timeOutput / (24 * 60 * 60 * 1000));
		const hoursDifference = Math.floor((timeOutput % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
		const minutesDifference = Math.floor((timeOutput % (60 * 60 * 1000)) / (60 * 1000));
		const secondsDifference = Math.floor((timeOutput % (60000)) / (1000));

		return {
			days: daysDifference,
			totalTime: {
				hours: daysDifference * 9 + hoursDifference,
				minutes: minutesDifference,
				seconds: secondsDifference
			}
		};
	}



	return (
		<div>
			Settings
		</div>
	)
}

export default React.memo(Settings);




// let time = '03 12:20:30';
// const created = '2023-08-11 02:32:19';

// const currDate = new Date();
// const newDate = new Date(created);

// time = time.length === 8 ? '00 ' + time : time;
// const daysLastIndex = time.search(' ');
// const days = parseInt(time.slice(0, daysLastIndex).trim());
// const hours = parseInt(time.slice(daysLastIndex + 1, daysLastIndex + 3));
// const minutes = parseInt(time.slice(daysLastIndex + 4, daysLastIndex + 6));
// const seconds = parseInt(time.slice(daysLastIndex + 7, daysLastIndex + 9));
// const totalHours = (days * 24) + hours;
// const remainingHours = totalHours % 9;

// const totalDays = (totalHours - remainingHours) / 9;
// const finalTime = totalDays + ' days ' + remainingHours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
// // console.log('finalTime :', finalTime);

// const createdTime = created.slice(11, created.length);
// const currentTime = new Date().toTimeString().slice(0, 8);
// let daysLeft = totalDays;
// if (createdTime === currentTime) {
//     daysLeft = daysLeft - 1;
// }



   // const data = [4, 2, 7,  3, 1, 4, 5];

    // const all = [
    //     { id: 1, name: 'Swamiraj', place: 'Rahuri', age: 24},
    //     { id: 2, name: 'Prasad', place: 'Nagar', age: 23},
    //     { id: 3, name: 'Krishna', place: 'Nagar', age: 22},
    //     { id: 4, name: 'Saurabh', place: 'Rahuri', age: 24},
    //     { id: 5, name: 'Ganesh', place: 'Vambori', age: 23},
    // ];

    // useEffect(() => {
    // //   const x = data.reduce((prev, cur) => {
    // //     // console.log('prev', prev);
    // //     // console.log('cur', cur);
    // //     // cur = cur + prev;
    // //     if (cur > prev) {
    // //         return prev
    // //     }

    // //     return cur;
    // //   });
    // //   console.log('x', x);

    // const y = all.reduce((prev, cur) => {
    //     if (prev[cur.place]) {
    //         prev[cur.place] = ++prev[cur.place];
    //     } else {
    //         prev[cur.place] = 1;
    //     }
    //     return prev;
    // }, {} as any);
    // console.log('y', y);


    // }, [])

