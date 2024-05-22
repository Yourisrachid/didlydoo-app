import { postEventsAttend, patchEventsAttend, deleteEvents } from './api.js';
import { viewAllEvents } from '../script.js'

export function createEventsHtml(obj) {
    const events = createElements("div", null, null, null)

    const btnDelete = createElements("button", null, null, "🗑️")
    btnDelete.addEventListener('click', deleteEvent)
    btnDelete.id = obj.id


    const title = createElements("h2",null,null,obj.name)
    const desc = createElements("p", null, null, obj.description)
    const table = createElements("table", null, null, null)


    // creation of table
    const thead = createElements("thead", null, null, null)
    const tbody = createElements("tbody", null, null, null)

    /// header of table
    let dictDateId = {}
    let contByColumn = {}
    let members = {};
    thead.appendChild(createElements("th", null, "table-hidden", null))
    let nbrOfColumn = 0
    for (const X of obj.dates) {
        dictDateId["c" + nbrOfColumn] = X.date
        const th = createElements("th", null, "table-date", null)

        th.appendChild(createElements("p", null, "table-date-day", X.date.split("-")[2]))
        th.appendChild(createElements("p", null, "table-date-month", X.date.split("-")[1]))
        th.appendChild(createElements("p", null, "table-date-years", X.date.split("-")[0]))

        thead.appendChild(th)
        for (const I of X.attendees) { // trop complexe a expliquer 🤯
            if (!members[I.name]) { members[I.name] = {} }
            if (!members[I.name]["c" + nbrOfColumn]) { members[I.name]["c" + nbrOfColumn] = {} }
            members[I.name]["c" + nbrOfColumn]["available"] = I.available

            if (!contByColumn["c" + nbrOfColumn]) { contByColumn["c" + nbrOfColumn] = 0 }
            if (I.available) { contByColumn["c" + nbrOfColumn]++ }
        }
        nbrOfColumn++
    }

    /// body of table
    for (const X of Object.keys(members)) {
        const tr = createElements("tr", null, null, null)
        const th = createElements("th", null, "table-name", null)
        th.textContent = X
        tr.appendChild(th)
        for (let i = 0; i < nbrOfColumn; i++) {
            const td = createElements("td", null,null, null)
            td.textContent = members[X]["c" + i].available === true ? "👌" : members[X]["c" + i].available === false ? "😢" : "🤷‍♂️"
            td.classList.add(members[X]["c" + i].available === true ? "ok" : members[X]["c" + i].available === false ? "notOk" : "maybe")
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }

    /// Add form
    const form_tr = createElements("tr", null, null, null)
    const form_th = createElements("th", null, null, null)
    form_th.appendChild(createElements("input", "input-name-" + obj.id, "table-input", null))
    form_tr.appendChild(form_th)
    for (let i = 0; i < nbrOfColumn; i++) {
        const td = createElements("td", null, null, null)
        const btn = createElements("button", "input-button-" + obj.id, "table-button", "👌")
        btn.addEventListener("click",buttonChangeStatus)
        btn.dataset.date = dictDateId["c"+i]
        btn.dataset.available = true
        td.appendChild(btn)
        form_tr.appendChild(td)
    }
    tbody.appendChild(form_tr)

    /// add button (register) and total participation
    const btn_tr = createElements("tr", null, null, null)
    const btn_th = createElements("th", null, null, null)
    const btn_btn = createElements("button", "button-register", "table-button-register", "Register 🤌")
    btn_btn.addEventListener('click', sendVote)
    btn_btn.id = obj.id
    btn_th.appendChild(btn_btn)
    btn_tr.appendChild(btn_th)
    for (let i = 0; i < nbrOfColumn; i++) {
        const td = createElements("td", null, "table-total", contByColumn["c" + i])
        console.log(contByColumn,contByColumn["c" + i])
        btn_tr.appendChild(td)
    }
    tbody.appendChild(btn_tr) 


    // append child
    table.appendChild(thead)
    table.appendChild(tbody)


    events.appendChild(title)
    events.appendChild(desc)
    events.appendChild(table)
    events.appendChild(btnDelete)

    return events
}


async function sendVote(e){
    let inputName = document.querySelector("#input-name-" + e.target.id)
    let inputButton = document.querySelectorAll("#input-button-" + e.target.id)

    if (inputName.value.length > 1) {

        let dates = []
        for (const X of inputButton) {
            dates.push({ date: X.dataset.date, available: (X.dataset.available === "true" ? true : false) })
        }

        const post = await postEventsAttend(e.target.id, inputName.value, dates)
        if (post.error) {
            const patch = await patchEventsAttend(e.target.id, inputName.value, dates)
        }

        clearHtml()
    }
}

async function deleteEvent(e) {
    const de = await deleteEvents(e.target.id)
    clearHtml()
}


export function clearHtml() {
    document.querySelector("#eventsSection").innerHTML = "";
    viewAllEvents()
}

function buttonChangeStatus(e) {
    let bool = e.target.dataset.available === "true" ? false : true;
    e.target.dataset.available = bool + ""

    e.target.textContent = bool ? "👌" :  "😢"
}

/**
 * 
 * @param { Balise name } element 
 * @param { id of balise } id 
 * @param { class list } classList 
 * @param { textContent } textContent 
 * @returns { balise }
 */
function createElements(element, id, classList, textContent) {
    const i = document.createElement(element)
    if (id !== null) { i.id = id }

    if (classList != null) {
        i.classList = i.classList + " " + classList
    }


    if (textContent !== null) { i.textContent = textContent }

    return i
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