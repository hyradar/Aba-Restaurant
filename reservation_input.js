
//Start
setCurrentDayInCalendar();

// Date Input Event Listener
const dateInput = document.getElementById('reservation_date'); 
dateInput.addEventListener('input', function () {
    
    const newDate = formatDate(this.value);
    const dayOfWeek = newDate.getDay();

    // Enable the time input
    const timeInput = document.getElementById('reservation_time');
    timeInput.disabled = false;

    // Check if input is Monday and set Validity Message
    const validityString = isDayOfWeekInputValid(dayOfWeek);
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

// Time Input Event Listener
const timeInput = document.getElementById('reservation_time');
timeInput.addEventListener('input', function () {
    const inputValue = timeInput.value;

    //If Input is valid, enable party size input
    if (isTimeInputValid(inputValue)) {
        document.getElementById('party_size').disabled = false;
    }
});

const party_size_input = document.getElementById('party_size');
party_size_input.addEventListener('input', function () {
    //If input is valid, enable submit button
    if (this.value > 0 && this.value < 101) {
        const submitButton = document.getElementById('submit_button');
        submitButton.disabled = false;
    }
});

const form = document.getElementById('reservation_form').addEventListener('submit', function (event) {
    event.preventDefault();
    deleteReservationInputForm();
    generateCustomerInformationForm();
});

//Functions
function isDayOfWeekInputValid(input) {
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

function isTimeInputValid(timeStr) {
    const regex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
    return regex.test(timeStr);
}

function deleteReservationInputForm() {
    const div = document.getElementById('reservation'); // Replace 'your_div_id' with your actual div's ID
    div.innerHTML = '';
}

function generateCustomerInformationForm() {
    // Create the form element
const form = document.createElement('form');
form.className = 'reservation_form';
form.addEventListener('submit', function (event) {
    event.preventDefault();
    deleteReservationInputForm();
    generateReservationSuccessMessage();
});

// Create the date input element
const nameInput = document.createElement('input');
nameInput.className = 'reservation_input';
nameInput.type = 'text';
nameInput.placeholder = 'Jane Doe';
nameInput.id = 'user_name_input';
nameInput.required = true;

// Create the time input element
const emailInput = document.createElement('input');
emailInput.className = 'reservation_input';
emailInput.type = 'email';
emailInput.placeholder ='janedoe@gmail.com';
emailInput.id = 'user_email_input';
emailInput.required = true;

// Create the party size input element
const phoneInput = document.createElement('input');
phoneInput.className = 'reservation_input';
phoneInput.type = 'tel';
phoneInput. pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}";
phoneInput.placeholder = '123-456-7890';
phoneInput.id = 'user_phone_input';
phoneInput.required = true;

// Create the submit button element
const submitButton = document.createElement('input');
submitButton.className = 'reservation_input';
submitButton.type = 'submit';
submitButton.id = 'user_submit_button';
submitButton.value = 'Submit Contact Info';
// submitButton.disabled = true;

// Create the heading element
const heading = document.createElement('h2');
heading.textContent = 'A table has been reserved, now enter your contact information to complete your reservation';

// Create a div element for each input element
const divName = document.createElement('div');
divName.className = 'reservation_input_div';
divName.appendChild(nameInput);

const divEmail = document.createElement('div');
divEmail.className = 'reservation_input_div';
divEmail.appendChild(emailInput);

const divPhone = document.createElement('div');
divPhone.className = 'reservation_input_div';
divPhone.appendChild(phoneInput);

const divSubmit = document.createElement('div');
divSubmit.className = 'reservation_input_div';
divSubmit.appendChild(submitButton);

// Append the elements to the form
form.appendChild(divName);
form.appendChild(divEmail);
form.appendChild(divPhone);
form.appendChild(divSubmit);

const reservation = document.getElementById('reservation');
    reservation.appendChild(heading);
    reservation.appendChild(form);
}

function generateReservationSuccessMessage(){
    const reservationDiv = document.getElementById('reservation');
    const successHeader = document.createElement('h2');
    successHeader.innerText = "Reservation Successful!"
    
    reservationDiv.appendChild(successHeader)
}