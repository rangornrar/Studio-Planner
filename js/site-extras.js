// Fonctions communes des pages publiques :
//  - carte « Reprendre » de l'accueil, remplie depuis les plateaux enregistres par l'application ;
//  - bouton « Partager » des pages de preset (menu de partage du telephone, sinon copie du lien).
(function () {
  function readProjects() {
    try {
      const list = JSON.parse(window.localStorage.getItem("lite-studio-projects") || "[]");
      return Array.isArray(list) ? list.filter(function (entry) { return entry && entry.id && entry.name; }) : [];
    } catch (error) {
      return [];
    }
  }

  function fill(template, values) {
    return Object.keys(values).reduce(function (text, key) {
      return text.split("{" + key + "}").join(String(values[key]));
    }, template || "");
  }

  function withParam(href, key, value) {
    const separator = href.indexOf("?") >= 0 ? "&" : "?";
    return href + separator + encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }

  function initResumeCard() {
    const card = document.querySelector("[data-resume]");
    if (!card) return;
    const list = readProjects().sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    if (!list.length) return;
    const latest = list[0];
    const lang = card.getAttribute("data-lang") || document.documentElement.lang || "fr";
    const app = card.getAttribute("data-app") || "app.html";
    let date = "";
    try {
      date = new Intl.DateTimeFormat(lang, { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(new Date(latest.updatedAt));
    } catch (error) {
      date = new Date(latest.updatedAt).toLocaleString();
    }
    card.querySelector(".resume-name").textContent = fill(card.getAttribute("data-title"), { name: latest.name });
    card.querySelector(".resume-meta").textContent = fill(card.getAttribute("data-meta"), { date: date, count: latest.count || 0 });
    const thumb = card.querySelector(".resume-thumb");
    if (thumb && typeof latest.thumb === "string" && latest.thumb.indexOf("data:image/") === 0) {
      thumb.src = latest.thumb;
      thumb.hidden = false;
    }
    card.querySelector(".resume-open").href = withParam(app, "project", latest.id);
    const all = card.querySelector(".resume-all");
    if (list.length > 1) {
      all.href = withParam(app, "view", "projects");
      all.textContent = fill(card.getAttribute("data-all"), { count: list.length });
    } else {
      all.remove();
    }
    card.hidden = false;
  }

  function initShareButtons() {
    document.querySelectorAll("[data-share-page]").forEach(function (button) {
      button.addEventListener("click", async function () {
        const data = {
          title: button.getAttribute("data-share-title") || document.title,
          text: button.getAttribute("data-share-text") || "",
          url: window.location.href.split("#")[0]
        };
        if (typeof navigator.share === "function" && (typeof navigator.canShare !== "function" || navigator.canShare(data))) {
          try {
            await navigator.share(data);
            return;
          } catch (error) {
            if (error && error.name === "AbortError") return;
          }
        }
        const label = button.textContent;
        try {
          await navigator.clipboard.writeText(data.url);
          button.textContent = button.getAttribute("data-copied") || label;
          window.setTimeout(function () { button.textContent = label; }, 2200);
        } catch (error) {
          window.prompt(label, data.url);
        }
      });
    });
  }

  initResumeCard();
  initShareButtons();
})();
