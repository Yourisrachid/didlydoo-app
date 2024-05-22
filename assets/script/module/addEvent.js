export function addEventBlock() {
    
    const addEventBlock = document.querySelector('.eventFormSection')
    const addEventBtn = document.querySelector('#addEventBtn')
    const closeBtn = document.querySelector('#closeFormButton')
    const formInputDate = document.querySelector('#eventDates')


    addEventBtn.addEventListener('click', function() {
        addEventBlock.style.display = 'flex';
    })

    closeBtn.addEventListener('click', function() {
        addEventBlock.style.display = 'none';
    })

    // DATES


    const now = new Date();
    const isoDateString = now.toISOString();
    const minDate = isoDateString.substring(0, 10);
    
    formInputDate.setAttribute('min', minDate);




    // ----------


}