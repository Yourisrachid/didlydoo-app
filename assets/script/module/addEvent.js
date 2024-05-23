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