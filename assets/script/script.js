import { getAllEvents } from './module/api.js';
import { createEvents } from './module/html.js';

async function viewAllEvents() {
    const json = await getAllEvents();

    for (const X of json) {
        document.querySelector("#eventsSection").appendChild(createEvents(X))
    }
}

viewAllEvents()