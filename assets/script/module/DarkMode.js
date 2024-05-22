export function toggleDarkMode() { 

    const darkmodeBtn = document.getElementById('darkmodeBtn');
    const root = document.documentElement;
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';

    if (darkModeEnabled) {
        root.classList.add('darkmode');
    }

    darkmodeBtn.addEventListener('click', function() {

        root.classList.toggle('darkmode');
        localStorage.setItem('darkMode', root.classList.contains('darkmode'));

    });
}