

// const getLocalStorage = key => localStorage.getItem(key)
function getLocalStorage(key) {
    localStorage.getItem(key)
}
// const setLocalStorage = (key, data) => localStorage.setItem(key, data)

$(function () {

const $saveButton = $('.save');
const $removeThisEntryButton = $('.remove');
const $removeAllEntriesButton = $('.removeAllEntriesButton');
const $dayDisplay = $('#currentDay');
const $clockDisplay = $('#currentTime');

let currentTime = dayjs();

const availableHours = [ 9, 10, 11, 12, 13, 14, 15, 16 ];

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

// check storage for data, enter data into corresponding time blocks 
function pullAllFromStorage()  {
    availableHours.forEach((hour) => { 
        const data = localStorage.getItem(hour)
        const $taskDetails = $(`#${hour}`);
        $taskDetails.text(data);
    }) 
    
            // const $taskDetails = $('#' + hour);
        // const name = 'susan'
        //     `hello my name is ${name}`
        //     'hello my name is' + name
};
     
$saveButton.click(function (e)   {

    const $thingClicked = $(e.target);
    const $correspondingTextArea = $thingClicked.closest('button').siblings('textarea');
    const $newEntryKey = $correspondingTextArea.attr('data-index');
    const $newEntryValue = $correspondingTextArea.val();
    
    // save in local storage with corresponding time block
    localStorage.setItem($newEntryKey, $newEntryValue)

});

$removeThisEntryButton.click(function (e){
    
    const $thingClicked = $(e.target);
    const $taskDetailsArea = $thingClicked.closest('button').siblings('textarea');
    const $entryKey = $taskDetailsArea.attr('data-index');

    localStorage.setItem($entryKey, '');

    $taskDetailsArea.val('');

});

$removeAllEntriesButton.click(function () {

    const $taskInputArea = $('textarea');
    $taskInputArea.val('');
    localStorage.clear();


});

// display the timer
function keepTime() {

    currentTime = dayjs();
    const day = currentTime.format('dddd, MMM DD, YYYY');
    const time = currentTime.format('HH:mm:ss');

    $dayDisplay.text(day);
    $clockDisplay.text(time);

}

setInterval(keepTime, 1000);

pullAllFromStorage();

colorChangeRows();

});