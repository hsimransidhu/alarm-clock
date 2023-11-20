document.addEventListener('DOMContentLoaded', function () {
    // Display current time
    updateClock();

    // Update clock every second
    setInterval(updateClock, 1000);
});

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const clockElement = document.getElementById('clock');
    clockElement.textContent = `${hours}:${minutes}`;
}

function setAlarm() {
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const alarmStatusElement = document.getElementById('alarmStatus');

    // Validate inputs
    const hour = parseInt(hourInput.value, 10);
    const minute = parseInt(minuteInput.value, 10);

    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        // Invalid input
        alert('Please enter a valid hour (0-23) and minute (0-59).');
        return;
    }

    // Set alarm
    const alarmTime = new Date();
    alarmTime.setHours(hour);
    alarmTime.setMinutes(minute);
    alarmTime.setSeconds(0);

    const now = new Date();

    if (alarmTime <= now) {
        // Alarm time is in the past
        alert('Please enter a future time for the alarm.');
        return;
    }

    // Display alarm status
    alarmStatusElement.textContent = `Alarm set for ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    // Set timeout to play alarm sound
    const timeUntilAlarm = alarmTime - now;
    setTimeout(() => {
        playAlarm();
        alarmStatusElement.textContent = 'Alarm!';

        // Reset alarm status after a few seconds
        setTimeout(() => {
            alarmStatusElement.textContent = '';
        }, 3000);
    }, timeUntilAlarm);
}

function playAlarm() {
    // Play alarm sound (replace with your own sound)
    alert('ALARM!');
}
