import { getAllEvents } from './module/api.js';
import { createEventsHtml } from './module/html.js';

async function viewAllEvents() {
    const json = await getAllEvents();

    for (const X of json) {
        document.querySelector("#eventsSection").appendChild(createEventsHtml(X))
    }
}

viewAllEvents()