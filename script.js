const themeSwitcher = document.querySelector('#theme-switcher');
const themeimage = document.querySelector('#theme-image');

themeSwitcher.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    themeimage.src = 'images/icon-moon.svg';
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    themeimage.src = 'images/icon-sun.svg';
  }

 
});

