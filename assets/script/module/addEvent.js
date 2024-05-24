export function addEventBlock() {

    const eventFormDialog = document.getElementById('eventFormSection');
    const addEventBtn = document.getElementById('addEventBtn')
    const closeEventBtn = document.getElementById('closeFormButton')

    addEventBtn.addEventListener('click', () => {
        eventFormDialog.showModal();
    });

    closeEventBtn.addEventListener('click', () => {
        eventFormDialog.close();
    });
    

    const formInputDate = document.querySelector('#eventDates')

    // DATES


    const now = new Date();
    const isoDateString = now.toISOString();
    const minDate = isoDateString.substring(0, 10);
    
    formInputDate.setAttribute('min', minDate);




    // ----------


}



export function fadeBlock() {

    const divNotif = document.querySelector('.alert')

    divNotif.style.visibility = 'visible'
    divNotif.style.opacity = '1'
    divNotif.textContent = 'Date added successfully.'
    divNotif.style.backgroundColor = "#3cf436"
}

export function delBlock() {

    const divNotif = document.querySelector('.alert')

    divNotif.style.transition = 'visibility 0s 0.2s, opacity 0.2s linear'
    divNotif.style.visibility = 'hidden'
    divNotif.style.opacity = '0'
}

export function errorBlock() {
    const divNotif = document.querySelector('.alert')

    divNotif.style.visibility = 'visible'
    divNotif.style.opacity = '1'
    divNotif.style.backgroundColor = "#f43636"
    divNotif.textContent = 'Missing or already existing date.'
}

