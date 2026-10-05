/* Home page rendering */
(function () {
    const examples = popularSearches.slice(0, 5);

    const howSteps = [
        {
            icon: "search",
            title: "Search the service",
            body: "Type what you want to do in plain language — no scheme names or form numbers needed.",
        },
        {
            icon: "file-text",
            title: "Check documents & fees",
            body: "See exactly which documents, formats and government fees apply before you start.",
        },
        {
            icon: "book-open",
            title: "Follow the steps",
            body: "Screen-by-screen guidance with warnings for the mistakes that get applications rejected.",
        },
        {
            icon: "badge-check",
            title: "Apply with confidence",
            body: "Jump to the official portal or the nearest centre and finish the job the first time.",
        },
    ];

    const stats = [
        { value: 10, suffix: "", label: "Services covered" },
        { value: 62, suffix: "", label: "Guided steps" },
        { value: 6300, suffix: "+", label: "Centres listed" },
        { value: 98, suffix: "%", label: "Found it useful" },
    ];

    function goToServices(value) {
        const query = String(value || "").trim();
        window.location.href = query ? `services.html?q=${encodeURIComponent(query)}` : "services.html";
    }

    function render() {
        const main = document.getElementById("main");

        main.innerHTML = `
    <section class="hero surface-gradient">
      <div class="container hero-grid">
        <div>
          <span class="badge badge-primary" style="padding:.4rem .75rem">${GG.icon("sparkles")}10 services · 60+ guided steps · always free</span>

          <h1>Learn Government Services <span class="text-gradient">Without Confusion</span></h1>

          <p class="hero-sub">
            Step-by-step tutorials for Aadhaar, PAN, Passport, DigiLocker, Driving Licence and
            more — with documents, fees and timelines explained in plain language.
          </p>

          <form class="hero-search" data-hero-form>
            ${GG.icon("search")}
            <label class="sr-only" for="hero-search">Search government services</label>
            <input id="hero-search" placeholder="What do you want to do today?" autocomplete="off" />
            <button class="btn" type="submit" style="border-radius:.75rem;padding-inline:1.25rem">Search</button>
          </form>

          <div class="row" style="margin-top:1rem;gap:.5rem" data-hero-examples>
            ${examples.map((example) => `<button type="button" class="chip">${GG.esc(example)}</button>`).join("")}
          </div>

          <div class="row" style="margin-top:1rem">
            <a class="btn btn-lg btn-round shadow-soft" href="services.html">Explore Services ${GG.icon("arrow-right")}</a>
            <a class="btn btn-lg btn-outline btn-round" href="tutorials.html">Start Learning</a>
            <a class="btn btn-lg btn-ghost btn-round" href="service.html?slug=aadhaar">${GG.icon("play-circle")} Watch Demo</a>
          </div>
        </div>

        <div class="hero-media">
          <div class="animate-float">
            <img src="assets/hero-illustration.png" style="max-width:100%;height:auto,margin-top:10rem"
              alt="Citizens across India using digital government services on phones and laptops" />
          </div>
          <div class="hero-note">
            <span class="icon-tile sm success">${GG.icon("shield-check")}</span>
            <div>
              <p style="font-size:.875rem;font-weight:600">Verified against official portals</p>
              <p class="xs muted">Reviewed every month</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="container stats-grid">
        ${stats
                .map(
                    (stat, index) => `
          <div class="reveal" data-delay="${index * 0.06}">
            <p class="stat-value"><span data-count="${stat.value}" data-suffix="${stat.suffix}">0</span></p>
            <p class="small muted" style="margin-top:.25rem">${stat.label}</p>
          </div>`,
                )
                .join("")}
      </div>
    </section>

    <section class="container section">
      <div class="reveal max-2xl">
        <p class="eyebrow">Popular Services</p>
        <h2 class="h2">Ten services that cover most everyday paperwork</h2>
        <p class="lead">
          Every card shows whether it can be done online, how long it takes and what it costs
          before you commit any time.
        </p>
      </div>

      <div class="grid cols-4" style="margin-top:2.5rem">
        ${services.map((service, index) => GG.serviceCard(service, index)).join("")}
      </div>
    </section>

    <section class="band">
      <div class="container section">
        <div class="reveal max-2xl">
          <p class="eyebrow">How it works</p>
          <h2 class="h2">From confusion to submitted, in four moves</h2>
        </div>

        <div class="grid cols-4" style="margin-top:2.5rem">
          ${howSteps
                .map(
                    (step, index) => `
            <div class="reveal" data-delay="${index * 0.07}" style="height:100%">
              <div class="card hover-lift-sm" style="height:100%;background:var(--background)">
                <span class="icon-tile accent">${GG.icon(step.icon)}</span>
                <p class="xs muted" style="margin-top:1.25rem;font-weight:600">STEP ${index + 1}</p>
                <h3 style="margin-top:.25rem;font-size:1.125rem">${step.title}</h3>
                <p class="small muted" style="margin-top:.5rem;line-height:1.7">${step.body}</p>
              </div>
            </div>`,
                )
                .join("")}
        </div>
      </div>
    </section>

    <section class="container section">
      <div class="grid" style="gap:2.5rem;grid-template-columns:1fr" data-updates-grid>
        <div>
          <div class="reveal">
            <div class="row-between" style="align-items:flex-end">
              <div>
                <p class="eyebrow">Government Updates</p>
                <h2 class="h2">What changed recently</h2>
              </div>
              <a class="btn btn-outline btn-round" href="updates.html">All updates ${GG.icon("arrow-right")}</a>
            </div>
          </div>

          <div class="stack" style="margin-top:2rem">
            ${updates
                .slice(0, 3)
                .map(
                    (update, index) => `
              <div class="reveal" data-delay="${index * 0.06}">
                <article class="card hover-lift-sm">
                  <div class="meta-row">
                    <span class="badge badge-outline-primary">${GG.esc(update.category)}</span>
                    <span class="row" style="gap:.25rem">${GG.icon("calendar-clock")}${GG.formatDate(update.date)}</span>
                    <span>${GG.esc(update.source)}</span>
                  </div>
                  <h3 style="margin-top:.75rem;font-size:1.125rem">${GG.esc(update.title)}</h3>
                  <p class="small muted" style="margin-top:.5rem;line-height:1.7">${GG.esc(update.summary)}</p>
                </article>
              </div>`,
                )
                .join("")}
          </div>
        </div>

        <div class="reveal" data-delay="0.1">
          <div class="panel-primary">
            <span class="icon-tile">${GG.icon("map-pin")}</span>
            <h2 style="margin-top:1.25rem;font-size:1.5rem">Need help in person?</h2>
            <p class="small" style="margin-top:.75rem;line-height:1.7;opacity:.9">
              Find Aadhaar centres, CSCs, passport offices, RTOs and municipal offices near you —
              with opening hours, phone numbers and directions.
            </p>
            <a class="btn btn-secondary btn-round" style="margin-top:1.5rem" href="centres.html">Find Nearby Centres</a>
            <p class="xs" style="margin-top:1.5rem;border-top:1px solid color-mix(in oklab, var(--primary-foreground) 20%, transparent);padding-top:1rem;opacity:.8">
              We never ask for your Aadhaar number, OTP or documents.
            </p>
          </div>
        </div>
      </div>
    </section>`;

        // two-thirds / one-third layout on large screens
        const grid = main.querySelector("[data-updates-grid]");
        const applyLayout = () => {
            grid.style.gridTemplateColumns = window.innerWidth >= 1024 ? "2fr 1fr" : "1fr";
        };
        applyLayout();
        window.addEventListener("resize", applyLayout);

        main.querySelector("[data-hero-form]").addEventListener("submit", (event) => {
            event.preventDefault();
            goToServices(event.target.querySelector("input").value);
        });

        main.querySelector("[data-hero-examples]").addEventListener("click", (event) => {
            const button = event.target.closest("button");
            if (button) goToServices(button.textContent);
        });
    }

    GG.boot(render);
})();
