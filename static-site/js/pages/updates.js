/* Government updates feed with category filter */
(function () {
    const categories = ["All", "Policy", "New Service", "Deadline", "Announcement"];
    const state = { category: "All" };
    let main;

    function renderList() {
        const list =
            state.category === "All"
                ? updates
                : updates.filter((update) => update.category === state.category);

        main.querySelector("[data-list]").innerHTML = list.length
            ? list
                .map(
                    (update, index) => `
        <div class="reveal" data-delay="${index * 0.05}">
          <article class="card card-xl shadow-soft hover-lift-sm">
            <div class="meta-row">
              <span class="badge badge-outline-primary">${GG.esc(update.category)}</span>
              <span class="row" style="gap:.35rem">${GG.icon("calendar-clock")}${GG.formatDate(update.date, "long")}</span>
              <span>${GG.esc(update.source)}</span>
              <span>${update.readMinutes} min read</span>
            </div>
            <h2 style="margin-top:.75rem;font-size:1.25rem;font-weight:600">${GG.esc(update.title)}</h2>
            <p class="muted" style="margin-top:.75rem;line-height:1.8">${GG.esc(update.summary)}</p>
          </article>
        </div>`,
                )
                .join("")
            : `<div class="dashed"><p class="small muted">No updates in this category yet.</p></div>`;

        GG.refreshIcons();
        GG.reveal(main);
    }

    GG.boot(function () {
        main = document.getElementById("main");

        main.innerHTML = `
    <div class="container page">
      <div class="reveal">
        <h1 class="h1">Government Updates</h1>
        <p class="lead">
          Policy changes, new services and deadlines that affect everyday paperwork — summarised in
          plain language.
        </p>
      </div>

      <div class="row" style="margin-top:2rem;gap:.5rem" role="group" aria-label="Filter updates" data-filters>
        ${categories
                .map(
                    (category) =>
                        `<button type="button" class="chip${category === state.category ? " active" : ""}" data-category="${GG.esc(category)}" aria-pressed="${category === state.category}">${GG.esc(category)}</button>`,
                )
                .join("")}
      </div>

      <div class="updates-list" data-list style="margin-top: 1.5rem;"></div>

      <p class="notice" style="margin-top:2.5rem">
        Summaries are written by the GovGuide India team. Always confirm details on the official
        ministry or department notification before acting on them.
      </p>
    </div>`;

        main.querySelector("[data-filters]").addEventListener("click", (event) => {
            const button = event.target.closest("[data-category]");
            if (!button) return;
            state.category = button.dataset.category;
            main.querySelectorAll("[data-category]").forEach((chip) => {
                const active = chip.dataset.category === state.category;
                chip.classList.toggle("active", active);
                chip.setAttribute("aria-pressed", String(active));
            });
            renderList();
        });

        renderList();
    });
})();