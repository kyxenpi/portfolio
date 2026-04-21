// theme simples (opcional futuro upgrade)
console.log("portfolio loaded");

// smooth scroll básico
document.querySelectorAll("a[href^='#']").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const el = document.querySelector(a.getAttribute("href"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
});

const loading = document.getElementById("loading");
const loadingText = document.getElementById("loading-text");

const messages = [
  "loading modules",
  "initializing ui",
  "starting services",
  "optimizing layout",
  "finalizing",
];

let i = 0;

const interval = setInterval(() => {
  i++;
  if (i < messages.length) {
    loadingText.textContent = messages[i];
  }
}, 400);

window.addEventListener("load", () => {
  setTimeout(() => {
    clearInterval(interval);
    loading.style.opacity = "0";

    setTimeout(() => {
      loading.style.display = "none";
    }, 200);
  }, 1200);
});
