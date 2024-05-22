import { getAllEvents, postEvents } from './module/api.js';
import { createEventsHtml, clearHtml } from './module/html.js';
import { toggleDarkMode } from "./module/DarkMode.js";
import { addEventBlock } from './module/addEvent.js';

export async function viewAllEvents() {
    const json = await getAllEvents();

    for (const X of json) {
        document.querySelector("#eventsSection").appendChild(createEventsHtml(X))
    }
}


const submitBtn = document.querySelector('#submitBtn')
const addDateBtn = document.querySelector('#addDates')
const formInputName = document.querySelector('#eventName')
const formInputDescr = document.querySelector('#eventDescr')
const formInputDate = document.querySelector('#eventDates')
const formInputAuthor = document.querySelector('#eventAuthor')
let dateTable = []

addDateBtn.addEventListener('click', function() {
    dateTable.push(formInputDate.value)
    console.log(dateTable)
})

async function Test() {
    await postEvents(formInputName.value,dateTable,formInputAuthor.value,formInputDescr.value)
}

//submitBtn.addEventListener('click', Test())

toggleDarkMode();
addEventBlock();
clearHtml();
