'use strict';

import { onEvent, select, clearIntervalHandler } from "./utils.js";

const alarmForm = select('alarmForm');
const alarmStatus = select('alarmStatus');
const Message = select('Message');
const hourInput = select('hour');
const minuteInput = select('minute');
const clockElement = select('clock');

let liveTimeInterval;

onEvent('alarmForm', 'submit', function (event) {
    event.preventDefault();
    setAlarm();
});

onEvent('alarmForm', 'input', function () {
    Message.textContent = '';
    hourInput.style.border = '';
    minuteInput.style.border = '';
});

startLiveTime();

function startLiveTime() {
    updateClock();
    liveTimeInterval = setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    clockElement.textContent = timeString;

}

function setAlarm() {
    clearIntervalHandler(liveTimeInterval);
    const hour = parseInt(hourInput.value, 10);
    const minute = parseInt(minuteInput.value, 10);
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        Message.textContent = 'Please enter a valid hour (0-23) and minute (0-59).';
        hourInput.style.border = '2px solid #ff4646';
        minuteInput.style.border = '2px solid #ff4646';
        return;
    }
    if (hourInput.value.trim() === '' || minuteInput.value.trim() === '') {
        Message.textContent = 'Please enter both hour and minute.';
        hourInput.style.border = '2px solid #ff4646';
        minuteInput.style.border = '2px solid #ff4646';
        return;
    }

    Message.textContent = '';
    hourInput.style.border = '';
    minuteInput.style.border = '';
    alarmStatus.textContent = `Alarm set for ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    setTimeout(() => {
        checkAndPlayAlarm(hour, minute);
    }, 1000);
}

function checkAndPlayAlarm(setHour, setMinute) {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    if (currentHour === setHour && currentMinute === setMinute) {
        playAlarm();
        alarmStatus.textContent = 'Alarm!';
    } else {
        setTimeout(() => {
            checkAndPlayAlarm(setHour, setMinute);
        }, 1000);
    }
}

function playAlarm() {
    const audio = new Audio('./assets/audio/alarm_sound.wav');
    audio.play();
}
