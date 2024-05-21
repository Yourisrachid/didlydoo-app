
// get method
export async function getAllEvents() {
    const response = await fetch("http://localhost:3000/api/events/");
    const json = await response.json();
    return json;
}

export async function getEvents(id) {
    fetch('http://localhost:3000/api/events/' + id)
        .then(response => response.json())
        .then(json => console.log(json))
}

export async function getAllAttendees() {
    fetch("http://localhost:3000/api/attendees/")
        .then(response => response.json())
        .then(json => console.log(json))
}

export async function getAttendees(id) {
    fetch('http://localhost:3000/api/attendees/' + id)
        .then(response => response.json())
        .then(json => console.log(json))
}

// post method
export async function postEvents(name,date,author,description) {
    fetch("http://localhost:3000/api/events/", {
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
        .then(response => response.json())
        .then(json => console.log(json))
}

export async function postEventsDate(id, date) {
    fetch("http://localhost:3000/api/events/"+id+"/add_dates", {
        method: "POST",
        body: JSON.stringify({
            dates: date
        }),
        headers: {
            "Content- type": "application / json; charset = UTF - 8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
}

export async function postEventsAttend(id,name, date, available) {
    fetch("http://localhost:3000/api/events/"+id+"/attend", {
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
        .then(response => response.json())
        .then(json => console.log(json))
}

//patch method
export async function patchEvents(id, name, author, description) {
    fetch("http://localhost:3000/api/events/"+id+"/", {
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
        .then(response => response.json())
        .then(json => console.log(json))
}

export async function patchEventsAttend(id, name, date, available) {
    fetch("http://localhost:3000/api/events/" + id + "/attend", {
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
        .then(response => response.json())
        .then(json => console.log(json))
}

// delete method
export async function deleteEvents(id, name, date, available) {
    fetch("http://localhost:3000/api/events/[id]/", {
        method: "DELETE"
    })
}
