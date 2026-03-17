window.SitePublicCopy = window.SitePublicCopy || {};
window.SitePublicCopy.en = window.SitePublicCopy.en || { common: {}, pages: {} };
window.SitePublicCopy.en.pages = window.SitePublicCopy.en.pages || {};
window.SitePublicCopy.en.pages.index = window.SitePublicCopy.en.pages.index || {};
window.SitePublicCopy.en.pages.index.sections = window.SitePublicCopy.en.pages.index.sections || {};

Object.assign(window.SitePublicCopy.en.pages.index.sections, {
  seoPagesHeadContent: `<p class="eyebrow">SEO pages</p><h2>Three focused pages built for very specific searches.</h2><p>These pages answer a clear intent, then send visitors straight into the app with the right preset loaded.</p>`,
  seoPagesCardsContent: `<article class="info-card"><h3>Portrait lighting diagram</h3><p>A studio portrait base with a 45 degree key light, useful measurements and clean PDF export.</p><div class="quick-links"><a href="schema-eclairage-portrait.html">Read the page</a><a href="app.html?preset=portrait-soft-45">Open the preset</a></div></article><article class="info-card"><h3>Boudoir studio plan</h3><p>Furniture, mood, backdrop, backdrop distance and circulation for a boudoir studio session.</p><div class="quick-links"><a href="plan-studio-boudoir.html">Read the page</a><a href="app.html?preset=boudoir-parabolic">Open the preset</a></div></article><article class="info-card"><h3>Interview lighting diagram</h3><p>A clear video studio setup with camera subject distance, LED panels and quick export for the crew brief.</p><div class="quick-links"><a href="lighting-diagram-interview.html">Read the page</a><a href="app.html?preset=interview-led">Open the preset</a></div></article>`
});

window.SitePublicCopy.en.pages.portraitSchema = {
  meta: {
    title: "Portrait lighting diagram | Measurements and studio floor plan",
    description: "How to prepare a portrait lighting diagram in studio with key light, fill, subject camera backdrop distances, automatic measurements and a PDF exportable floor plan.",
    ogTitle: "Portrait lighting diagram | Lumiere Studio",
    ogDescription: "A simple method to build a portrait lighting diagram, verify the useful distances and export a clear photo studio plan.",
    twitterTitle: "Portrait lighting diagram | Lumiere Studio",
    twitterDescription: "A simple studio portrait base that is easy to reproduce, measure and export."
  },
  topCopy: "A practical walkthrough to build a readable portrait lighting diagram, review measurements and share it before the shoot.",
  brandTagline: "Portrait Lighting",
  navItems: ["home", "app", "guide", "presets", "faq"],
  footerItems: ["home", "app", "presets", "faq"],
  sections: {
    heroCopyContent: `<p class="eyebrow">Portrait lighting diagram</p><h1>How to prepare a clean, simple portrait lighting setup your team can execute fast.</h1><p>A good portrait lighting diagram is not just about having a nice lighting idea. It also needs to show where to place the key light, fill, camera, subject and control tools, then confirm the right distances before the build.</p><div class="hero-actions"><a class="button-link primary" href="app.html?preset=portrait-soft-45">Open the portrait preset</a><a class="button-link secondary" href="guide.html">Read the full guide</a></div><div class="hero-points"><div class="point-chip"><strong>Key light</strong>Use a large source at 45 degrees for a soft and versatile result.</div><div class="point-chip"><strong>Auto measurements</strong>Check light to subject, subject to backdrop and camera to subject without manual calculations.</div><div class="point-chip"><strong>Zoom on mobile and desktop</strong>Inspect the stage in detail with the mouse wheel or pinch.</div><div class="point-chip"><strong>PDF and custom preset</strong>Export the plan or save your own variant after the tweaks.</div></div>`,
    heroVisualContent: `<figure><img src="docs/screenshots/studio-portrait.png" alt="Portrait lighting diagram prepared in Lumiere Studio"><figcaption class="hero-caption">Example of a portrait setup with the main source, camera, light control and measurements visible on the plan.</figcaption></figure>`,
    firstGridContent: `<article class="article-card"><p class="eyebrow">1. Start simple</p><h2>One well placed source is often enough.</h2><p>For a classic portrait, start with an octabox or a large rectangular softbox placed about 45 degrees from the subject and slightly above eye level. That base covers many corporate, editorial and actor headshot needs.</p></article><article class="article-card"><p class="eyebrow">2. Shape the fill</p><h2>Use bounce or negative fill to match the intent.</h2><p>A simple reflector can open the shadows. On the other hand, a flag or black panel can deepen contrast and define the face more strongly. The plan should show that element clearly because it changes the final look a lot.</p></article><article class="article-card"><p class="eyebrow">3. Verify the distances</p><h2>Measure turns the diagram into a real stage plan.</h2><p>Once the base is placed, enable Measure to confirm the light to subject distance, the camera to subject distance and the backdrop distance. That creates a document that is useful for the brief and for the build.</p></article>`,
    secondGridContent: `<article class="article-card"><p class="eyebrow">Who is it for</p><h2>Portrait, corporate, light beauty and editorial work.</h2><p>This page is useful if you want a solid base for a simple studio portrait that stays fast to install without sacrificing clarity or image quality.</p></article><article class="article-card"><p class="eyebrow">Target search</p><h2>Portrait lighting diagram, photo studio plan, portrait lighting setup.</h2><p>The goal is to answer the exact queries a photographer, assistant or studio might search right before an indoor portrait session.</p></article><article class="article-card"><p class="eyebrow">Take action</p><h2>Load the setup directly in the app.</h2><p>Start from the soft portrait preset, review the useful distances, adjust the modifier, save your variant and export the plan as PDF.</p><p><a class="button-link primary" href="app.html?preset=portrait-soft-45">Try the portrait setup</a></p></article>`
  },
  footerCopy: "Lumiere Studio · portrait lighting diagram and photo studio plan."
};

