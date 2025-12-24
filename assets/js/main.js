// Mobile menu toggle
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Contact form handler (no backend). Opens user's email client with prefilled message.
window.handleContactSubmit = function (e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const contact = form.contact.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`Booking request — ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nContact: ${contact}\n\nMessage:\n${message}\n`);
  // Replace with your real email
  window.location.href = `mailto:hello@your-salon.com?subject=${subject}&body=${body}`;
  return false;
};
