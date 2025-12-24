const routes = {
  "/": "views/home.html",
  "/about": "views/about.html",
  "/pricing": "views/pricing.html",
  "/contact": "views/contact.html",
};

async function loadRoute() {
  const app = document.getElementById("app");

  // read hash route, default "/"
  const hash = window.location.hash || "#/";
  const path = hash.replace("#", "") || "/";

  const viewFile = routes[path] || routes["/"];

  try {
    const res = await fetch(viewFile);
    if (!res.ok) throw new Error(`Failed to load ${viewFile}`);
    const html = await res.text();
    app.innerHTML = html;

    setActiveNav(path);
    window.scrollTo(0, 0);
  } catch (err) {
    app.innerHTML = `
      <section>
        <h2>Page not found</h2>
        <p>Sorry, that page does not exist.</p>
        <a class="btn" href="#/" data-link>Go Home</a>
      </section>
    `;
  }
}

function setActiveNav(path) {
  document.querySelectorAll("nav a[data-link]").forEach((a) => {
    const href = a.getAttribute("href"); // "#/pricing"
    const aPath = href.replace("#", "") || "/";
    a.classList.toggle("active", aPath === path);
  });
}

// Handle navigation clicks (optional because hash links already work,
// but useful if you later change to real paths)
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (!link) return;
  // hash navigation works naturally, no need to preventDefault
});

// Load on hash change + first load
window.addEventListener("hashchange", loadRoute);
window.addEventListener("DOMContentLoaded", loadRoute);
