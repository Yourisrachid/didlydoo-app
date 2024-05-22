
// get method
export async function getAllEvents() {
    const response = await fetch("http://localhost:3000/api/events/");
    const json = await response.json();
    return json;
}

export async function getEvents(id) {
    const response = await fetch('http://localhost:3000/api/events/' + id)
    const json = await response.json();
    return json;
}

export async function getAllAttendees() {
    const response = await fetch("http://localhost:3000/api/attendees/")
    const json = await response.json();
    return json;
}

export async function getAttendees(id) {
    const response = await fetch('http://localhost:3000/api/attendees/' + id)
    const json = await response.json();
    return json;
}

// post method
export async function postEvents(name,date,author,description) {
    const response = await fetch("http://localhost:3000/api/events/", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            dates: date,
            author: author,
            description: description
        }),
        headers: {
            "Content- type": "application / json; charset = UTF - 8"
        }
    })
    const json = await response.json();
    return json;
}

export async function postEventsDate(id, date) {
    const response = await fetch("http://localhost:3000/api/events/"+id+"/add_dates", {
        method: "POST",
        body: JSON.stringify({
            dates: date
        }),
        headers: {
            "Content- type": "application / json; charset = UTF - 8"
        }
    })
    const json = await response.json();
    return json;
}

export async function postEventsAttend(id,name, date, available) {
    const response = await fetch("http://localhost:3000/api/events/"+id+"/attend", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            dates: [{
                date: date,
                available: available
            }]
        }),
        headers: {
            "Content- type": "application / json; charset = UTF - 8"
        }
    })
    const json = await response.json();
    return json;
}

//patch method
export async function patchEvents(id, name, author, description) {
    const response = await fetch("http://localhost:3000/api/events/"+id+"/", {
        method: "PATCH",
        body: JSON.stringify({
            name: name,
            author: author,
            description: description
        }),
        headers: {
            "Content- type": "application / json; charset = UTF - 8"
        }
    })
    const json = await response.json();
    return json;
}

export async function patchEventsAttend(id, name, date, available) {
    const response = await fetch("http://localhost:3000/api/events/" + id + "/attend", {
        method: "PATCH",
        body: JSON.stringify({
            name: name,
            dates: [{
                date: date,
                available: available
            }]
        }),
        headers: {
            "Content- type": "application / json; charset = UTF - 8"
        }
    })
    const json = await response.json();
    return json;
}

// delete method
export async function deleteEvents(id) {
    fetch("http://localhost:3000/api/events/"+id+"/", {
        method: "DELETE"
    })
}
