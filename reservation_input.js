  

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
dateInput.addEventListener('change', function () {
    
    const newDate = formatDate(this.value);
    const dayOfWeek = newDate.getDay();

    // Enable the time input
    const timeInput = document.getElementById('reservation_time');
    timeInput.disabled = false;

    //Update Valid Time Input based on chosen day
    // Reservations must be no later than an hour before close
    switch (dayOfWeek) {
        case 0: // Sunday
            // 10am - 9pm
            timeInput.min = "10:00";
            timeInput.max = "20:00";
        case 1:
            // Monday
            //closed
            timeInput.disabled = true;
            break;
        case 2: // Tuesday
        case 3: // Wednesday
        case 4: // Thursday
            // 12pm - 10pm
            timeInput.min = "12:00";
            timeInput.max = "21:00";
            break;
        case 5: // Friday
        // 12pm - 1am
        timeInput.min = "12:00";
        timeInput.max = "00:00";
            break;
        case 6:
            // Saturday
            timeInput.min = "11:00";
            timeInput.max = "00:00";
            break;
        default:
            break;
        }
});

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

//Checks if Time Input is Valid
function isValidTimeInput(timeStr) {
    const regex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
    return regex.test(timeStr);
}