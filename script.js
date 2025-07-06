const body = document.body;
const toggleButton = document.getElementById('darkModeToggle');

// Check localStorage for saved mode
const savedMode = localStorage.getItem('mode');

// Apply saved mode if it exists
if (savedMode === 'dark') {
  body.classList.add('dark-mode');
  toggleButton.textContent = 'Light Mode';
  toggleButton.setAttribute('aria-pressed', 'true');
  toggleButton.setAttribute('aria-label', 'Switch to light mode');
} else {
  body.classList.remove('dark-mode');
  toggleButton.textContent = 'Dark Mode';
  toggleButton.setAttribute('aria-pressed', 'false');
  toggleButton.setAttribute('aria-label', 'Switch to dark mode');
}

// Toggle dark mode on click
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');

    toggleButton.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    toggleButton.setAttribute('aria-pressed', isDark.toString());
    toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    localStorage.setItem('mode', isDark ? 'dark' : 'light');

    // ✅ Remove focus after click to avoid persistent highlight
    toggleButton.blur();
  });
}

// Scroll spy to highlight nav links based on scroll position
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');

function onScroll() {
  const scrollPos = window.scrollY || window.pageYOffset;

  sections.forEach(section => {
    const top = section.offsetTop - 120; // adjust for sticky nav height
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

if (sections.length && navLinks.length) {
  window.addEventListener('scroll', onScroll);
  onScroll(); // highlight on initial load
}