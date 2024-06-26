import { getAllEvents, postEvents, patchEvents } from './module/api.js';
import { createEventsHtml, createEventsHtmlMobile, clearHtml } from './module/html.js';
import { toggleDarkMode } from "./module/DarkMode.js";
import { addEventBlock, fadeBlock, delBlock, errorBlock, errorSubmit } from './module/addEvent.js';

export async function viewAllEvents() {
    const json = await getAllEvents();

    for (const X of json) {
        document.querySelector("#eventsSection").appendChild(createEventsHtml(X))
        document.querySelector("#eventsSection").appendChild(createEventsHtmlMobile(X))
    }
}




const submitBtn = document.querySelector('#submitBtn')
const addDateBtn = document.querySelector('#addDates')
const formInputName = document.querySelector('#eventName')
const formInputDescr = document.querySelector('#eventDescr')
const formInputDate = document.querySelector('#eventDates')
const formInputAuthor = document.querySelector('#eventAuthor')
const editEventForm = document.getElementById('editEventForm');
const saveEditButton = document.getElementById('saveEditButton');
let dateTable = []

addDateBtn.addEventListener('click', function () {
    
    if (dateTable.includes(formInputDate.value) || formInputDate.value=='') {
        errorBlock()
        setTimeout(delBlock, 2000)
        console.log('Error')
    } else {
        fadeBlock()
        setTimeout(delBlock, 2000)
        dateTable.push(formInputDate.value)
        console.log(dateTable)
    }
})

async function Test(e) {
    if (formInputName.value=='' || formInputAuthor.value=='' || formInputDescr.value=='') {
        errorSubmit()
        setTimeout(delBlock, 2000)
    } else {
        await postEvents(formInputName.value, dateTable, formInputAuthor.value, formInputDescr.value)
    }
}


submitBtn.addEventListener('click', async function (e) {
    await Test()
})



saveEditButton.addEventListener('click', async (event) => {
    
    event.preventDefault();

    const id = editEventForm.dataset.eventId;
    const name = document.getElementById('editName').value;
    const author = document.getElementById('editAuthor').value;
    const description = document.getElementById('editDescription').value;

    try {
        await patchEvents(id, name, author, description);

        clearHtml();
        await viewAllEvents();

    } catch (error) {
        console.error("Error in editing event:", error);
    }
});

toggleDarkMode()
addEventBlock()
clearHtml()

