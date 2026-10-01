Main · JS
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
 

  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeStorageKey = "portfolio-theme";
 
  
  const setTheme = (theme) => {
    const selectedTheme = theme === "dark" ? "dark" : "light";
    body.dataset.theme = selectedTheme;
    try { window.localStorage.setItem(themeStorageKey, selectedTheme); } catch { /* Theme still works when storage is unavailable. */ }
    themeToggle?.setAttribute("aria-pressed", String(selectedTheme === "light"));
  };
 
  let storedTheme = null;
  try { storedTheme = window.localStorage.getItem(themeStorageKey); } catch { /* Default to the light Apple canvas. */ }
  setTheme(storedTheme);
  themeToggle?.addEventListener("click", () => setTheme(body.dataset.theme === "light" ? "dark" : "light"));
 
  /* Highlight the nav link for the section on screen (styled by .nav-links a.active) */
  const nav = document.querySelector(".nav");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
 
  const updateActiveLink = () => {
    // The nav is sticky and gets taller on small screens, so measure it each time.
    const offset = (nav?.offsetHeight || 64) + 24;
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - offset) current = section.id;
    });
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };
 
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => { updateActiveLink(); ticking = false; });
  }, { passive: true });
  updateActiveLink();
});
