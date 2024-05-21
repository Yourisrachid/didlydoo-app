export function createEvents(obj) {
    const events = document.createElement("div")
    const title = document.createElement("h2")
    const desc = document.createElement("p")
    const table = document.createElement("table")

    // name and desc
    title.textContent = obj.name
    desc.textContent = obj.description

    // creation of table
    const thead = document.createElement("thead")
    const tbody = document.createElement("tbody")

    /// header of table
    let members = {};
    thead.appendChild(document.createElement("th"))
    let nbrOfColumn = 0
    for (const X of obj.dates) {
        const th = document.createElement("th")
        th.textContent = X.date
        thead.appendChild(th)
        for (const I of X.attendees) { // trop complexe a expliquer 🤯
            if (!members[I.name]) { members[I.name] = {} }
            if (!members[I.name]["c" + nbrOfColumn]) { members[I.name]["c" + nbrOfColumn] = {} }
            members[I.name]["c" + nbrOfColumn]["available"] = I.available
        }
        nbrOfColumn++
    }

    /// body of table
    for (const X of Object.keys(members)) {
        const tr = document.createElement("tr")
        const th = document.createElement("th")
        th.textContent = X
        tr.appendChild(th)
        for (let i = 0; i < nbrOfColumn; i++) {
            const td = document.createElement("td")
            td.textContent = members[X]["c" + i].available === true ? "👌" : members[X]["c" + i].available === false ? "😢" : "🤷‍♂️"
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }

    // append child
    table.appendChild(thead)
    table.appendChild(tbody)

    events.appendChild(title)
    events.appendChild(desc)
    events.appendChild(table)

    return events
}

/*
{
    obj.id
    obj.name
    obj.description
    obj.author
    obj.dates
        {
            obj.dates.date
            obj.dates.attendees
                {
                    obj.dates.attendees.name
                    obj.dates.attendees.available
                }
        }
    obj.created_at
    obj.num_modification
    obj.last_modification
}
*/