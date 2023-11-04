  setCurrentDayInCalendar();

// Time Input Event Listener
const timeInput = document.getElementById('reservation_time');
timeInput.addEventListener('input', function () {
    const inputValue = timeInput.value;

    //If Input is valid, enable party size input
    if (isValidTimeInput(inputValue)) {
        document.getElementById('party_size').disabled = false;
    }

});

// Date Input Event Listener
const dateInput = document.getElementById('reservation_date'); 
dateInput.addEventListener('input', function () {
    
    const newDate = formatDate(this.value);
    const dayOfWeek = newDate.getDay();

    // Enable the time input
    const timeInput = document.getElementById('reservation_time');
    timeInput.disabled = false;

    // Check if input is Monday
    const validityString = isMondayValidity(dayOfWeek);
    this.setCustomValidity(validityString);
    this.reportValidity();

    // Reservations must be no later than an hour before close
    switch (dayOfWeek) {
        case 0: // Sunday: 10am - 8pm
            timeInput.min = "10:00";
            timeInput.max = "20:00";
            break;
        case 1: // Monday: closed
            timeInput.disabled = true;
            break;
        case 2: // Tuesday:   12pm - 9pm
        case 3: // Wednesday: 12pm - 9pm
        case 4: // Thursday:  12pm - 9pm
            timeInput.min = "12:00";
            timeInput.max = "21:00";
            break;
        case 5: // Friday" 12pm - 12am
        timeInput.min = "12:00";
        timeInput.max = "00:00";
            break;
        case 6: // Saturday 11am to 12am
            timeInput.min = "11:00";
            timeInput.max = "00:00";
            break;
        default:
            break;
    }
});

function isMondayValidity(input) {
    if (input !== 1) {
        return ("");
    }
    return ("Mondays are not available for reservations.'");
}

function formatDate(inputValue) {
    const dateParts = inputValue.split('-');

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);

    const stylizedDate = new Date(year, month, day);
    return stylizedDate;
}

function setCurrentDayInCalendar() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('reservation_date').setAttribute('min', today);
}

function isValidTimeInput(timeStr) {
    const regex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
    return regex.test(timeStr);
}