window.SitePublicCopy.en.pages.boudoirPlan = {
  meta: {
    title: "Boudoir studio plan | Photo setup, measurements and export",
    description: "How to prepare a boudoir studio plan with furniture, backdrop, backdrop distance, wrapping light, circulation and PDF export.",
    ogTitle: "Boudoir studio plan | Lumiere Studio",
    ogDescription: "A clear boudoir studio plan to prepare furniture, lighting, backdrop, backdrop distance and movement before the session.",
    twitterTitle: "Boudoir studio plan | Lumiere Studio",
    twitterDescription: "A boudoir studio base with furniture, atmosphere, measurements and clean export."
  },
  topCopy: "Preparing a boudoir studio setup: mood, furniture, backdrop distance, circulation and light placement.",
  brandTagline: "Boudoir Setup",
  navItems: ["home", "app", "guide", "presets", "faq"],
  footerItems: ["home", "app", "presets", "faq"],
  sections: {
    heroCopyContent: `<p class="eyebrow">Photo studio plan</p><h1>How to build a boudoir studio plan that feels coherent, elegant and easy to shoot.</h1><p>A boudoir setup depends as much on atmosphere as on technique. The plan should show furniture placement, backdrop distance, camera position, movement zones and the main source so the session stays fluid, clear and reassuring.</p><div class="hero-actions"><a class="button-link primary" href="app.html?preset=boudoir-parabolic">Open the boudoir preset</a><a class="button-link secondary" href="presets.html">Browse presets</a></div><div class="hero-points"><div class="point-chip"><strong>Visible furniture</strong>Chair, bench or mirror should be part of the plan from the start.</div><div class="point-chip"><strong>Backdrop distance</strong>Measure helps you keep the right air and control subject separation.</div><div class="point-chip"><strong>Useful mobile zoom</strong>Pinch lets you inspect the stage quickly while you are on set.</div><div class="point-chip"><strong>Custom preset + PDF</strong>Keep your own version and export the final plan before the session.</div></div>`,
    heroVisualContent: `<figure><img src="docs/screenshots/studio-boudoir.png" alt="Boudoir studio plan created in Lumiere Studio"><figcaption class="hero-caption">Example of a boudoir setup with furniture, a colored backdrop, a clearly placed main source and the current interface.</figcaption></figure>`,
    firstGridContent: `<article class="article-card"><p class="eyebrow">1. Set the mood</p><h2>Backdrop and furniture are part of the diagram.</h2><p>In boudoir work, decor is not a minor detail. From the plan stage, think about the backdrop color, whether a chair or bench is present and how those elements will frame the subject in the final image.</p></article><article class="article-card"><p class="eyebrow">2. Keep breathing room</p><h2>The layout should reassure the subject and support the session flow.</h2><p>A boudoir studio plan needs enough space for direction, movement and pose changes. That means a clean setup with no badly placed stands and no camera position that crowds the furniture.</p></article><article class="article-card"><p class="eyebrow">3. Check the separation</p><h2>Measure the backdrop distance before refining the light.</h2><p>Measure mode helps confirm subject to backdrop distance and adjust the furniture or camera before you lock the final version of the setup.</p></article>`,
    secondGridContent: `<article class="article-card"><p class="eyebrow">Who is it for</p><h2>Boudoir photographers, intimate portrait work and sensual editorial setups.</h2><p>This page is for photographers who want to prepare a clean setup before the session while maintaining a reassuring and professional framework.</p></article><article class="article-card"><p class="eyebrow">Target search</p><h2>Boudoir studio plan, boudoir photo setup, boudoir lighting setup.</h2><p>The content is designed to answer a very practical need: organizing a boudoir studio shoot without improvising the stage.</p></article><article class="article-card"><p class="eyebrow">Take action</p><h2>Load the boudoir preset and adapt it to your visual world.</h2><p>Start from an existing base, change the backdrop, furniture or camera position, check the backdrop distance, then export the final plan as PDF.</p><p><a class="button-link primary" href="app.html?preset=boudoir-parabolic">Try the boudoir setup</a></p></article>`
  },
  footerCopy: "Lumiere Studio · boudoir studio plan and boudoir photo setup."
};

