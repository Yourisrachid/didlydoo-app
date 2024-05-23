import { postEventsAttend, patchEventsAttend, deleteEvents, postEventsDate } from './api.js';
import { viewAllEvents } from '../script.js'

export function createEventsHtml(obj) {
    const events = createElements("div", null, null, null)


    const btnEdit = createElements("button", null, null, "✏️")
    btnEdit.addEventListener('click', () => openEditForm(obj))
    btnEdit.id = `edit-${obj.id}`
    btnEdit.classList.add('editBtn')
    btnEdit.addEventListener('click', () => openEditForm(obj.id, obj.name, obj.author, obj.description));


    const title = createElements("h2", null, null, obj.name)
    const desc = createElements("p", null, null, obj.description)
    const table = createElements("table", null, null, null)


    // creation of table
    const thead = document.createElement("thead")
    const tbody = document.createElement("tbody")

    /// header of table
    let dictDateId = {}
    let contByColumn = {}
    let maxValueColumn = 0
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
        let tempMaxValue = 0
        for (const I of X.attendees) { // trop complexe a expliquer 🤯
            if (!members[I.name]) { members[I.name] = {} }
            if (!members[I.name]["c" + nbrOfColumn]) { members[I.name]["c" + nbrOfColumn] = {} }
            members[I.name]["c" + nbrOfColumn]["available"] = I.available

            if (!contByColumn["c" + nbrOfColumn]) { contByColumn["c" + nbrOfColumn] = 0 }
            if (I.available) { contByColumn["c" + nbrOfColumn]++; tempMaxValue++ }
        }
        if (maxValueColumn < tempMaxValue) { maxValueColumn = tempMaxValue }

        nbrOfColumn++
    }

    // btn add date
    const thBtnDate = createElements("th", null, null, null)
    const btnAddDate = createElements("button", null, "table-button", "➕📆")
    btnAddDate.addEventListener("click", function (e) {
        const dialogBox = createElements("dialog", null, null, null)

        const date = createElements("input",null,null,null)
        date.type = "date"
        date.id = "eventDates"
        date.name = "date"

        const btnOk = createElements("button", null, null, "➕")
        btnOk.addEventListener('click', function (e) {
            if (date.value != null) {
                let dates = []
                dates.push(date.value)
                postEventsDate(obj.id, dates)
                dialogBox.close()
            }
        })


        const btnNotOk = createElements("button", null, null, "❌")
        btnNotOk.addEventListener('click', function (e) {
            dialogBox.close()
        })

        dialogBox.appendChild(createElements("p", null, null, " Add date"))
        dialogBox.appendChild(date)
        dialogBox.appendChild(btnNotOk)
        dialogBox.appendChild(btnOk)

        events.appendChild(dialogBox)

        dialogBox.showModal()
    })
    thBtnDate.appendChild(btnAddDate)
    thead.appendChild(thBtnDate)



    /// body of table
    for (const X of Object.keys(members)) {
        const tr = document.createElement("tr")
        const th = document.createElement("th")
        th.textContent = X
        tr.appendChild(th)
        for (let i = 0; i < nbrOfColumn; i++) {
            const td = document.createElement("td")
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
        btn.addEventListener("click", buttonChangeStatus)
        btn.dataset.date = dictDateId["c" + i]
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
        const td = createElements("td", null, "table-total" + (maxValueColumn == contByColumn["c" + i] ? " table-max" : ""), contByColumn["c" + i] + (maxValueColumn == contByColumn["c" + i] ? " 🔥" : ""))

        btn_tr.appendChild(td)
    }
    tbody.appendChild(btn_tr)

    // append child table
    table.appendChild(thead)
    table.appendChild(tbody)

    // dialog box

    const dialogBox = createElements("dialog", null, null, null)

    const btnOk = createElements("button", null, null, "Yes")
    btnOk.addEventListener('click', deleteEvent)
    btnOk.id = obj.id

    const btnNotOk = createElements("button", null, null, "No")
    btnNotOk.addEventListener('click', function (e) {
        dialogBox.close()
    })

    dialogBox.appendChild(createElements("p", null, null, "Are you sur ?"))
    dialogBox.appendChild(btnNotOk)
    dialogBox.appendChild(btnOk)

    // delete button ( to dialog box )
    const btnDelete = createElements("button", null, null, "🗑️")
    btnDelete.addEventListener('click', function (e) {
        dialogBox.showModal()
    })


    // append child events

    events.appendChild(title)
    events.appendChild(desc)
    events.appendChild(table)
    events.appendChild(dialogBox)
    events.appendChild(btnEdit)
    events.appendChild(btnDelete)

    return events
}


async function sendVote(e) {
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
    }
}

async function deleteEvent(e) {
    const de = await deleteEvents(e.target.id)
}

function openEditForm(id, name, author, description) {
    const editEventFormSection = document.getElementById('editEventFormSection');
    const editEventForm = document.getElementById('editEventForm');

    editEventForm.dataset.eventId = id;

    document.getElementById('editName').value = name;
    document.getElementById('editAuthor').value = author;
    document.getElementById('editDescription').value = description;

    editEventFormSection.showModal();


    document.getElementById('closeEditFormButton').addEventListener('click', () => {
        editEventFormSection.close();
    });
}



export function clearHtml() {
    document.querySelector("#eventsSection").innerHTML = "";
    viewAllEvents()
}

function buttonChangeStatus(e) {
    let bool = e.target.dataset.available === "true" ? false : true;
    e.target.dataset.available = bool + ""

    e.target.textContent = bool ? "👌" : "😢"
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