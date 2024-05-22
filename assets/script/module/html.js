import { postEventsAttend, patchEventsAttend } from './api.js';

export function createEventsHtml(obj) {
    const events = createElements("div", null, null, null)
    const title = createElements("h2",null,null,obj.name)
    const desc = createElements("p", null, null, obj.description)
    const table = createElements("table", null, null, null)


    // creation of table
    const thead = createElements("thead", null, null, null)
    const tbody = createElements("tbody", null, null, null)

    let dictDateId = {}
    /// header of table
    let members = {};
    thead.appendChild(createElements("th", null, null, null))
    let nbrOfColumn = 0
    for (const X of obj.dates) {
        dictDateId["c" + nbrOfColumn] = X.date
        const th = createElements("th", null, "table-date", null)
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
        const tr = createElements("tr", null, null, null)
        const th = createElements("th", null, "table-name", null)
        th.textContent = X
        tr.appendChild(th)
        for (let i = 0; i < nbrOfColumn; i++) {
            const td = createElements("td", null,null, null)
            td.textContent = members[X]["c" + i].available === true ? "👌" : members[X]["c" + i].available === false ? "😢" : "🤷‍♂️"
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }

    /// Add form
    const form_tr = createElements("tr", null, null, null)
    const form_th = createElements("th", null, null, null)
    form_th.appendChild(createElements("input", "input-name-"+obj.id, "table-input", null))
    form_tr.appendChild(form_th)
    for (let i = 0; i < nbrOfColumn; i++) {
        const td = createElements("td", null, null, null)
        const btn = createElements("button", "input-button-" + obj.id, "table-button", "👍")
        btn.dataset.date = dictDateId["c"+i]
        btn.dataset.available = true
        td.appendChild(btn)
        form_tr.appendChild(td)
    }
    tbody.appendChild(form_tr)

    /// add button (register) and total participation
    const btn_tr = createElements("tr", null, null, null)
    const btn_th = createElements("th", null, null, null)
    const btn_btn = createElements("button", "button-register", "table-button-register", "Register")
    btn_btn.addEventListener('click', sendVote)
    btn_btn.id = obj.id
    btn_th.appendChild(btn_btn)
    btn_tr.appendChild(btn_th)
    for (let i = 0; i < nbrOfColumn; i++) {
        const td = createElements("td", null, "table-total", "0")
        btn_tr.appendChild(td)
    }
    tbody.appendChild(btn_tr) 


    // append child
    table.appendChild(thead)
    table.appendChild(tbody)

    events.appendChild(title)
    events.appendChild(desc)
    events.appendChild(table)

    return events
}


async function sendVote(e){
    let inputName = document.querySelector("#input-name-" + e.target.id)
    let inputButton = document.querySelectorAll("#input-button-" + e.target.id)

    let dates = []
    for (const X of inputButton) {
        dates.push({ date: X.dataset.date, available: (X.dataset.available === "true" ? true : false)})
    }

    await postEventsAttend(e.target.id, inputName.value, dates)
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