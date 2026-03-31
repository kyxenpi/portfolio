(() => {
  const GITHUB_USERNAME = "kmdev-cmd";

  // Loading
  const loadingScreen = document.getElementById("loading-screen");
  function hideLoading() {
    if (loadingScreen) {
      loadingScreen.classList.add("hidden");
      setTimeout(() => (loadingScreen.style.display = "none"), 800);
    }
  }
  window.addEventListener("load", () => setTimeout(hideLoading, 300));

  // Fetch Repos (melhor tratamento de erro)
  async function fetchRecentRepos() {
    const container = document.getElementById("repo-cards-container");
    if (!container) return;

    container.innerHTML =
      '<p class="section-text">Buscando repositórios recentes...</p>';

    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`,
      );
      if (!res.ok) throw new Error("Falha ao carregar");
      const repos = await res.json();

      container.innerHTML = "";
      repos.forEach((repo) => {
        const card = document.createElement("article");
        card.className = "project-card";
        const date = new Date(repo.updated_at).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "short",
        });

        card.innerHTML = `
                    <div class="project-content">
                        <span class="project-tech">${repo.language || "Various"} • ${date}</span>
                        <h4 class="project-name">${repo.name}</h4>
                        <p class="project-desc">${repo.description || "Projeto interessante com foco em automação ou web."}</p>
                        <a href="${repo.html_url}" class="project-link" target="_blank">Ver Repositório →</a>
                    </div>
                `;
        container.appendChild(card);
      });
    } catch (e) {
      container.innerHTML =
        '<p class="section-text">Não foi possível carregar os repositórios no momento.</p>';
    }
  }

  // Theme Toggle
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  body.classList.toggle("dark", savedTheme === "dark");

  toggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Scroll
  window.scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamic Age
  function updateAge() {
    const birth = new Date("2009-02-03");
    let age = new Date().getFullYear() - birth.getFullYear();
    const hasBirthdayPassed =
      new Date().getMonth() > birth.getMonth() ||
      (new Date().getMonth() === birth.getMonth() &&
        new Date().getDate() >= birth.getDate());
    if (!hasBirthdayPassed) age--;

    document.getElementById("dynamic-age").textContent = age;
  }

  // Certificate Modal
  const certModal = document.getElementById("certificate-modal");
  const certImage = document.getElementById("certificate-image");
  const certClose = document.getElementById("certificate-modal-close");

  function openCertificate() {
    certImage.src = "imgs/pythondevcertificate.png"; // ajuste o caminho se necessário
    certModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeCertificate() {
    certModal.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  document.querySelectorAll(".certificate-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openCertificate();
    });
  });

  certClose.addEventListener("click", closeCertificate);
  certModal.addEventListener("click", (e) => {
    if (e.target === certModal) closeCertificate();
  });

  // Init
  fetchRecentRepos();
  updateAge();
})();

// Scroll Reveal simples e bonito
function handleScroll() {
  document.querySelectorAll(".section").forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", () => {
  setTimeout(handleScroll, 300); // primeira execução
});
