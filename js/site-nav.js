(function () {
  const mobileQuery = window.matchMedia("(max-width: 720px)");
  const navs = Array.from(document.querySelectorAll(".site-nav"));

  function setOpen(nav, open) {
    const toggle = nav.querySelector(".site-menu-toggle");
    const tools = nav.querySelector(".site-nav-tools");
    const backdrop = nav.querySelector(".site-nav-backdrop");
    nav.classList.toggle("is-menu-open", open);
    document.documentElement.classList.toggle("site-menu-lock", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (backdrop) backdrop.hidden = !open;
    if (tools) {
      if (mobileQuery.matches && !open) {
        tools.setAttribute("aria-hidden", "true");
        tools.setAttribute("inert", "");
      } else {
        tools.removeAttribute("aria-hidden");
        tools.removeAttribute("inert");
      }
    }
  }

  function syncResponsiveState() {
    navs.forEach((nav) => {
      if (!mobileQuery.matches) {
        setOpen(nav, false);
        const tools = nav.querySelector(".site-nav-tools");
        if (tools) {
          tools.removeAttribute("aria-hidden");
          tools.removeAttribute("inert");
        }
      } else if (!nav.classList.contains("is-menu-open")) {
        setOpen(nav, false);
      }
    });
  }

  navs.forEach((nav) => {
    const toggle = nav.querySelector(".site-menu-toggle");
    const close = nav.querySelector(".site-menu-close");
    const backdrop = nav.querySelector(".site-nav-backdrop");
    const links = Array.from(nav.querySelectorAll(".nav-links a, .language-chip"));

    if (toggle) {
      toggle.addEventListener("click", () => setOpen(nav, !nav.classList.contains("is-menu-open")));
    }
    if (close) close.addEventListener("click", () => setOpen(nav, false));
    if (backdrop) backdrop.addEventListener("click", () => setOpen(nav, false));
    links.forEach((link) => link.addEventListener("click", () => setOpen(nav, false)));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    navs.forEach((nav) => setOpen(nav, false));
  });

  mobileQuery.addEventListener("change", syncResponsiveState);
  syncResponsiveState();
}());
