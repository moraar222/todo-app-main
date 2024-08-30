function toggleTheme() {
    const body = document.body;
    const themeSwitcher = document.querySelector('.theme-switcher');

    body.classList.toggle('dark-mode');

    // Change icon based on the current theme
    if (body.classList.contains('dark-mode')) {
        themeSwitcher.textContent = '☀️'; // Sun icon for dark mode
    } else {
        themeSwitcher.textContent = '🌙'; // Moon icon for light mode
    }
}
