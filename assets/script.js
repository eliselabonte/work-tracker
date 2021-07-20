$(function () {

const $button = $('button');
const $saveButton = $('.save');
const $removeThisEntryButton = $('.remove');
const $removeAllEntriesButton = $('.removeAllEntriesButton');
const $dayDisplay = $('#currentDay');
const $clockDisplay = $('#currentTime');

let currentTime = dayjs();

const availableHours = [ 9, 10, 11, 12, 13, 14, 15, 16 ];

function setLocalStorage(key, value)   {
    localStorage.setItem(key, value)
};

// if the hour for a row has already passed, change its color to gray
function colorChangeRows()  {
    availableHours.forEach(function(hour) {
        const currentHour = currentTime.format('HH');
        const $taskDetailsArea = $(`#${hour}`);
        if (hour < currentHour) {
            $taskDetailsArea.addClass('gray');
        }
    })
};

// I'd like to add a function here that clears local storage each day at midnight

// check storage for data, enter data into corresponding time blocks 
function pullAllFromStorage()  {
    availableHours.forEach((hour) => { 
        const data = localStorage.getItem(hour)
        const $taskDetails = $(`#${hour}`);
        $taskDetails.text(data);
    }) 
};


     
// when a button is clicked, check the type
$button.click(function(e)    {

    const $thingClicked = $(e.target).closest('button');
    const $correspondingTextArea = $thingClicked.siblings('textarea');
    const $newEntryKey = $correspondingTextArea.attr('data-index');
    const $newEntryValue = $correspondingTextArea.val();
    const $taskInputArea = $('textarea');

    // for save buttons, save the data in local storage
    if ($thingClicked.is($saveButton)) {
        setLocalStorage($newEntryKey, $newEntryValue)
    }
    // for removeThis buttons, clear the text area and enter an empty string into the value of the corresponding local storage
    if ($thingClicked.is($removeThisEntryButton))   {
        setLocalStorage($newEntryKey, '');
        $correspondingTextArea.val('');
    }
    // for the removeAll button, clear local storage and all text areas.
    if ($thingClicked.is($removeAllEntriesButton))   {
        $taskInputArea.val('');
        localStorage.clear();
    }
})

// display the timer using dayjs
function keepTime() {

    currentTime = dayjs();
    const day = currentTime.format('dddd, MMM DD, YYYY');
    const time = currentTime.format('HH:mm:ss');

    $dayDisplay.text(day);
    $clockDisplay.text(time);

};

setInterval(keepTime, 1000);

pullAllFromStorage();

colorChangeRows();

});