window.SitePublicCopy.en.pages.interviewLighting = {
  meta: {
    title: "Interview lighting diagram | Video setup, measurements and export",
    description: "How to prepare an interview lighting diagram in studio with camera, chair, key light, fill, separation, useful distances, monitor and PDF export.",
    ogTitle: "Interview lighting diagram | Lumiere Studio",
    ogDescription: "A simple layout for a studio interview with camera, LEDs, subject, useful distances, decor and crew circulation.",
    twitterTitle: "Interview lighting diagram | Lumiere Studio",
    twitterDescription: "A clear video studio base with measurements, LED panels and fast export for the crew."
  },
  topCopy: "Preparing a studio interview: camera, light, seating, useful measurements and a readable stage layout.",
  brandTagline: "Video Interview",
  navItems: ["home", "app", "guide", "presets", "faq"],
  footerItems: ["home", "app", "presets", "faq"],
  sections: {
    heroCopyContent: `<p class="eyebrow">Lighting diagram</p><h1>How to prepare a clear interview lighting diagram for a fast studio shoot.</h1><p>For interviews, the diagram needs to show logistics as much as light. Camera position, chair placement, LED panels, monitor placement and crew paths matter just as much as the quality of the key light.</p><div class="hero-actions"><a class="button-link primary" href="app.html?preset=interview-led">Open the interview preset</a><a class="button-link secondary" href="guide.html">See the method</a></div><div class="hero-points"><div class="point-chip"><strong>Camera + subject</strong>The plan makes the main axis and shooting distance instantly readable.</div><div class="point-chip"><strong>Power and distances</strong>The setup stays easy to read with panels, distances and backdrop placement clearly identified.</div><div class="point-chip"><strong>Zoom on mobile and desktop</strong>Inspect the stage in detail from the browser on phone or computer.</div><div class="point-chip"><strong>PDF and custom preset</strong>Export the final brief or save your own shooting version.</div></div>`,
    heroVisualContent: `<figure><img src="docs/screenshots/studio-video.png" alt="Interview lighting diagram prepared in Lumiere Studio"><figcaption class="hero-caption">Example of a video interview setup with camera, LED panels, seating, stage control and the current interface.</figcaption></figure>`,
    firstGridContent: `<article class="article-card"><p class="eyebrow">1. Lock the axis</p><h2>Camera placement defines the rest of the plan.</h2><p>Before talking about lights, fix the camera axis, eyeline direction and chair position. Those choices determine where the LEDs, backdrop and separation tools need to go.</p></article><article class="article-card"><p class="eyebrow">2. Stay simple</p><h2>A 2 point LED setup already covers many cases.</h2><p>A soft key, a fill or secondary panel and then a small separation source are often enough for a clean interview. The diagram mainly exists to make that base easy to reproduce.</p></article><article class="article-card"><p class="eyebrow">3. Check the markers</p><h2>Measure camera to subject and subject to backdrop before export.</h2><p>Measure mode helps confirm the key distances of the shoot and makes the document more operational for both the camera crew and production.</p></article>`,
    secondGridContent: `<article class="article-card"><p class="eyebrow">Who is it for</p><h2>Interviews, video podcasts, BTS and corporate content.</h2><p>This page is built for light studio productions, branded content, YouTube interviews and filmed podcast setups.</p></article><article class="article-card"><p class="eyebrow">Target search</p><h2>Interview lighting diagram, studio interview setup, interview video lighting.</h2><p>It targets searches made right before building an interview stage and explaining it to a crew or client.</p></article><article class="article-card"><p class="eyebrow">Take action</p><h2>Load the interview base and adapt it to your shoot.</h2><p>Change the camera distance, swap panels, adjust the backdrop, enable Measure and export the plan as PDF before setup begins.</p><p><a class="button-link primary" href="app.html?preset=interview-led">Try the interview setup</a></p></article>`
  },
  footerCopy: "Lumiere Studio · interview lighting diagram and video studio setup."
};
