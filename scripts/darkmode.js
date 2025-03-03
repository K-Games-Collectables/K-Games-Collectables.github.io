document.getElementById('mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    // Add Bootstrap dark mode toggle
    document.body.setAttribute('data-bs-theme', 
        document.body.classList.contains('dark-mode') ? 'dark' : 'light'
    );
    // Update icon
    const modeIcon = document.getElementById('mode-icon');
    if (modeIcon) {
        modeIcon.src = document.body.classList.contains('dark-mode') ? 
            'images/mode1.png' : 'images/mode.png';
    }
});

// Check for saved 'darkMode' in localStorage, else set it based on system preference
let darkMode = localStorage.getItem('darkMode') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

if (darkMode === "dark") {
    document.body.classList.add('dark-mode');
    document.getElementById('mode-icon').src = 'images/mode1.png';
} else {
    document.body.classList.remove('dark-mode');
    document.getElementById('mode-icon').src = 'images/mode.png';
}