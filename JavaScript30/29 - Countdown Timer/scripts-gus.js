/*
const timerButton = document.querySelectorAll('.timer__button')
const displayTime = document.querySelector('.display__time-left')
const displayEndTime = document.querySelector('.display__end-time')
const manualTime = document.querySelector('#custom')
let timeLeft;

function start () {
	let seconds = this.dataset.time;
	newTimer(seconds)
}

function newTimer (seconds) {
	clearInterval(timeLeft)
	let minutes = Math.floor(seconds/60);
	let remainSecs = seconds%60;
	displayTime.textContent = `${minutes>60 ? Math.floor(minutes/60)+':'+((minutes-60)<10 ? '0'+(minutes-60) : '') : minutes}:${remainSecs < 10 ? '0' : ''}${remainSecs}`;

	let endTime = (function finalTime (timerSec) {
		let now = new Date()
		now = [now.getHours(), now.getMinutes(), now.getSeconds()]
		now[2] += Number(timerSec);
		now[1] += Math.floor(now[2]/60);
		now[0] += Math.floor(now[1]/60);
		now[2] = now[2]%60;
		now[1] = now[1]%60;
		now[0] = now[0]%24;
		return now;
	}(seconds));
	displayEndTime.textContent = `Be back at ${endTime[0] > 12 ? endTime[0]-12+':'+endTime[1]+'pm' : endTime[0]+':'+endTime[1]+'am'}`;

	timeLeft = setInterval(() => {
		seconds--;
		if (seconds <= 0) clearInterval(timeLeft);
		let minutes = Math.floor(seconds/60);
		let remainSecs = seconds%60;
		displayTime.textContent = `${minutes>60 ? Math.floor(minutes/60)+':'+((minutes-60)<10 ? '0'+(minutes-60) : '') : minutes}:${remainSecs < 10 ? '0' : ''}${remainSecs}`;
	} , 1000)
}

timerButton.forEach(tb => tb.addEventListener('click', start))
manualTime.addEventListener('submit', function (e) {
	e.preventDefault();
	let min = this.minutes.value
	newTimer(min * 60)
	this.reset();
})

*/

// I learned about Date.now() after watching the video
// This is my new solution to this task

const timerButton = document.querySelectorAll('.timer__button')
const displayTime = document.querySelector('.display__time-left')
const displayEndTime = document.querySelector('.display__end-time')
let timeLeft;


function start () {
	let seconds = this.dataset.time;
	newTimer(seconds)
}

function newTimer (seconds) {
	clearInterval(timeLeft);
	// Date.now() returns the current time in miliseconds
	let now = Date.now() / 1000;
	// Seconds is read as string from data-time. You can either multiply or divide it, or set it as a number.
	let later = now + Number(seconds);
	let breakTime = later - now;
	let h = Math.floor(breakTime/3600)
	let m = Math.floor(breakTime/60)
	let ml = Math.floor(breakTime/60-h*60)
	let s = breakTime % 60
	displayTime.textContent = `${m > 60 ? h+':'+(ml < 10 ? '0'+ml : ml) : (m < 10 ? '0'+m : m)}:${s < 10 ? '0'+s : s}`;
	
	let endTime = new Date(later*1000)
	let hours = endTime.getHours()
	let minutes = endTime.getMinutes()
	displayEndTime.textContent = `Be back at ${hours>12 ? hours-12+':'+(minutes<10 ? '0'+minutes : minutes)+'pm' : hours+':'+(minutes<10 ? '0'+minutes : minutes)+'am'}`;

	timeLeft = setInterval(() => {
		breakTime--;
		if (breakTime <= 0) clearInterval(timeLeft);
		let h = Math.floor(breakTime/3600)
		let m = Math.floor(breakTime/60)
		let ml = Math.floor(breakTime/60-h*60)
		let s = breakTime % 60;
		displayTime.textContent = `${m > 60 ? h+':'+(ml < 10 ? '0'+ml : ml) : (m < 10 ? '0'+m : m)}:${s < 10 ? '0'+s : s}`;
	} , 1000)
}


timerButton.forEach(tb => tb.addEventListener('click', start))
document.customForm.addEventListener('submit', function (e) {
	e.preventDefault();
	let min = this.minutes.value;
	newTimer(min * 60);
	this.reset();
})

