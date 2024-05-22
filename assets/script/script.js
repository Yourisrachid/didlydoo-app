import { getAllEvents } from './module/api.js';
import { createEventsHtml, clearHtml } from './module/html.js';

export async function viewAllEvents() {
    const json = await getAllEvents();

    for (const X of json) {
        document.querySelector("#eventsSection").appendChild(createEventsHtml(X))
    }
}


clearHtml()